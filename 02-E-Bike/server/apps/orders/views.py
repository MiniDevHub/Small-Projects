from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .models import Order, OrderItem
from .serializers import OrderSerializer, CreateOrderSerializer
from apps.users.models import User
from apps.products.models import Product
from apps.inventory.models import DealerInventory
from datetime import datetime, timedelta


class OrderPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 100


def is_admin(user_id):
    try:
        user = User.objects.get(id=user_id)
        return user.is_admin
    except:
        return False


def is_dealer(user_id):
    try:
        user = User.objects.get(id=user_id)
        return user.is_dealer
    except:
        return False


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_order(request):
    """Create new order (Dealer only)"""
    user_id = str(request.user.id) if hasattr(request.user, "id") else str(request.user)

    if not is_dealer(user_id):
        return Response(
            {"error": "Only dealers can create orders"},
            status=status.HTTP_403_FORBIDDEN,
        )

    try:
        dealer = User.objects.get(id=user_id)
        serializer = CreateOrderSerializer(data=request.data)

        if serializer.is_valid():
            data = serializer.validated_data

            # Calculate totals
            total_amount = 0
            order_items = []

            for item_data in data["items"]:
                # Verify product exists
                try:
                    product = Product.objects.get(id=item_data["product_id"])

                    # Use dealer price
                    unit_price = product.dealer_price
                    subtotal = unit_price * item_data["quantity"]
                    total_amount += subtotal

                    order_items.append(
                        OrderItem(
                            product_id=str(product.id),
                            product_name=product.name,
                            quantity=item_data["quantity"],
                            unit_price=unit_price,
                            subtotal=subtotal,
                        )
                    )
                except Product.DoesNotExist:
                    return Response(
                        {"error": f"Product {item_data['product_id']} not found"},
                        status=status.HTTP_404_NOT_FOUND,
                    )

            # Calculate tax (18% GST)
            tax_amount = total_amount * 0.18
            grand_total = total_amount + tax_amount

            # Create order
            order = Order(
                order_number=Order.generate_order_number(),
                dealer_id=str(dealer.id),
                dealer_name=dealer.dealership_name or dealer.get_full_name(),
                items=order_items,
                total_amount=total_amount,
                tax_amount=tax_amount,
                grand_total=grand_total,
                status=Order.STATUS_PENDING,
                dealer_notes=data.get("dealer_notes", ""),
            )
            order.save()

            response_serializer = OrderSerializer(order)
            return Response(
                {
                    "message": "Order created successfully",
                    "order": response_serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except User.DoesNotExist:
        return Response({"error": "Dealer not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_orders(request):
    """List orders (Admin: all, Dealer: own orders)"""
    user_id = str(request.user.id) if hasattr(request.user, "id") else str(request.user)

    try:
        user = User.objects.get(id=user_id)

        # Filter by role
        if user.is_admin:
            orders = Order.objects.all()
        elif user.is_dealer:
            orders = Order.objects(dealer_id=str(user.id))
        else:
            return Response(
                {"error": "Access denied"}, status=status.HTTP_403_FORBIDDEN
            )

        # Filter by status
        order_status = request.GET.get("status", "")
        if order_status:
            orders = orders.filter(status=order_status)

        orders = orders.order_by("-created_at")

        # Pagination
        paginator = OrderPagination()
        paginated_orders = paginator.paginate_queryset(orders, request)

        serializer = OrderSerializer(paginated_orders, many=True)
        return paginator.get_paginated_response(serializer.data)

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_order(request, order_id):
    """Get order details"""
    user_id = str(request.user.id) if hasattr(request.user, "id") else str(request.user)

    try:
        user = User.objects.get(id=user_id)
        order = Order.objects.get(id=order_id)

        # Check permissions
        if not user.is_admin and order.dealer_id != str(user.id):
            return Response(
                {"error": "Access denied"}, status=status.HTTP_403_FORBIDDEN
            )

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def approve_order(request, order_id):
    """Approve order (Admin only)"""
    user_id = str(request.user.id) if hasattr(request.user, "id") else str(request.user)

    if not is_admin(user_id):
        return Response(
            {"error": "Only admins can approve orders"},
            status=status.HTTP_403_FORBIDDEN,
        )

    try:
        order = Order.objects.get(id=order_id)

        if order.status != Order.STATUS_PENDING:
            return Response(
                {"error": f"Order is already {order.status}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Update order status
        order.status = Order.STATUS_APPROVED
        order.approved_by = str(request.user.id)
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
                defaults={"quantity": 0},
            )
            inventory.quantity += item.quantity
            inventory.last_restocked = datetime.utcnow()
            inventory.save()

        # Deduct from admin stock
        for item in order.items:
            product = Product.objects.get(id=item.product_id)
            product.total_stock -= item.quantity
            product.save()

        serializer = OrderSerializer(order)
        return Response(
            {"message": "Order approved successfully", "order": serializer.data},
            status=status.HTTP_200_OK,
        )

    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def reject_order(request, order_id):
    """Reject order (Admin only)"""
    user_id = str(request.user.id) if hasattr(request.user, "id") else str(request.user)

    if not is_admin(user_id):
        return Response(
            {"error": "Only admins can reject orders"}, status=status.HTTP_403_FORBIDDEN
        )

    try:
        order = Order.objects.get(id=order_id)

        if order.status != Order.STATUS_PENDING:
            return Response(
                {"error": f"Order is already {order.status}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        rejection_reason = request.data.get("rejection_reason", "")
        if not rejection_reason:
            return Response(
                {"error": "Rejection reason is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        order.status = Order.STATUS_REJECTED
        order.rejection_reason = rejection_reason
        order.admin_notes = request.data.get("admin_notes", "")
        order.save()

        serializer = OrderSerializer(order)
        return Response(
            {"message": "Order rejected", "order": serializer.data},
            status=status.HTTP_200_OK,
        )

    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def mark_shipped(request, order_id):
    """Mark order as shipped (Admin only)"""
    user_id = str(request.user.id) if hasattr(request.user, "id") else str(request.user)

    if not is_admin(user_id):
        return Response(
            {"error": "Only admins can mark orders as shipped"},
            status=status.HTTP_403_FORBIDDEN,
        )

    try:
        order = Order.objects.get(id=order_id)

        if order.status != Order.STATUS_APPROVED:
            return Response(
                {"error": "Only approved orders can be shipped"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        order.status = Order.STATUS_SHIPPED
        order.tracking_number = request.data.get("tracking_number", "")
        order.save()

        serializer = OrderSerializer(order)
        return Response(
            {"message": "Order marked as shipped", "order": serializer.data},
            status=status.HTTP_200_OK,
        )

    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)
