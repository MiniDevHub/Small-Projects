from rest_framework import serializers


class DealerInventorySerializer(serializers.Serializer):
    id = serializers.SerializerMethodField()
    dealer_id = serializers.CharField()
    product_id = serializers.CharField()
    product_name = serializers.SerializerMethodField()
    quantity = serializers.IntegerField()
    reserved_quantity = serializers.IntegerField()
    available_quantity = serializers.SerializerMethodField()
    last_restocked = serializers.DateTimeField(allow_null=True)
    low_stock_alert = serializers.BooleanField()
    updated_at = serializers.DateTimeField()

    def get_id(self, obj):
        return str(obj.id)

    def get_available_quantity(self, obj):
        return obj.available_quantity

    def get_product_name(self, obj):
        from apps.products.models import Product

        try:
            product = Product.objects.get(id=obj.product_id)
            return product.name
        except:
            return "Unknown Product"
