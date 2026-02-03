"""
Inventory management views.
Dealers manage their stock, Employees can view, Admin can view all.
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

from .models import DealerInventory, InventoryTransaction
from .serializers import (
    DealerInventorySerializer,
    InventoryAdjustmentSerializer,
    InventoryTransactionSerializer,
)
from apps.users.models import User
from apps.users.backends import MongoEngineJWTAuthentication
from apps.products.models import Product


class InventoryPagination(PageNumberPagination):
    page_size = 50
    page_size_query_param = "page_size"
    max_page_size = 200


# ============================================
# DEALER/EMPLOYEE ENDPOINTS (View Inventory)
# ============================================


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def get_dealer_inventory(request):
    """
    Get dealer inventory.
    - Dealer: View their own inventory
    - Employee: View their dealer's inventory

    GET /api/inventory/
    """
    try:
        user = request.user

        # Get dealer_id based on role
        if user.role == User.ROLE_DEALER:
            dealer_id = str(user.id)
        elif user.role == User.ROLE_EMPLOYEE:
            if not user.dealer_id:
                return Response(
                    {
                        "success": False,
                        "message": "No dealer associated with your account",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            dealer_id = user.dealer_id
        else:
            return Response(
                {
                    "success": False,
                    "message": "Only Dealers and Employees can view inventory",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        # Get inventory
        inventory = DealerInventory.objects(dealer_id=dealer_id)

        # Filter by low stock
        low_stock_only = request.GET.get("low_stock", "").lower() == "true"
        if low_stock_only:
            inventory = inventory.filter(low_stock_alert=True)

        inventory = inventory.order_by("-updated_at")

        # Pagination
        paginator = InventoryPagination()
        paginated_inventory = paginator.paginate_queryset(inventory, request)

        serializer = DealerInventorySerializer(paginated_inventory, many=True)
        return paginator.get_paginated_response(serializer.data)

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve inventory",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def get_low_stock_items(request):
    """
    Get low stock items.
    - Dealer: Their own low stock items
    - Employee: Their dealer's low stock items

    GET /api/inventory/low-stock/
    """
    try:
        user = request.user

        # Get dealer_id based on role
        if user.role == User.ROLE_DEALER:
            dealer_id = str(user.id)
        elif user.role == User.ROLE_EMPLOYEE:
            if not user.dealer_id:
                return Response(
                    {
                        "success": False,
                        "message": "No dealer associated with your account",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            dealer_id = user.dealer_id
        else:
            return Response(
                {
                    "success": False,
                    "message": "Only Dealers and Employees can view inventory",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        # Get low stock items
        inventory = DealerInventory.objects(
            dealer_id=dealer_id, low_stock_alert=True
        ).order_by("quantity")

        serializer = DealerInventorySerializer(inventory, many=True)
        return Response(
            {
                "success": True,
                "count": len(serializer.data),
                "low_stock_items": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve low stock items",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def get_inventory_item(request, inventory_id):
    """
    Get specific inventory item details.

    GET /api/inventory/<inventory_id>/
    """
    try:
        user = request.user
        inventory_item = DealerInventory.objects.get(id=inventory_id)

        # Check permissions
        if user.role == User.ROLE_DEALER:
            if inventory_item.dealer_id != str(user.id):
                return Response(
                    {
                        "success": False,
                        "message": "You can only view your own inventory",
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )
        elif user.role == User.ROLE_EMPLOYEE:
            if inventory_item.dealer_id != user.dealer_id:
                return Response(
                    {
                        "success": False,
                        "message": "You can only view your dealer's inventory",
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )
        elif user.role == User.ROLE_ADMIN:
            pass  # Admin can view any inventory
        else:
            return Response(
                {"success": False, "message": "Access denied"},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = DealerInventorySerializer(inventory_item)
        return Response(
            {"success": True, "inventory": serializer.data},
            status=status.HTTP_200_OK,
        )

    except DealerInventory.DoesNotExist:
        return Response(
            {"success": False, "message": "Inventory item not found"},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve inventory item",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


# ============================================
# DEALER ENDPOINTS (Manage Inventory)
# ============================================


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def adjust_inventory(request, inventory_id):
    """
    Manual inventory adjustment (Dealer only).
    For damage, loss, or manual corrections.

    PATCH /api/inventory/<inventory_id>/adjust/
    """
    try:
        # Check if user is Dealer
        if request.user.role != User.ROLE_DEALER:
            return Response(
                {
                    "success": False,
                    "message": "Only Dealers can adjust inventory",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        inventory_item = DealerInventory.objects.get(id=inventory_id)

        # Check if inventory belongs to dealer
        if inventory_item.dealer_id != str(request.user.id):
            return Response(
                {
                    "success": False,
                    "message": "You can only adjust your own inventory",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = InventoryAdjustmentSerializer(data=request.data)

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
        quantity_change = data["quantity_change"]
        transaction_type = data.get("transaction_type", "adjustment")
        notes = data.get("notes", "")

        # Record quantity before
        quantity_before = inventory_item.quantity

        # Apply change
        new_quantity = quantity_before + quantity_change

        if new_quantity < 0:
            return Response(
                {
                    "success": False,
                    "message": f"Insufficient stock. Current: {quantity_before}",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        inventory_item.quantity = new_quantity
        inventory_item.save()

        # Record transaction
        transaction = InventoryTransaction(
            dealer_id=inventory_item.dealer_id,
            product_id=inventory_item.product_id,
            product_name=inventory_item.product_name,
            transaction_type=transaction_type,
            quantity_change=quantity_change,
            quantity_before=quantity_before,
            quantity_after=new_quantity,
            performed_by=str(request.user.id),
            performed_by_name=request.user.get_full_name(),
            notes=notes,
        )
        transaction.save()

        serializer = DealerInventorySerializer(inventory_item)
        return Response(
            {
                "success": True,
                "message": "Inventory adjusted successfully",
                "inventory": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    except DealerInventory.DoesNotExist:
        return Response(
            {"success": False, "message": "Inventory item not found"},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Inventory adjustment failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def get_inventory_transactions(request, inventory_id):
    """
    Get transaction history for inventory item.

    GET /api/inventory/<inventory_id>/transactions/
    """
    try:
        user = request.user
        inventory_item = DealerInventory.objects.get(id=inventory_id)

        # Check permissions
        if user.role == User.ROLE_DEALER:
            if inventory_item.dealer_id != str(user.id):
                return Response(
                    {
                        "success": False,
                        "message": "You can only view your own inventory transactions",
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )
        elif user.role == User.ROLE_EMPLOYEE:
            if inventory_item.dealer_id != user.dealer_id:
                return Response(
                    {
                        "success": False,
                        "message": "You can only view your dealer's inventory transactions",
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )
        elif user.role == User.ROLE_ADMIN:
            pass  # Admin can view any transactions
        else:
            return Response(
                {"success": False, "message": "Access denied"},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Get transactions
        transactions = InventoryTransaction.objects(
            dealer_id=inventory_item.dealer_id, product_id=inventory_item.product_id
        ).order_by("-timestamp")

        serializer = InventoryTransactionSerializer(transactions, many=True)
        return Response(
            {
                "success": True,
                "count": len(serializer.data),
                "transactions": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    except DealerInventory.DoesNotExist:
        return Response(
            {"success": False, "message": "Inventory item not found"},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve transactions",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


# ============================================
# ADMIN ENDPOINTS (View All Inventories)
# ============================================


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def get_all_dealer_inventories(request):
    """
    Get all dealer inventories (Admin only).

    GET /api/inventory/all/
    """
    try:
        # Check if user is Admin
        if request.user.role != User.ROLE_ADMIN:
            return Response(
                {
                    "success": False,
                    "message": "Only Admins can view all inventories",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        # Get all inventories
        inventories = DealerInventory.objects.all()

        # Filter by low stock
        low_stock_only = request.GET.get("low_stock", "").lower() == "true"
        if low_stock_only:
            inventories = inventories.filter(low_stock_alert=True)

        # Filter by dealer
        dealer_id = request.GET.get("dealer_id", "")
        if dealer_id:
            inventories = inventories.filter(dealer_id=dealer_id)

        inventories = inventories.order_by("-updated_at")

        # Pagination
        paginator = InventoryPagination()
        paginated_inventories = paginator.paginate_queryset(inventories, request)

        serializer = DealerInventorySerializer(paginated_inventories, many=True)
        return paginator.get_paginated_response(serializer.data)

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve inventories",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def get_dealer_inventory_by_admin(request, dealer_id):
    """
    Get specific dealer's inventory (Admin only).

    GET /api/inventory/dealer/<dealer_id>/
    """
    try:
        # Check if user is Admin
        if request.user.role != User.ROLE_ADMIN:
            return Response(
                {
                    "success": False,
                    "message": "Only Admins can view dealer inventories",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        # Verify dealer exists
        try:
            dealer = User.objects.get(id=dealer_id, role=User.ROLE_DEALER)
        except User.DoesNotExist:
            return Response(
                {"success": False, "message": "Dealer not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Get dealer's inventory
        inventories = DealerInventory.objects(dealer_id=dealer_id).order_by(
            "-updated_at"
        )

        serializer = DealerInventorySerializer(inventories, many=True)
        return Response(
            {
                "success": True,
                "dealer": {
                    "id": str(dealer.id),
                    "name": dealer.get_full_name(),
                    "dealership_name": dealer.dealership_name,
                },
                "count": len(serializer.data),
                "inventories": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve dealer inventory",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
