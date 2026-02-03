"""
Order management views.
- DealerOrder: Dealer ordering stock from Admin (needs approval)
- CustomerOrder: Customer buying from Dealer (direct purchase)
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

from .models import DealerOrder, CustomerOrder, OrderItem
from .serializers import (
    DealerOrderSerializer,
    CreateDealerOrderSerializer,
    CustomerOrderSerializer,
    CreateCustomerOrderSerializer,
)
from apps.users.models import User
from apps.users.backends import MongoEngineJWTAuthentication
from apps.products.models import Product


class OrderPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 100


# ============================================
# DEALER ORDER ENDPOINTS
# Dealer → Admin (Stock Ordering)
# ============================================


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def create_dealer_order(request):
    """
    Create dealer order (Dealer only).
    Dealer ordering stock from Admin.

    POST /api/orders/dealer/create/
    """
    try:
        # Check if user is Dealer
        if request.user.role != User.ROLE_DEALER:
            return Response(
                {
                    "success": False,
                    "message": "Only Dealers can order products from Admin",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        dealer = request.user
        serializer = CreateDealerOrderSerializer(data=request.data)

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

        # Calculate totals
        total_amount = 0
        order_items = []

        for item_data in data["items"]:
            # Verify product exists and get dealer price
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

                # Check if admin has enough stock
                if product.total_stock < item_data["quantity"]:
                    return Response(
                        {
                            "success": False,
                            "message": f"Insufficient stock for '{product.name}'. Available: {product.total_stock}",
                        },
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                # Use dealer price
                unit_price = product.dealer_price
                subtotal = unit_price * item_data["quantity"]
                total_amount += subtotal

                order_items.append(
                    OrderItem(
                        product_id=str(product.id),
                        product_name=product.name,
                        product_model=product.model,
                        quantity=item_data["quantity"],
                        unit_price=unit_price,
                        subtotal=subtotal,
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

        # Calculate tax (18% GST)
        tax_amount = total_amount * 0.18
        grand_total = total_amount + tax_amount

        # Create dealer order
        order = DealerOrder(
            order_number=DealerOrder.generate_order_number(),
            dealer_id=str(dealer.id),
            dealer_name=dealer.dealership_name or dealer.get_full_name(),
            dealer_email=dealer.email,
            dealer_phone=dealer.phone,
            items=order_items,
            total_amount=total_amount,
            tax_amount=tax_amount,
            grand_total=grand_total,
            status=DealerOrder.STATUS_PENDING,
            dealer_notes=data.get("dealer_notes", ""),
            shipping_address=data.get(
                "shipping_address",
                f"{dealer.address}, {dealer.city}, {dealer.state} - {dealer.pincode}",
            ),
        )
        order.save()

        response_serializer = DealerOrderSerializer(order)
        return Response(
            {
                "success": True,
                "message": "Dealer order created successfully and sent for admin approval",
                "order": response_serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Dealer order creation failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def list_dealer_orders(request):
    """
    List dealer orders.
    - Admin: See all dealer orders
    - Dealer: See only their own orders

    GET /api/orders/dealer/
    """
    try:
        user = request.user

        # Filter by role
        if user.role == User.ROLE_ADMIN:
            orders = DealerOrder.objects.all()
        elif user.role == User.ROLE_DEALER:
            orders = DealerOrder.objects(dealer_id=str(user.id))
        else:
            return Response(
                {
                    "success": False,
                    "message": "Only Admins and Dealers can view dealer orders",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        # Filter by status
        order_status = request.GET.get("status", "")
        if order_status:
            orders = orders.filter(status=order_status)

        orders = orders.order_by("-created_at")

        # Pagination
        paginator = OrderPagination()
        paginated_orders = paginator.paginate_queryset(orders, request)

        serializer = DealerOrderSerializer(paginated_orders, many=True)
        return paginator.get_paginated_response(serializer.data)

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve dealer orders",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def get_dealer_order(request, order_id):
    """
    Get dealer order details.

    GET /api/orders/dealer/<order_id>/
    """
    try:
        user = request.user
        order = DealerOrder.objects.get(id=order_id)

        # Check permissions
        if user.role == User.ROLE_ADMIN:
            pass  # Admin can view any order
        elif user.role == User.ROLE_DEALER:
            if order.dealer_id != str(user.id):
                return Response(
                    {
                        "success": False,
                        "message": "You can only view your own orders",
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )
        else:
            return Response(
                {"success": False, "message": "Access denied"},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = DealerOrderSerializer(order)
        return Response(
            {"success": True, "order": serializer.data},
            status=status.HTTP_200_OK,
        )

    except DealerOrder.DoesNotExist:
        return Response(
            {"success": False, "message": "Order not found"},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve order",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def approve_dealer_order(request, order_id):
    """
    Approve dealer order (Admin only).
    Updates dealer inventory and deducts from admin stock.

    POST /api/orders/dealer/<order_id>/approve/
    """
    try:
        # Check if user is Admin
        if request.user.role != User.ROLE_ADMIN:
            return Response(
                {
                    "success": False,
                    "message": "Only Admins can approve dealer orders",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        order = DealerOrder.objects.get(id=order_id)

        if order.status != DealerOrder.STATUS_PENDING:
            return Response(
                {
                    "success": False,
                    "message": f"Order is already {order.status}",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Verify stock availability again
        for item in order.items:
            product = Product.objects.get(id=item.product_id)
            if product.total_stock < item.quantity:
                return Response(
                    {
                        "success": False,
                        "message": f"Insufficient stock for '{product.name}'. Available: {product.total_stock}",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

        # Update order status
        order.status = DealerOrder.STATUS_APPROVED
        order.approved_by = str(request.user.id)
        order.approved_by_name = request.user.get_full_name()
        order.approval_date = datetime.utcnow()
        order.expected_delivery = datetime.utcnow() + timedelta(days=7)
        order.admin_notes = request.data.get("admin_notes", "")
        order.save()

        # Update dealer inventory
        from apps.inventory.models import DealerInventory

        for item in order.items:
            inventory, created = DealerInventory.objects.get_or_create(
                dealer_id=order.dealer_id,
                product_id=item.product_id,
                defaults={
                    "quantity": 0,
                    "product_name": item.product_name,
                    "product_model": item.product_model,
                },
            )
            inventory.quantity += item.quantity
            inventory.last_restocked = datetime.utcnow()
            inventory.save()

        # Deduct from admin stock
        for item in order.items:
            product = Product.objects.get(id=item.product_id)
            product.total_stock -= item.quantity
            product.save()

        serializer = DealerOrderSerializer(order)
        return Response(
            {
                "success": True,
                "message": "Dealer order approved successfully",
                "order": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    except DealerOrder.DoesNotExist:
        return Response(
            {"success": False, "message": "Order not found"},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Order approval failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def reject_dealer_order(request, order_id):
    """
    Reject dealer order (Admin only).

    POST /api/orders/dealer/<order_id>/reject/
    """
    try:
        # Check if user is Admin
        if request.user.role != User.ROLE_ADMIN:
            return Response(
                {
                    "success": False,
                    "message": "Only Admins can reject dealer orders",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        order = DealerOrder.objects.get(id=order_id)

        if order.status != DealerOrder.STATUS_PENDING:
            return Response(
                {
                    "success": False,
                    "message": f"Order is already {order.status}",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        rejection_reason = request.data.get("rejection_reason", "")
        if not rejection_reason:
            return Response(
                {
                    "success": False,
                    "message": "Rejection reason is required",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        order.status = DealerOrder.STATUS_REJECTED
        order.rejection_reason = rejection_reason
        order.admin_notes = request.data.get("admin_notes", "")
        order.save()

        serializer = DealerOrderSerializer(order)
        return Response(
            {
                "success": True,
                "message": "Dealer order rejected",
                "order": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    except DealerOrder.DoesNotExist:
        return Response(
            {"success": False, "message": "Order not found"},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Order rejection failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def mark_dealer_order_shipped(request, order_id):
    """
    Mark dealer order as shipped (Admin only).

    POST /api/orders/dealer/<order_id>/ship/
    """
    try:
        # Check if user is Admin
        if request.user.role != User.ROLE_ADMIN:
            return Response(
                {
                    "success": False,
                    "message": "Only Admins can mark orders as shipped",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        order = DealerOrder.objects.get(id=order_id)

        if order.status != DealerOrder.STATUS_APPROVED:
            return Response(
                {
                    "success": False,
                    "message": "Only approved orders can be marked as shipped",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        order.status = DealerOrder.STATUS_SHIPPED
        order.tracking_number = request.data.get("tracking_number", "")
        order.save()

        serializer = DealerOrderSerializer(order)
        return Response(
            {
                "success": True,
                "message": "Order marked as shipped",
                "order": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    except DealerOrder.DoesNotExist:
        return Response(
            {"success": False, "message": "Order not found"},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to mark order as shipped",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def mark_dealer_order_delivered(request, order_id):
    """
    Mark dealer order as delivered (Admin only).

    POST /api/orders/dealer/<order_id>/deliver/
    """
    try:
        # Check if user is Admin
        if request.user.role != User.ROLE_ADMIN:
            return Response(
                {
                    "success": False,
                    "message": "Only Admins can mark orders as delivered",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        order = DealerOrder.objects.get(id=order_id)

        if order.status != DealerOrder.STATUS_SHIPPED:
            return Response(
                {
                    "success": False,
                    "message": "Only shipped orders can be marked as delivered",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        order.status = DealerOrder.STATUS_DELIVERED
        order.actual_delivery = datetime.utcnow()
        order.save()

        serializer = DealerOrderSerializer(order)
        return Response(
            {
                "success": True,
                "message": "Order marked as delivered",
                "order": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    except DealerOrder.DoesNotExist:
        return Response(
            {"success": False, "message": "Order not found"},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to mark order as delivered",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


# ============================================
# CUSTOMER ORDER ENDPOINTS
# Customer → Dealer (Direct Purchase)
# ============================================


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def create_customer_order(request):
    """
    Create customer order (Customer only).
    Customer buying from Dealer - no admin approval needed.

    POST /api/orders/customer/create/
    """
    try:
        # Check if user is Customer
        if request.user.role != User.ROLE_CUSTOMER:
            return Response(
                {
                    "success": False,
                    "message": "Only Customers can place orders",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        customer = request.user
        serializer = CreateCustomerOrderSerializer(data=request.data)

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

        # Get dealer_id from request (customer selects which dealer to buy from)
        dealer_id = request.data.get("dealer_id")
        if not dealer_id:
            return Response(
                {
                    "success": False,
                    "message": "dealer_id is required",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Verify dealer exists
        try:
            dealer = User.objects.get(id=dealer_id, role=User.ROLE_DEALER)
        except User.DoesNotExist:
            return Response(
                {"success": False, "message": "Dealer not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Calculate totals
        total_amount = 0
        order_items = []

        for item_data in data["items"]:
            # Verify product exists
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

                # Use base price (customer price)
                unit_price = product.base_price
                subtotal = unit_price * item_data["quantity"]
                total_amount += subtotal

                order_items.append(
                    OrderItem(
                        product_id=str(product.id),
                        product_name=product.name,
                        product_model=product.model,
                        quantity=item_data["quantity"],
                        unit_price=unit_price,
                        subtotal=subtotal,
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

        # Calculate tax (18% GST)
        tax_amount = total_amount * 0.18
        discount_amount = float(request.data.get("discount_amount", 0.0))
        grand_total = total_amount + tax_amount - discount_amount

        amount_paid = float(data.get("amount_paid", 0.0))

        # Determine payment status
        if amount_paid >= grand_total:
            payment_status = CustomerOrder.PAYMENT_COMPLETED
        elif amount_paid > 0:
            payment_status = CustomerOrder.PAYMENT_PARTIAL
        else:
            payment_status = CustomerOrder.PAYMENT_PENDING

        # Create customer order
        order = CustomerOrder(
            order_number=CustomerOrder.generate_order_number(),
            customer_id=str(customer.id),
            customer_name=data.get("customer_name", customer.get_full_name()),
            customer_email=data.get("customer_email", customer.email),
            customer_phone=data.get("customer_phone", customer.phone),
            dealer_id=str(dealer.id),
            dealer_name=dealer.get_full_name(),
            dealership_name=dealer.dealership_name,
            items=order_items,
            total_amount=total_amount,
            tax_amount=tax_amount,
            discount_amount=discount_amount,
            grand_total=grand_total,
            payment_status=payment_status,
            amount_paid=amount_paid,
            amount_remaining=grand_total - amount_paid,
            status=CustomerOrder.STATUS_PENDING,
            delivery_address=data.get("delivery_address", ""),
            delivery_city=data.get("delivery_city", ""),
            delivery_state=data.get("delivery_state", ""),
            delivery_pincode=data.get("delivery_pincode", ""),
            is_home_delivery=data.get("is_home_delivery", False),
            customer_notes=data.get("customer_notes", ""),
        )
        order.save()

        response_serializer = CustomerOrderSerializer(order)
        return Response(
            {
                "success": True,
                "message": "Customer order placed successfully",
                "order": response_serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Customer order creation failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def list_customer_orders(request):
    """
    List customer orders.
    - Customer: See their own orders
    - Dealer/Employee: See orders at their dealership

    GET /api/orders/customer/
    """
    try:
        user = request.user

        # Filter by role
        if user.role == User.ROLE_CUSTOMER:
            orders = CustomerOrder.objects(customer_id=str(user.id))
        elif user.role in [User.ROLE_DEALER, User.ROLE_EMPLOYEE]:
            # Get dealer_id
            if user.role == User.ROLE_DEALER:
                dealer_id = str(user.id)
            else:  # Employee
                dealer_id = user.dealer_id

            if not dealer_id:
                return Response(
                    {
                        "success": False,
                        "message": "No dealer associated with your account",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            orders = CustomerOrder.objects(dealer_id=dealer_id)
        else:
            return Response(
                {
                    "success": False,
                    "message": "Access denied",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        # Filter by status
        order_status = request.GET.get("status", "")
        if order_status:
            orders = orders.filter(status=order_status)

        # Filter by payment status
        payment_status = request.GET.get("payment_status", "")
        if payment_status:
            orders = orders.filter(payment_status=payment_status)

        orders = orders.order_by("-created_at")

        # Pagination
        paginator = OrderPagination()
        paginated_orders = paginator.paginate_queryset(orders, request)

        serializer = CustomerOrderSerializer(paginated_orders, many=True)
        return paginator.get_paginated_response(serializer.data)

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve customer orders",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def get_customer_order(request, order_id):
    """
    Get customer order details.

    GET /api/orders/customer/<order_id>/
    """
    try:
        user = request.user
        order = CustomerOrder.objects.get(id=order_id)

        # Check permissions
        if user.role == User.ROLE_CUSTOMER:
            if order.customer_id != str(user.id):
                return Response(
                    {
                        "success": False,
                        "message": "You can only view your own orders",
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )
        elif user.role == User.ROLE_DEALER:
            if order.dealer_id != str(user.id):
                return Response(
                    {
                        "success": False,
                        "message": "You can only view orders from your dealership",
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )
        elif user.role == User.ROLE_EMPLOYEE:
            if order.dealer_id != user.dealer_id:
                return Response(
                    {
                        "success": False,
                        "message": "You can only view orders from your dealership",
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )
        else:
            return Response(
                {"success": False, "message": "Access denied"},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = CustomerOrderSerializer(order)
        return Response(
            {"success": True, "order": serializer.data},
            status=status.HTTP_200_OK,
        )

    except CustomerOrder.DoesNotExist:
        return Response(
            {"success": False, "message": "Order not found"},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve order",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def update_customer_order_status(request, order_id):
    """
    Update customer order status (Dealer/Employee only).

    PATCH /api/orders/customer/<order_id>/status/
    """
    try:
        user = request.user

        # Check if user is Dealer or Employee
        if user.role not in [User.ROLE_DEALER, User.ROLE_EMPLOYEE]:
            return Response(
                {
                    "success": False,
                    "message": "Only Dealers and Employees can update order status",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        order = CustomerOrder.objects.get(id=order_id)

        # Get dealer_id
        if user.role == User.ROLE_DEALER:
            dealer_id = str(user.id)
        else:  # Employee
            dealer_id = user.dealer_id

        # Check if order belongs to their dealership
        if order.dealer_id != dealer_id:
            return Response(
                {
                    "success": False,
                    "message": "You can only update orders from your dealership",
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
        valid_statuses = [choice[0] for choice in CustomerOrder.STATUS_CHOICES]
        if new_status not in valid_statuses:
            return Response(
                {"success": False, "message": f"Invalid status: {new_status}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        order.status = new_status
        order.dealer_notes = request.data.get("dealer_notes", order.dealer_notes)

        # Track who processed it
        if not order.processed_by:
            order.processed_by = str(user.id)
            order.processed_by_name = user.get_full_name()

        # If delivered, set delivery date
        if new_status == CustomerOrder.STATUS_DELIVERED:
            order.delivery_date = datetime.utcnow()

        order.save()

        serializer = CustomerOrderSerializer(order)
        return Response(
            {
                "success": True,
                "message": "Order status updated successfully",
                "order": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    except CustomerOrder.DoesNotExist:
        return Response(
            {"success": False, "message": "Order not found"},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to update order status",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def update_customer_order_payment(request, order_id):
    """
    Update customer order payment (Dealer/Employee only).

    PATCH /api/orders/customer/<order_id>/payment/
    """
    try:
        user = request.user

        # Check if user is Dealer or Employee
        if user.role not in [User.ROLE_DEALER, User.ROLE_EMPLOYEE]:
            return Response(
                {
                    "success": False,
                    "message": "Only Dealers and Employees can update payment",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        order = CustomerOrder.objects.get(id=order_id)

        # Get dealer_id
        if user.role == User.ROLE_DEALER:
            dealer_id = str(user.id)
        else:  # Employee
            dealer_id = user.dealer_id

        # Check if order belongs to their dealership
        if order.dealer_id != dealer_id:
            return Response(
                {
                    "success": False,
                    "message": "You can only update orders from your dealership",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        additional_payment = float(request.data.get("additional_payment", 0))
        if additional_payment <= 0:
            return Response(
                {"success": False, "message": "additional_payment must be positive"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Update payment
        order.amount_paid += additional_payment
        order.amount_remaining = order.grand_total - order.amount_paid

        # Update payment status
        if order.amount_paid >= order.grand_total:
            order.payment_status = CustomerOrder.PAYMENT_COMPLETED
        elif order.amount_paid > 0:
            order.payment_status = CustomerOrder.PAYMENT_PARTIAL
        else:
            order.payment_status = CustomerOrder.PAYMENT_PENDING

        order.save()

        serializer = CustomerOrderSerializer(order)
        return Response(
            {
                "success": True,
                "message": "Payment updated successfully",
                "order": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    except CustomerOrder.DoesNotExist:
        return Response(
            {"success": False, "message": "Order not found"},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to update payment",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
