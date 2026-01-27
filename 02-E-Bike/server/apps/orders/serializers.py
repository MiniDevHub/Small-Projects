from rest_framework import serializers
from .models import Order, OrderItem


class OrderItemSerializer(serializers.Serializer):
    product_id = serializers.CharField()
    product_name = serializers.CharField()
    quantity = serializers.IntegerField(min_value=1)
    unit_price = serializers.FloatField()
    subtotal = serializers.FloatField()


class OrderSerializer(serializers.Serializer):
    id = serializers.SerializerMethodField()
    order_number = serializers.CharField()
    dealer_id = serializers.CharField()
    dealer_name = serializers.CharField()
    items = OrderItemSerializer(many=True)
    total_amount = serializers.FloatField()
    tax_amount = serializers.FloatField()
    grand_total = serializers.FloatField()
    status = serializers.ChoiceField(choices=Order.STATUS_CHOICES)
    approved_by = serializers.CharField(required=False, allow_null=True)
    approval_date = serializers.DateTimeField(required=False, allow_null=True)
    rejection_reason = serializers.CharField(required=False, allow_blank=True)
    expected_delivery = serializers.DateTimeField(required=False, allow_null=True)
    actual_delivery = serializers.DateTimeField(required=False, allow_null=True)
    tracking_number = serializers.CharField(required=False, allow_blank=True)
    dealer_notes = serializers.CharField(required=False, allow_blank=True)
    admin_notes = serializers.CharField(required=False, allow_blank=True)
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()

    def get_id(self, obj):
        return str(obj.id)


class CreateOrderSerializer(serializers.Serializer):
    items = OrderItemSerializer(many=True)
    dealer_notes = serializers.CharField(required=False, allow_blank=True)

    def validate_items(self, value):
        if not value:
            raise serializers.ValidationError("Order must have at least one item")
        return value
