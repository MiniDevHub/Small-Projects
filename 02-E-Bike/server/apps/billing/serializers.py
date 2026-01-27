from rest_framework import serializers
from .models import Sale, SaleItem, CustomerDetails, PaymentDetails, WarrantyInfo


class SaleItemSerializer(serializers.Serializer):
    product_id = serializers.CharField()
    product_name = serializers.CharField(read_only=True)
    quantity = serializers.IntegerField(min_value=1)
    unit_price = serializers.FloatField(read_only=True)
    discount = serializers.FloatField(default=0.0)
    tax_rate = serializers.FloatField(default=18.0)
    subtotal = serializers.FloatField(read_only=True)


class CustomerDetailsSerializer(serializers.Serializer):
    name = serializers.CharField(required=False)
    phone = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)
    address = serializers.CharField(required=False)


class PaymentDetailsSerializer(serializers.Serializer):
    transaction_id = serializers.CharField(required=False)
    emi_months = serializers.IntegerField(required=False)
    down_payment = serializers.FloatField(required=False)


class WarrantyInfoSerializer(serializers.Serializer):
    is_activated = serializers.BooleanField()
    activation_date = serializers.DateTimeField()
    expiry_date = serializers.DateTimeField()
    free_services_total = serializers.IntegerField()
    free_services_used = serializers.IntegerField()
    free_services_remaining = serializers.IntegerField()


class SaleSerializer(serializers.Serializer):
    id = serializers.SerializerMethodField()
    invoice_number = serializers.CharField()
    dealer_id = serializers.CharField()
    employee_id = serializers.CharField()
    customer_id = serializers.CharField(allow_null=True)
    customer = CustomerDetailsSerializer(required=False)
    items = SaleItemSerializer(many=True)
    subtotal = serializers.FloatField()
    discount = serializers.FloatField()
    tax_amount = serializers.FloatField()
    grand_total = serializers.FloatField()
    payment_method = serializers.ChoiceField(choices=Sale.PAYMENT_METHOD_CHOICES)
    payment_status = serializers.ChoiceField(choices=Sale.PAYMENT_STATUS_CHOICES)
    payment_details = PaymentDetailsSerializer(required=False)
    warranty = WarrantyInfoSerializer(required=False)
    invoice_pdf = serializers.CharField(required=False)
    delivery_status = serializers.ChoiceField(choices=Sale.DELIVERY_STATUS_CHOICES)
    sale_date = serializers.DateTimeField()
    created_at = serializers.DateTimeField()

    def get_id(self, obj):
        return str(obj.id)


class CreateSaleSerializer(serializers.Serializer):
    customer_id = serializers.CharField(required=False, allow_null=True)
    customer = CustomerDetailsSerializer(required=False)
    items = SaleItemSerializer(many=True)
    discount = serializers.FloatField(default=0.0)
    payment_method = serializers.ChoiceField(choices=Sale.PAYMENT_METHOD_CHOICES)
    payment_details = PaymentDetailsSerializer(required=False)

    def validate(self, data):
        # Either customer_id or customer details must be provided
        if not data.get("customer_id") and not data.get("customer"):
            raise serializers.ValidationError(
                "Either customer_id or customer details must be provided"
            )

        if not data.get("items"):
            raise serializers.ValidationError("At least one item is required")

        return data
