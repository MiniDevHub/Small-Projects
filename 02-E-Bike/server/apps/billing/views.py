"""
Billing/Sales management views.
- Dealer/Employee: Create sales, sell products to customers
- Customer: View their purchases
- Admin: View all sales (oversight)
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
    Sale,
    SaleItem,
    CustomerDetails,
    PaymentDetails,
    WarrantyInfo,
    StockMovement,
)
from .serializers import SaleSerializer, CreateSaleSerializer
from apps.users.models import User
from apps.users.backends import MongoEngineJWTAuthentication
from apps.products.models import Product
from apps.inventory.models import DealerInventory, InventoryTransaction


class SalePagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 100


# ============================================
# DEALER/EMPLOYEE ENDPOINTS (Create Sales ✅)
# ============================================


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def create_sale(request):
    """
    Create new sale (Dealer/Employee only).
    Records a sale when customer purchases a product.

    POST /api/billing/sales/create/
    """
    try:
        user = request.user

        # Check if user is Dealer or Employee
        if user.role not in [User.ROLE_DEALER, User.ROLE_EMPLOYEE]:
            return Response(
                {
                    "success": False,
                    "message": "Only Dealers and Employees can create sales",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        # Get dealer_id and employee_id
        if user.role == User.ROLE_DEALER:
            dealer_id = str(user.id)
            employee_id = str(user.id)  # Dealer is also the salesperson
        else:  # Employee
            if not user.dealer_id:
                return Response(
                    {
                        "success": False,
                        "message": "No dealer associated with your account",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            dealer_id = user.dealer_id
            employee_id = str(user.id)

        serializer = CreateSaleSerializer(data=request.data)

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

        # Verify customer if customer_id provided
        customer_id = data.get("customer_id")
        if customer_id:
            try:
                customer = User.objects.get(id=customer_id, role=User.ROLE_CUSTOMER)
            except User.DoesNotExist:
                return Response(
                    {"success": False, "message": "Customer not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )

        # Calculate totals and prepare sale items
        subtotal = 0
        tax_amount = 0
        sale_items = []

        for item_data in data["items"]:
            try:
                product = Product.objects.get(id=item_data["product_id"])

                if not product.is_available:
                    return Response(
                        {
                            "success": False,
                            "message": f"Product '{product.name}' is not available",
                        },
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                # Check dealer inventory
                inventory = DealerInventory.objects(
                    dealer_id=dealer_id, product_id=str(product.id)
                ).first()

                if not inventory:
                    return Response(
                        {
                            "success": False,
                            "message": f"Product '{product.name}' not in inventory",
                        },
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                if inventory.available_quantity < item_data["quantity"]:
                    return Response(
                        {
                            "success": False,
                            "message": f"Insufficient stock for '{product.name}'. Available: {inventory.available_quantity}",
                        },
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                # Calculate amounts
                unit_price = product.base_price  # Customer price
                item_discount = item_data.get("discount", 0.0)
                discounted_price = unit_price - item_discount
                item_subtotal = discounted_price * item_data["quantity"]
                tax_rate = item_data.get("tax_rate", product.tax_rate)
                item_tax = item_subtotal * (tax_rate / 100)

                subtotal += item_subtotal
                tax_amount += item_tax

                sale_items.append(
                    SaleItem(
                        product_id=str(product.id),
                        product_name=product.name,
                        quantity=item_data["quantity"],
                        unit_price=unit_price,
                        discount=item_discount,
                        tax_rate=tax_rate,
                        subtotal=item_subtotal + item_tax,
                    )
                )

            except Product.DoesNotExist:
                return Response(
                    {
                        "success": False,
                        "message": f"Product {item_data['product_id']} not found",
                    },
                    status=status.HTTP_404_NOT_FOUND,
                )

        # Calculate grand total
        total_discount = data.get("discount", 0.0)
        grand_total = subtotal + tax_amount - total_discount

        # Prepare customer details
        customer_details = None
        if data.get("customer"):
            customer_details = CustomerDetails(**data["customer"])
        elif customer_id:
            # Get customer details from user
            customer_details = CustomerDetails(
                name=customer.get_full_name(),
                phone=customer.phone,
                email=customer.email,
                address=customer.address or "",
            )

        # Prepare payment details
        payment_details = None
        if data.get("payment_details"):
            payment_details = PaymentDetails(**data["payment_details"])

        # Determine payment status
        if data["payment_method"] == Sale.PAYMENT_EMI:
            payment_status = Sale.STATUS_PARTIAL
        else:
            payment_status = Sale.STATUS_PAID

        # Activate warranty (24 months, 4 free services)
        warranty_info = WarrantyInfo(
            is_activated=True,
            activation_date=datetime.utcnow(),
            expiry_date=datetime.utcnow() + timedelta(days=730),  # 24 months
            free_services_total=4,
            free_services_used=0,
            free_services_remaining=4,
        )

        # Create sale
        sale = Sale(
            invoice_number=Sale.generate_invoice_number(),
            dealer_id=dealer_id,
            employee_id=employee_id,
            customer_id=customer_id,
            customer=customer_details,
            items=sale_items,
            subtotal=subtotal,
            discount=total_discount,
            tax_amount=tax_amount,
            grand_total=grand_total,
            payment_method=data["payment_method"],
            payment_status=payment_status,
            payment_details=payment_details,
            warranty=warranty_info,
            delivery_status=Sale.DELIVERY_PENDING,
        )
        sale.save()

        # Deduct from inventory and record transactions
        for item in sale.items:
            inventory = DealerInventory.objects(
                dealer_id=dealer_id, product_id=item.product_id
            ).first()

            quantity_before = inventory.quantity
            inventory.deduct_stock(item.quantity)

            # Record inventory transaction
            InventoryTransaction(
                dealer_id=dealer_id,
                product_id=item.product_id,
                product_name=item.product_name,
                transaction_type="sale",
                quantity_change=-item.quantity,
                quantity_before=quantity_before,
                quantity_after=inventory.quantity,
                order_id=str(sale.id),
                performed_by=employee_id,
                performed_by_name=user.get_full_name(),
                notes=f"Sold via invoice {sale.invoice_number}",
            ).save()

            # Record stock movement
            StockMovement(
                product_id=item.product_id,
                dealer_id=dealer_id,
                movement_type=StockMovement.MOVEMENT_SALE,
                quantity=-item.quantity,
                reference_id=str(sale.id),
                reference_type="sale",
                performed_by=employee_id,
                previous_stock=quantity_before,
                new_stock=inventory.quantity,
                notes=f"Sale to customer - Invoice {sale.invoice_number}",
            ).save()

        response_serializer = SaleSerializer(sale)
        return Response(
            {
                "success": True,
                "message": "Sale created successfully",
                "sale": response_serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Sale creation failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


# ============================================
# COMMON ENDPOINTS (View Sales)
# ============================================


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def list_sales(request):
    """
    List sales.
    - Admin: All sales
    - Dealer: Sales at their dealership
    - Employee: Sales made by them
    - Customer: Their own purchases

    GET /api/billing/sales/
    """
    try:
        user = request.user

        # Filter based on role
        if user.role == User.ROLE_ADMIN:
            sales = Sale.objects.all()
        elif user.role == User.ROLE_DEALER:
            sales = Sale.objects(dealer_id=str(user.id))
        elif user.role == User.ROLE_EMPLOYEE:
            # Employee can see their own sales or all dealership sales
            view_all = request.GET.get("view_all", "false").lower() == "true"
            if view_all and user.dealer_id:
                sales = Sale.objects(dealer_id=user.dealer_id)
            else:
                sales = Sale.objects(employee_id=str(user.id))
        elif user.role == User.ROLE_CUSTOMER:
            sales = Sale.objects(customer_id=str(user.id))
        else:
            return Response(
                {"success": False, "message": "Access denied"},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Filter by payment status
        payment_status = request.GET.get("payment_status", "")
        if payment_status:
            sales = sales.filter(payment_status=payment_status)

        # Filter by delivery status
        delivery_status = request.GET.get("delivery_status", "")
        if delivery_status:
            sales = sales.filter(delivery_status=delivery_status)

        # Filter by date range
        start_date = request.GET.get("start_date", "")
        end_date = request.GET.get("end_date", "")
        if start_date:
            sales = sales.filter(sale_date__gte=datetime.fromisoformat(start_date))
        if end_date:
            sales = sales.filter(sale_date__lte=datetime.fromisoformat(end_date))

        sales = sales.order_by("-sale_date")

        # Pagination
        paginator = SalePagination()
        paginated_sales = paginator.paginate_queryset(sales, request)

        serializer = SaleSerializer(paginated_sales, many=True)
        return paginator.get_paginated_response(serializer.data)

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve sales",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def get_sale(request, sale_id):
    """
    Get sale details.

    GET /api/billing/sales/<sale_id>/
    """
    try:
        user = request.user
        sale = Sale.objects.get(id=sale_id)

        # Check permissions
        if user.role == User.ROLE_ADMIN:
            pass  # Admin can view any sale
        elif user.role == User.ROLE_DEALER:
            if sale.dealer_id != str(user.id):
                return Response(
                    {
                        "success": False,
                        "message": "You can only view sales at your dealership",
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )
        elif user.role == User.ROLE_EMPLOYEE:
            if sale.dealer_id != user.dealer_id:
                return Response(
                    {
                        "success": False,
                        "message": "You can only view sales at your dealership",
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )
        elif user.role == User.ROLE_CUSTOMER:
            if sale.customer_id != str(user.id):
                return Response(
                    {
                        "success": False,
                        "message": "You can only view your own purchases",
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )
        else:
            return Response(
                {"success": False, "message": "Access denied"},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = SaleSerializer(sale)
        return Response(
            {"success": True, "sale": serializer.data},
            status=status.HTTP_200_OK,
        )

    except Sale.DoesNotExist:
        return Response(
            {"success": False, "message": "Sale not found"},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve sale",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def update_delivery_status(request, sale_id):
    """
    Update delivery status (Dealer/Employee only).

    PATCH /api/billing/sales/<sale_id>/delivery/
    """
    try:
        user = request.user

        # Check if user is Dealer or Employee
        if user.role not in [User.ROLE_DEALER, User.ROLE_EMPLOYEE]:
            return Response(
                {
                    "success": False,
                    "message": "Only Dealers and Employees can update delivery status",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        sale = Sale.objects.get(id=sale_id)

        # Get dealer_id
        if user.role == User.ROLE_DEALER:
            dealer_id = str(user.id)
        else:  # Employee
            dealer_id = user.dealer_id

        # Check if sale belongs to their dealership
        if sale.dealer_id != dealer_id:
            return Response(
                {
                    "success": False,
                    "message": "You can only update sales at your dealership",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        new_status = request.data.get("delivery_status")
        if not new_status:
            return Response(
                {"success": False, "message": "delivery_status is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Validate status
        valid_statuses = [choice[0] for choice in Sale.DELIVERY_STATUS_CHOICES]
        if new_status not in valid_statuses:
            return Response(
                {"success": False, "message": f"Invalid delivery status: {new_status}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        sale.delivery_status = new_status
        sale.save()

        serializer = SaleSerializer(sale)
        return Response(
            {
                "success": True,
                "message": "Delivery status updated successfully",
                "sale": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    except Sale.DoesNotExist:
        return Response(
            {"success": False, "message": "Sale not found"},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to update delivery status",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


# ============================================
# CUSTOMER ENDPOINTS
# ============================================


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def get_customer_purchases(request):
    """
    Get customer's purchased bikes (Customer only).

    GET /api/billing/customer/purchases/
    """
    try:
        user = request.user

        # Check if user is Customer
        if user.role != User.ROLE_CUSTOMER:
            return Response(
                {
                    "success": False,
                    "message": "Only Customers can view purchases",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        sales = Sale.objects(customer_id=str(user.id)).order_by("-sale_date")
        serializer = SaleSerializer(sales, many=True)

        return Response(
            {
                "success": True,
                "count": len(serializer.data),
                "purchases": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve purchases",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


# ============================================
# ADMIN/DEALER ENDPOINTS (Dashboard)
# ============================================


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def get_sales_dashboard(request):
    """
    Get sales dashboard metrics (Admin/Dealer only).

    GET /api/billing/sales/dashboard/
    """
    try:
        user = request.user

        # Check if user is Admin or Dealer
        if user.role not in [User.ROLE_ADMIN, User.ROLE_DEALER]:
            return Response(
                {
                    "success": False,
                    "message": "Only Admins and Dealers can view sales dashboard",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        # Filter sales
        if user.role == User.ROLE_ADMIN:
            sales = Sale.objects.all()
        else:  # Dealer
            sales = Sale.objects(dealer_id=str(user.id))

        # Calculate metrics
        total_sales = sales.count()
        total_revenue = sum([sale.grand_total for sale in sales])

        # Today's sales
        today_start = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
        today_sales = sales.filter(sale_date__gte=today_start)
        today_count = today_sales.count()
        today_revenue = sum([sale.grand_total for sale in today_sales])

        # This month's sales
        month_start = datetime.now().replace(
            day=1, hour=0, minute=0, second=0, microsecond=0
        )
        month_sales = sales.filter(sale_date__gte=month_start)
        month_count = month_sales.count()
        month_revenue = sum([sale.grand_total for sale in month_sales])

        # Pending deliveries
        pending_deliveries = sales.filter(delivery_status=Sale.DELIVERY_PENDING).count()

        return Response(
            {
                "success": True,
                "total_sales": total_sales,
                "total_revenue": total_revenue,
                "today": {
                    "count": today_count,
                    "revenue": today_revenue,
                },
                "this_month": {
                    "count": month_count,
                    "revenue": month_revenue,
                },
                "pending_deliveries": pending_deliveries,
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve sales dashboard",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
