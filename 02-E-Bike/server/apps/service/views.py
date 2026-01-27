from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .models import ServiceRequest, ServiceWarrantyTracker, CustomerInfo, StatusHistory
from .serializers import (
    ServiceRequestSerializer,
    CreateServiceRequestSerializer,
    ServiceWarrantyTrackerSerializer,
)
from apps.users.models import User
from apps.billing.models import Sale
from apps.products.models import Product
from datetime import datetime
from django.conf import settings


class ServicePagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 100


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_service_request(request):
    """Create service request (Customer)"""
    user_id = request.user.id if hasattr(request.user, "id") else str(request.user)

    try:
        user = User.objects.get(id=user_id)

        if not user.is_customer:
            return Response(
                {"error": "Only customers can create service requests"},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = CreateServiceRequestSerializer(data=request.data)

        if serializer.is_valid():
            data = serializer.validated_data

            # Get sale/invoice
            try:
                sale = Sale.objects.get(id=data["invoice_id"])

                # Verify customer owns this purchase
                if sale.customer_id != str(user.id):
                    return Response(
                        {"error": "Access denied"}, status=status.HTTP_403_FORBIDDEN
                    )

                # Get or create warranty tracker
                warranty_tracker, created = (
                    ServiceWarrantyTracker.objects.get_or_create(
                        invoice_id=str(sale.id),
                        defaults={
                            "customer_id": str(user.id),
                            "product_id": sale.items[0].product_id,
                            "total_free_services": settings.FREE_SERVICES_COUNT,
                            "services_completed": 0,
                            "services_remaining": settings.FREE_SERVICES_COUNT,
                            "warranty_expiry_date": sale.warranty.expiry_date,
                        },
                    )
                )

                # Determine service number
                service_number = warranty_tracker.services_completed + 1

                # Check if free or paid
                is_free_service = service_number <= warranty_tracker.total_free_services

                # Get service charge
                product = Product.objects.get(id=sale.items[0].product_id)

                if is_free_service:
                    service_charge = 0.0
                    display_label = f"Service {service_number} - Free"
                    payment_status = ServiceRequest.PAYMENT_FREE
                else:
                    # Get service charge based on type
                    if data["issue_type"] == ServiceRequest.ISSUE_MAINTENANCE:
                        service_charge = product.service_charges.standard_service
                    elif data["issue_type"] == ServiceRequest.ISSUE_REPAIR:
                        service_charge = product.service_charges.repair
                    elif data["issue_type"] == ServiceRequest.ISSUE_INSPECTION:
                        service_charge = product.service_charges.inspection
                    else:
                        service_charge = product.service_charges.standard_service

                    display_label = f"Service {service_number} - ₹{service_charge:.0f}"
                    payment_status = ServiceRequest.PAYMENT_PENDING

                # Create customer info
                customer_info = CustomerInfo(
                    name=user.get_full_name(),
                    phone=user.phone,
                    email=user.email,
                    address=user.address or "",
                )

                # Create service request
                service_request = ServiceRequest(
                    request_number=ServiceRequest.generate_request_number(),
                    customer_id=str(user.id),
                    customer=customer_info,
                    product_id=sale.items[0].product_id,
                    invoice_id=str(sale.id),
                    service_number=service_number,
                    is_free_service=is_free_service,
                    service_charge=service_charge,
                    display_label=display_label,
                    issue_type=data["issue_type"],
                    issue_description=data["issue_description"],
                    priority=ServiceRequest.PRIORITY_MEDIUM,
                    dealer_id=sale.dealer_id,
                    payment_status=payment_status,
                    scheduled_date=data.get("scheduled_date"),
                    status=ServiceRequest.STATUS_PENDING,
                )
                service_request.save()

                # Add to status history
                service_request.status_history.append(
                    StatusHistory(
                        status=ServiceRequest.STATUS_PENDING,
                        timestamp=datetime.utcnow(),
                        notes="Service request created by customer",
                    )
                )
                service_request.save()

                # Update warranty tracker
                warranty_tracker.service_request_ids.append(str(service_request.id))
                warranty_tracker.save()

                response_serializer = ServiceRequestSerializer(service_request)
                return Response(
                    {
                        "message": "Service request created successfully",
                        "service_request": response_serializer.data,
                    },
                    status=status.HTTP_201_CREATED,
                )

            except Sale.DoesNotExist:
                return Response(
                    {"error": "Invoice not found"}, status=status.HTTP_404_NOT_FOUND
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_service_requests(request):
    """List service requests"""
    user_id = request.user.id if hasattr(request.user, "id") else str(request.user)

    try:
        user = User.objects.get(id=user_id)

        # Filter based on role
        if user.is_admin:
            services = ServiceRequest.objects.all()
        elif user.is_dealer:
            services = ServiceRequest.objects(dealer_id=str(user.id))
        elif user.is_serviceman:
            services = ServiceRequest.objects(assigned_to=str(user.id))
        elif user.is_customer:
            services = ServiceRequest.objects(customer_id=str(user.id))
        else:
            return Response(
                {"error": "Access denied"}, status=status.HTTP_403_FORBIDDEN
            )

        # Filter by status
        service_status = request.GET.get("status", "")
        if service_status:
            services = services.filter(status=service_status)

        services = services.order_by("-created_at")

        # Pagination
        paginator = ServicePagination()
        paginated_services = paginator.paginate_queryset(services, request)

        serializer = ServiceRequestSerializer(paginated_services, many=True)
        return paginator.get_paginated_response(serializer.data)

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_service_request(request, request_id):
    """Get service request details"""
    try:
        service_request = ServiceRequest.objects.get(id=request_id)
        serializer = ServiceRequestSerializer(service_request)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except ServiceRequest.DoesNotExist:
        return Response(
            {"error": "Service request not found"}, status=status.HTTP_404_NOT_FOUND
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def assign_service(request, request_id):
    """Assign service to serviceman (Dealer)"""
    user_id = request.user.id if hasattr(request.user, "id") else str(request.user)

    try:
        user = User.objects.get(id=user_id)

        if not user.is_dealer:
            return Response(
                {"error": "Only dealers can assign services"},
                status=status.HTTP_403_FORBIDDEN,
            )

        service_request = ServiceRequest.objects.get(id=request_id)

        # Verify dealer owns this request
        if service_request.dealer_id != str(user.id):
            return Response(
                {"error": "Access denied"}, status=status.HTTP_403_FORBIDDEN
            )

        serviceman_id = request.data.get("serviceman_id")

        # Verify serviceman belongs to this dealer
        serviceman = User.objects.get(id=serviceman_id)
        if not serviceman.is_serviceman or serviceman.dealer_id != str(user.id):
            return Response(
                {"error": "Invalid serviceman"}, status=status.HTTP_400_BAD_REQUEST
            )

        service_request.assigned_to = serviceman_id
        service_request.assigned_date = datetime.utcnow()
        service_request.status = ServiceRequest.STATUS_ASSIGNED

        # Add to status history
        service_request.status_history.append(
            StatusHistory(
                status=ServiceRequest.STATUS_ASSIGNED,
                timestamp=datetime.utcnow(),
                updated_by=user_id,
                notes=f"Assigned to {serviceman.get_full_name()}",
            )
        )
        service_request.save()

        serializer = ServiceRequestSerializer(service_request)
        return Response(
            {
                "message": "Service assigned successfully",
                "service_request": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    except ServiceRequest.DoesNotExist:
        return Response(
            {"error": "Service request not found"}, status=status.HTTP_404_NOT_FOUND
        )
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def update_service_status(request, request_id):
    """Update service status (Serviceman)"""
    user_id = request.user.id if hasattr(request.user, "id") else str(request.user)

    try:
        user = User.objects.get(id=user_id)

        if not user.is_serviceman:
            return Response(
                {"error": "Only servicemen can update service status"},
                status=status.HTTP_403_FORBIDDEN,
            )

        service_request = ServiceRequest.objects.get(id=request_id)

        # Verify serviceman is assigned to this request
        if service_request.assigned_to != str(user.id):
            return Response(
                {"error": "Access denied"}, status=status.HTTP_403_FORBIDDEN
            )

        new_status = request.data.get("status")
        notes = request.data.get("notes", "")

        if new_status not in dict(ServiceRequest.STATUS_CHOICES):
            return Response(
                {"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST
            )

        # Update status
        service_request.status = new_status

        # Update timestamps
        if (
            new_status == ServiceRequest.STATUS_IN_PROGRESS
            and not service_request.started_at
        ):
            service_request.started_at = datetime.utcnow()
        elif new_status == ServiceRequest.STATUS_COMPLETED:
            service_request.completed_at = datetime.utcnow()

            # Update warranty tracker
            warranty_tracker = ServiceWarrantyTracker.objects(
                invoice_id=service_request.invoice_id
            ).first()

            if warranty_tracker:
                warranty_tracker.services_completed += 1
                warranty_tracker.services_remaining = (
                    warranty_tracker.total_free_services
                    - warranty_tracker.services_completed
                )
                warranty_tracker.last_service_date = datetime.utcnow()

                # Check if all free services completed
                if (
                    warranty_tracker.services_completed
                    >= warranty_tracker.total_free_services
                ):
                    warranty_tracker.warranty_status = (
                        ServiceWarrantyTracker.WARRANTY_COMPLETED
                    )

                warranty_tracker.save()

                # Update sale warranty info
                sale = Sale.objects.get(id=service_request.invoice_id)
                sale.warranty.free_services_used = warranty_tracker.services_completed
                sale.warranty.free_services_remaining = (
                    warranty_tracker.services_remaining
                )
                sale.save()

        # Add to status history
        service_request.status_history.append(
            StatusHistory(
                status=new_status,
                timestamp=datetime.utcnow(),
                updated_by=user_id,
                notes=notes,
            )
        )

        # Add service notes if provided
        if notes:
            service_request.service_notes = notes

        service_request.save()

        serializer = ServiceRequestSerializer(service_request)
        return Response(
            {
                "message": "Service status updated successfully",
                "service_request": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    except ServiceRequest.DoesNotExist:
        return Response(
            {"error": "Service request not found"}, status=status.HTTP_404_NOT_FOUND
        )
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_warranty_status(request, invoice_id):
    """Get warranty status for a purchase"""
    try:
        warranty_tracker = ServiceWarrantyTracker.objects(invoice_id=invoice_id).first()

        if not warranty_tracker:
            return Response(
                {"error": "Warranty tracker not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = ServiceWarrantyTrackerSerializer(warranty_tracker)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
