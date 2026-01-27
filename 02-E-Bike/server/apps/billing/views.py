from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
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
from apps.products.models import Product
from apps.inventory.models import DealerInventory
from datetime import datetime, timedelta
from django.conf import settings


class SalePagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 100


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_sale(request):
    """Create new sale (Dealer/Employee)"""
    user_id = request.user.id if hasattr(request.user, "id") else str(request.user)

    try:
        user = User.objects.get(id=user_id)

        # Check if user is dealer or employee
        if not (user.is_dealer or user.is_employee):
            return Response(
                {"error": "Only dealers and employees can create sales"},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Get dealer_id
        if user.is_dealer:
            dealer_id = str(user.id)
            employee_id = str(user.id)
        else:
            dealer_id = user.dealer_id
            employee_id = str(user.id)

        serializer = CreateSaleSerializer(data=request.data)

        if serializer.is_valid():
            data = serializer.validated_data

            # Calculate totals
            subtotal = 0
            tax_amount = 0
            sale_items = []

            for item_data in data["items"]:
                try:
                    product = Product.objects.get(id=item_data["product_id"])

                    # Check inventory
                    inventory = DealerInventory.objects(
                        dealer_id=dealer_id, product_id=str(product.id)
                    ).first()

                    if (
                        not inventory
                        or inventory.available_quantity < item_data["quantity"]
                    ):
                        return Response(
                            {"error": f"Insufficient stock for {product.name}"},
                            status=status.HTTP_400_BAD_REQUEST,
                        )

                    # Calculate amounts
                    unit_price = product.mrp
                    item_discount = item_data.get("discount", 0.0)
                    discounted_price = unit_price - item_discount
                    item_subtotal = discounted_price * item_data["quantity"]
                    item_tax = item_subtotal * (item_data.get("tax_rate", 18.0) / 100)

                    subtotal += item_subtotal
                    tax_amount += item_tax

                    sale_items.append(
                        SaleItem(
                            product_id=str(product.id),
                            product_name=product.name,
                            quantity=item_data["quantity"],
                            unit_price=unit_price,
                            discount=item_discount,
                            tax_rate=item_data.get("tax_rate", 18.0),
                            subtotal=item_subtotal + item_tax,
                        )
                    )

                    # Deduct from inventory
                    inventory.quantity -= item_data["quantity"]
                    inventory.save()

                    # Record stock movement
                    StockMovement(
                        product_id=str(product.id),
                        dealer_id=dealer_id,
                        movement_type=StockMovement.MOVEMENT_SALE,
                        quantity=-item_data["quantity"],
                        performed_by=user_id,
                        previous_stock=inventory.quantity + item_data["quantity"],
                        new_stock=inventory.quantity,
                    ).save()

                except Product.DoesNotExist:
                    return Response(
                        {"error": f"Product {item_data['product_id']} not found"},
                        status=status.HTTP_404_NOT_FOUND,
                    )

            # Calculate grand total
            total_discount = data.get("discount", 0.0)
            grand_total = subtotal + tax_amount - total_discount

            # Prepare customer details
            customer_details = None
            if data.get("customer"):
                customer_details = CustomerDetails(**data["customer"])

            # Prepare payment details
            payment_details = None
            if data.get("payment_details"):
                payment_details = PaymentDetails(**data["payment_details"])

            # Activate warranty
            warranty_info = WarrantyInfo(
                is_activated=True,
                activation_date=datetime.utcnow(),
                expiry_date=datetime.utcnow()
                + timedelta(days=settings.WARRANTY_MONTHS * 30),
                free_services_total=settings.FREE_SERVICES_COUNT,
                free_services_used=0,
                free_services_remaining=settings.FREE_SERVICES_COUNT,
            )

            # Create sale
            sale = Sale(
                invoice_number=Sale.generate_invoice_number(),
                dealer_id=dealer_id,
                employee_id=employee_id,
                customer_id=data.get("customer_id"),
                customer=customer_details,
                items=sale_items,
                subtotal=subtotal,
                discount=total_discount,
                tax_amount=tax_amount,
                grand_total=grand_total,
                payment_method=data["payment_method"],
                payment_status=Sale.STATUS_PAID,
                payment_details=payment_details,
                warranty=warranty_info,
                delivery_status=Sale.DELIVERY_PENDING,
            )
            sale.save()

            response_serializer = SaleSerializer(sale)
            return Response(
                {
                    "message": "Sale created successfully",
                    "sale": response_serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_sales(request):
    """List sales"""
    user_id = request.user.id if hasattr(request.user, "id") else str(request.user)

    try:
        user = User.objects.get(id=user_id)

        # Filter based on role
        if user.is_admin:
            sales = Sale.objects.all()
        elif user.is_dealer:
            sales = Sale.objects(dealer_id=str(user.id))
        elif user.is_employee:
            sales = Sale.objects(employee_id=str(user.id))
        elif user.is_customer:
            sales = Sale.objects(customer_id=str(user.id))
        else:
            return Response(
                {"error": "Access denied"}, status=status.HTTP_403_FORBIDDEN
            )

        sales = sales.order_by("-sale_date")

        # Pagination
        paginator = SalePagination()
        paginated_sales = paginator.paginate_queryset(sales, request)

        serializer = SaleSerializer(paginated_sales, many=True)
        return paginator.get_paginated_response(serializer.data)

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_sale(request, sale_id):
    """Get sale details"""
    try:
        sale = Sale.objects.get(id=sale_id)
        serializer = SaleSerializer(sale)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Sale.DoesNotExist:
        return Response({"error": "Sale not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_customer_purchases(request):
    """Get customer's purchased bikes"""
    user_id = request.user.id if hasattr(request.user, "id") else str(request.user)

    try:
        user = User.objects.get(id=user_id)

        if not user.is_customer:
            return Response(
                {"error": "Only customers can view purchases"},
                status=status.HTTP_403_FORBIDDEN,
            )

        sales = Sale.objects(customer_id=str(user.id)).order_by("-sale_date")
        serializer = SaleSerializer(sales, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
