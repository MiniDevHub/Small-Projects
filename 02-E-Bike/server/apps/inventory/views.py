from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import DealerInventory
from .serializers import DealerInventorySerializer
from apps.users.models import User


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_dealer_inventory(request):
    """Get dealer's inventory"""
    user_id = request.user.id if hasattr(request.user, "id") else str(request.user)

    try:
        user = User.objects.get(id=user_id)

        if not user.is_dealer:
            return Response(
                {"error": "Only dealers can view inventory"},
                status=status.HTTP_403_FORBIDDEN,
            )

        inventory = DealerInventory.objects(dealer_id=str(user.id))
        serializer = DealerInventorySerializer(inventory, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_low_stock_items(request):
    """Get low stock items"""
    user_id = request.user.id if hasattr(request.user, "id") else str(request.user)

    try:
        user = User.objects.get(id=user_id)

        if not user.is_dealer:
            return Response(
                {"error": "Only dealers can view inventory"},
                status=status.HTTP_403_FORBIDDEN,
            )

        inventory = DealerInventory.objects(dealer_id=str(user.id), quantity__lte=5)
        serializer = DealerInventorySerializer(inventory, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
