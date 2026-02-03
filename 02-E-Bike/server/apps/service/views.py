"""
Service management views.
- Customer: Books services
- Dealer: Assigns services to servicemen
- Serviceman: Updates service status and completes work
"""

from rest_framework import status
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from datetime import datetime, timedelta

from .models import (
    ServiceRequest,
    ServiceWarrantyTracker,
    CustomerInfo,
    StatusHistory,
    PartUsed,
)
from .serializers import (
    ServiceRequestSerializer,
    CreateServiceRequestSerializer,
    ServiceWarrantyTrackerSerializer,
)
from apps.users.models import User
from apps.users.backends import MongoEngineJWTAuthentication
from apps.products.models import Product


class ServicePagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 100


# ============================================
# CUSTOMER ENDPOINTS (Book Services ✅)
# ============================================


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def create_service_request(request):
    """
    Create service request (Customer only).
    Customer books a service for their purchased product.

    POST /api/service/request/create/
    """
    try:
        # Check if user is Customer
        if request.user.role != User.ROLE_CUSTOMER:
            return Response(
                {
                    "success": False,
                    "message": "Only Customers can book services",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        customer = request.user
        serializer = CreateServiceRequestSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "message": "Validation failed",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        data = serializer.validated_data

        # Get sale/invoice (from Billing app)
        from apps.billing.models import Sale

        try:
            sale = Sale.objects.get(id=data["invoice_id"])

            # Verify customer owns this purchase
            if sale.customer_id != str(customer.id):
                return Response(
                    {
                        "success": False,
                        "message": "You can only book services for your own purchases",
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )

            # Get or create warranty tracker
            warranty_tracker, created = ServiceWarrantyTracker.objects.get_or_create(
                invoice_id=str(sale.id),
                defaults={
                    "customer_id": str(customer.id),
                    "product_id": sale.items[0].product_id,
                    "total_free_services": 4,  # Default from product warranty
                    "services_completed": 0,
                    "services_remaining": 4,
                    "warranty_expiry_date": (
                        sale.warranty.expiry_date
                        if sale.warranty
                        else datetime.utcnow() + timedelta(days=730)
                    ),
                },
            )

            # Determine service number
            service_number = warranty_tracker.services_completed + 1

            # Check if free or paid
            is_free_service = service_number <= warranty_tracker.total_free_services

            # Get service charge from product
            product = Product.objects.get(id=sale.items[0].product_id)

            if is_free_service:
                service_charge = 0.0
                display_label = f"Service {service_number} - Free"
                payment_status = ServiceRequest.PAYMENT_FREE
            else:
                # Get service charge based on issue type
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
                name=customer.get_full_name(),
                phone=customer.phone,
                email=customer.email,
                address=customer.address or "",
            )

            # Create service request
            service_request = ServiceRequest(
                request_number=ServiceRequest.generate_request_number(),
                customer_id=str(customer.id),
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
                    "success": True,
                    "message": "Service request created successfully",
                    "service_request": response_serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )

        except Sale.DoesNotExist:
            return Response(
                {"success": False, "message": "Invoice not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Product.DoesNotExist:
            return Response(
                {"success": False, "message": "Product not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Service request creation failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def get_warranty_status(request, invoice_id):
    """
    Get warranty status for a purchase (Customer).

    GET /api/service/warranty/<invoice_id>/
    """
    try:
        user = request.user

        warranty_tracker = ServiceWarrantyTracker.objects(invoice_id=invoice_id).first()

        if not warranty_tracker:
            return Response(
                {"success": False, "message": "Warranty tracker not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Check if customer owns this warranty
        if user.role == User.ROLE_CUSTOMER:
            if warranty_tracker.customer_id != str(user.id):
                return Response(
                    {
                        "success": False,
                        "message": "You can only view your own warranty information",
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )

        serializer = ServiceWarrantyTrackerSerializer(warranty_tracker)
        return Response(
            {"success": True, "warranty": serializer.data},
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve warranty status",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


# ============================================
# DEALER ENDPOINTS (Assign Services ✅)
# ============================================


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def assign_service(request, request_id):
    """
    Assign service to serviceman (Dealer only).

    POST /api/service/requests/<request_id>/assign/
    """
    try:
        # Check if user is Dealer
        if request.user.role != User.ROLE_DEALER:
            return Response(
                {
                    "success": False,
                    "message": "Only Dealers can assign services",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        dealer = request.user
        service_request = ServiceRequest.objects.get(id=request_id)

        # Verify dealer owns this service request
        if service_request.dealer_id != str(dealer.id):
            return Response(
                {
                    "success": False,
                    "message": "You can only assign services at your dealership",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        serviceman_id = request.data.get("serviceman_id")
        if not serviceman_id:
            return Response(
                {"success": False, "message": "serviceman_id is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Verify serviceman belongs to this dealer
        try:
            serviceman = User.objects.get(id=serviceman_id, role=User.ROLE_SERVICEMAN)

            if serviceman.dealer_id != str(dealer.id):
                return Response(
                    {
                        "success": False,
                        "message": "Serviceman does not belong to your dealership",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except User.DoesNotExist:
            return Response(
                {"success": False, "message": "Serviceman not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Assign service
        service_request.assigned_to = serviceman_id
        service_request.assigned_date = datetime.utcnow()
        service_request.status = ServiceRequest.STATUS_ASSIGNED

        # Add to status history
        service_request.status_history.append(
            StatusHistory(
                status=ServiceRequest.STATUS_ASSIGNED,
                timestamp=datetime.utcnow(),
                updated_by=str(dealer.id),
                notes=f"Assigned to {serviceman.get_full_name()}",
            )
        )
        service_request.save()

        serializer = ServiceRequestSerializer(service_request)
        return Response(
            {
                "success": True,
                "message": "Service assigned successfully",
                "service_request": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    except ServiceRequest.DoesNotExist:
        return Response(
            {"success": False, "message": "Service request not found"},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Service assignment failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


# ============================================
# SERVICEMAN ENDPOINTS (Update Services ✅)
# ============================================


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def update_service_status(request, request_id):
    """
    Update service status (Serviceman only).

    PATCH /api/service/requests/<request_id>/status/
    """
    try:
        # Check if user is Serviceman
        if request.user.role != User.ROLE_SERVICEMAN:
            return Response(
                {
                    "success": False,
                    "message": "Only Servicemen can update service status",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        serviceman = request.user
        service_request = ServiceRequest.objects.get(id=request_id)

        # Verify serviceman is assigned to this request
        if service_request.assigned_to != str(serviceman.id):
            return Response(
                {
                    "success": False,
                    "message": "You can only update services assigned to you",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        new_status = request.data.get("status")
        if not new_status:
            return Response(
                {"success": False, "message": "status is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Validate status
        valid_statuses = [choice[0] for choice in ServiceRequest.STATUS_CHOICES]
        if new_status not in valid_statuses:
            return Response(
                {"success": False, "message": f"Invalid status: {new_status}"},
                status=status.HTTP_400_BAD_REQUEST,
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
                warranty_tracker.services_remaining = max(
                    0,
                    warranty_tracker.total_free_services
                    - warranty_tracker.services_completed,
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

        # Add to status history
        notes = request.data.get("notes", "")
        service_request.status_history.append(
            StatusHistory(
                status=new_status,
                timestamp=datetime.utcnow(),
                updated_by=str(serviceman.id),
                notes=notes,
            )
        )

        # Add service notes if provided
        if notes:
            service_request.service_notes = (
                service_request.service_notes or ""
            ) + f"\n{notes}"

        # Add parts used if provided
        parts_used = request.data.get("parts_used", [])
        if parts_used:
            for part in parts_used:
                service_request.parts_used.append(PartUsed(**part))
                service_request.parts_cost += part.get("cost", 0)

        # Add service time
        service_time = request.data.get("service_time_minutes", 0)
        if service_time:
            service_request.service_time_minutes += service_time

        service_request.save()

        serializer = ServiceRequestSerializer(service_request)
        return Response(
            {
                "success": True,
                "message": "Service status updated successfully",
                "service_request": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    except ServiceRequest.DoesNotExist:
        return Response(
            {"success": False, "message": "Service request not found"},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Service status update failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


# ============================================
# COMMON ENDPOINTS (View Services)
# ============================================


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def list_service_requests(request):
    """
    List service requests.
    - Admin: All service requests
    - Dealer: Service requests at their dealership
    - Serviceman: Service requests assigned to them
    - Customer: Their own service requests

    GET /api/service/requests/
    """
    try:
        user = request.user

        # Filter based on role
        if user.role == User.ROLE_ADMIN:
            services = ServiceRequest.objects.all()
        elif user.role == User.ROLE_DEALER:
            services = ServiceRequest.objects(dealer_id=str(user.id))
        elif user.role == User.ROLE_SERVICEMAN:
            services = ServiceRequest.objects(assigned_to=str(user.id))
        elif user.role == User.ROLE_CUSTOMER:
            services = ServiceRequest.objects(customer_id=str(user.id))
        else:
            return Response(
                {"success": False, "message": "Access denied"},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Filter by status
        service_status = request.GET.get("status", "")
        if service_status:
            services = services.filter(status=service_status)

        # Filter by priority
        priority = request.GET.get("priority", "")
        if priority:
            services = services.filter(priority=priority)

        services = services.order_by("-created_at")

        # Pagination
        paginator = ServicePagination()
        paginated_services = paginator.paginate_queryset(services, request)

        serializer = ServiceRequestSerializer(paginated_services, many=True)
        return paginator.get_paginated_response(serializer.data)

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve service requests",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def get_service_request(request, request_id):
    """
    Get service request details.

    GET /api/service/requests/<request_id>/
    """
    try:
        user = request.user
        service_request = ServiceRequest.objects.get(id=request_id)

        # Check permissions
        if user.role == User.ROLE_ADMIN:
            pass  # Admin can view any service
        elif user.role == User.ROLE_DEALER:
            if service_request.dealer_id != str(user.id):
                return Response(
                    {
                        "success": False,
                        "message": "You can only view services at your dealership",
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )
        elif user.role == User.ROLE_SERVICEMAN:
            if service_request.assigned_to != str(user.id):
                return Response(
                    {
                        "success": False,
                        "message": "You can only view services assigned to you",
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )
        elif user.role == User.ROLE_CUSTOMER:
            if service_request.customer_id != str(user.id):
                return Response(
                    {
                        "success": False,
                        "message": "You can only view your own service requests",
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )
        else:
            return Response(
                {"success": False, "message": "Access denied"},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = ServiceRequestSerializer(service_request)
        return Response(
            {"success": True, "service_request": serializer.data},
            status=status.HTTP_200_OK,
        )

    except ServiceRequest.DoesNotExist:
        return Response(
            {"success": False, "message": "Service request not found"},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve service request",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
