from rest_framework import serializers
from .models import DealerOrder, CustomerOrder, OrderItem


class OrderItemSerializer(serializers.Serializer):
    product_id = serializers.CharField()
    product_name = serializers.CharField(required=False)
    product_model = serializers.CharField(required=False)
    quantity = serializers.IntegerField(min_value=1)
    unit_price = serializers.FloatField(required=False)
    subtotal = serializers.FloatField(required=False)


# ============================================
# DEALER ORDER SERIALIZERS
# ============================================


class DealerOrderSerializer(serializers.Serializer):
    """Serializer for DealerOrder"""

    id = serializers.SerializerMethodField()
    order_number = serializers.CharField()
    dealer_id = serializers.CharField()
    dealer_name = serializers.CharField()
    dealer_email = serializers.CharField(required=False)
    dealer_phone = serializers.CharField(required=False)
    items = OrderItemSerializer(many=True)
    total_amount = serializers.FloatField()
    tax_amount = serializers.FloatField()
    grand_total = serializers.FloatField()
    status = serializers.ChoiceField(choices=DealerOrder.STATUS_CHOICES)
    approved_by = serializers.CharField(required=False, allow_null=True)
    approved_by_name = serializers.CharField(required=False, allow_null=True)
    approval_date = serializers.DateTimeField(required=False, allow_null=True)
    rejection_reason = serializers.CharField(required=False, allow_blank=True)
    expected_delivery = serializers.DateTimeField(required=False, allow_null=True)
    actual_delivery = serializers.DateTimeField(required=False, allow_null=True)
    tracking_number = serializers.CharField(required=False, allow_blank=True)
    shipping_address = serializers.CharField(required=False, allow_blank=True)
    dealer_notes = serializers.CharField(required=False, allow_blank=True)
    admin_notes = serializers.CharField(required=False, allow_blank=True)
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()

    def get_id(self, obj):
        return str(obj.id)


class CreateDealerOrderSerializer(serializers.Serializer):
    """Serializer for creating dealer order"""

    items = OrderItemSerializer(many=True)
    dealer_notes = serializers.CharField(required=False, allow_blank=True)
    shipping_address = serializers.CharField(required=False, allow_blank=True)

    def validate_items(self, value):
        if not value:
            raise serializers.ValidationError("Order must have at least one item")
        return value


# ============================================
# CUSTOMER ORDER SERIALIZERS
# ============================================


class CustomerOrderSerializer(serializers.Serializer):
    """Serializer for CustomerOrder"""

    id = serializers.SerializerMethodField()
    order_number = serializers.CharField()
    customer_id = serializers.CharField()
    customer_name = serializers.CharField()
    customer_email = serializers.CharField(required=False)
    customer_phone = serializers.CharField()
    dealer_id = serializers.CharField()
    dealer_name = serializers.CharField()
    dealership_name = serializers.CharField(required=False)
    items = OrderItemSerializer(many=True)
    total_amount = serializers.FloatField()
    tax_amount = serializers.FloatField()
    discount_amount = serializers.FloatField()
    grand_total = serializers.FloatField()
    payment_status = serializers.ChoiceField(
        choices=CustomerOrder.PAYMENT_STATUS_CHOICES
    )
    amount_paid = serializers.FloatField()
    amount_remaining = serializers.FloatField()
    status = serializers.ChoiceField(choices=CustomerOrder.STATUS_CHOICES)
    delivery_address = serializers.CharField(required=False, allow_blank=True)
    delivery_city = serializers.CharField(required=False, allow_blank=True)
    delivery_state = serializers.CharField(required=False, allow_blank=True)
    delivery_pincode = serializers.CharField(required=False, allow_blank=True)
    delivery_date = serializers.DateTimeField(required=False, allow_null=True)
    is_home_delivery = serializers.BooleanField()
    customer_notes = serializers.CharField(required=False, allow_blank=True)
    dealer_notes = serializers.CharField(required=False, allow_blank=True)
    cancellation_reason = serializers.CharField(required=False, allow_blank=True)
    processed_by = serializers.CharField(required=False, allow_null=True)
    processed_by_name = serializers.CharField(required=False, allow_null=True)
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()

    def get_id(self, obj):
        return str(obj.id)


class CreateCustomerOrderSerializer(serializers.Serializer):
    """Serializer for creating customer order"""

    items = OrderItemSerializer(many=True)
    customer_name = serializers.CharField(max_length=200)
    customer_email = serializers.EmailField(required=False, allow_blank=True)
    customer_phone = serializers.CharField(max_length=15)
    delivery_address = serializers.CharField(required=False, allow_blank=True)
    delivery_city = serializers.CharField(required=False, allow_blank=True)
    delivery_state = serializers.CharField(required=False, allow_blank=True)
    delivery_pincode = serializers.CharField(required=False, allow_blank=True)
    is_home_delivery = serializers.BooleanField(default=False)
    customer_notes = serializers.CharField(required=False, allow_blank=True)
    amount_paid = serializers.FloatField(default=0.0)

    def validate_items(self, value):
        if not value:
            raise serializers.ValidationError("Order must have at least one item")
        return value
