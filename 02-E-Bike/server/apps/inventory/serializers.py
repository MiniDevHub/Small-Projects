from rest_framework import serializers
from .models import DealerInventory, InventoryTransaction


class DealerInventorySerializer(serializers.Serializer):
    """Serializer for DealerInventory"""

    id = serializers.SerializerMethodField()
    dealer_id = serializers.CharField()
    dealer_name = serializers.CharField()
    product_id = serializers.CharField()
    product_name = serializers.CharField()
    product_model = serializers.CharField()
    quantity = serializers.IntegerField()
    reserved_quantity = serializers.IntegerField()
    available_quantity = serializers.SerializerMethodField()
    low_stock_threshold = serializers.IntegerField()
    low_stock_alert = serializers.BooleanField()
    last_restocked = serializers.DateTimeField(allow_null=True)
    last_sold = serializers.DateTimeField(allow_null=True)
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()

    def get_id(self, obj):
        return str(obj.id)

    def get_available_quantity(self, obj):
        return obj.available_quantity


class InventoryAdjustmentSerializer(serializers.Serializer):
    """Serializer for manual inventory adjustment"""

    quantity_change = serializers.IntegerField(required=True)
    transaction_type = serializers.ChoiceField(
        choices=InventoryTransaction.TRANSACTION_TYPES, default="adjustment"
    )
    notes = serializers.CharField(required=False, allow_blank=True)

    def validate_quantity_change(self, value):
        if value == 0:
            raise serializers.ValidationError("Quantity change cannot be zero")
        return value


class InventoryTransactionSerializer(serializers.Serializer):
    """Serializer for InventoryTransaction"""

    id = serializers.SerializerMethodField()
    dealer_id = serializers.CharField()
    product_id = serializers.CharField()
    product_name = serializers.CharField()
    transaction_type = serializers.ChoiceField(
        choices=InventoryTransaction.TRANSACTION_TYPES
    )
    quantity_change = serializers.IntegerField()
    quantity_before = serializers.IntegerField()
    quantity_after = serializers.IntegerField()
    order_id = serializers.CharField(allow_null=True)
    performed_by = serializers.CharField(allow_null=True)
    performed_by_name = serializers.CharField(allow_null=True)
    notes = serializers.CharField(allow_blank=True)
    timestamp = serializers.DateTimeField()

    def get_id(self, obj):
        return str(obj.id)
