from rest_framework import serializers
from .models import (
    Product,
    ProductSpecifications,
    ServiceCharges,
    Warranty,
    ProductImage,
)


class ProductSpecificationsSerializer(serializers.Serializer):
    range_km = serializers.CharField(max_length=50, required=False)
    battery_type = serializers.CharField(max_length=100, required=False)
    battery_capacity = serializers.CharField(max_length=50, required=False)
    top_speed = serializers.CharField(max_length=50, required=False)
    charging_time = serializers.CharField(max_length=50, required=False)
    motor_power = serializers.CharField(max_length=50, required=False)
    weight = serializers.CharField(max_length=50, required=False)
    load_capacity = serializers.CharField(max_length=50, required=False)
    colors = serializers.ListField(child=serializers.CharField(), required=False)
    length = serializers.CharField(max_length=50, required=False)
    width = serializers.CharField(max_length=50, required=False)
    height = serializers.CharField(max_length=50, required=False)


class ServiceChargesSerializer(serializers.Serializer):
    standard_service = serializers.FloatField(default=500.0)
    major_service = serializers.FloatField(default=1000.0)
    repair = serializers.FloatField(default=500.0)
    inspection = serializers.FloatField(default=300.0)


class WarrantySerializer(serializers.Serializer):
    free_services = serializers.IntegerField(default=4)
    warranty_period_months = serializers.IntegerField(default=24)
    terms = serializers.CharField(required=False, allow_blank=True)


class ProductImageSerializer(serializers.Serializer):
    url = serializers.CharField()
    alt = serializers.CharField(max_length=200, required=False)
    is_primary = serializers.BooleanField(default=False)


class ProductSerializer(serializers.Serializer):
    id = serializers.SerializerMethodField()
    name = serializers.CharField(max_length=200)
    slug = serializers.CharField(max_length=200)
    model = serializers.CharField(max_length=100)
    description = serializers.CharField(required=False, allow_blank=True)
    specifications = ProductSpecificationsSerializer(required=False)
    base_price = serializers.FloatField()
    dealer_price = serializers.FloatField()
    mrp = serializers.FloatField()
    tax_rate = serializers.FloatField(default=18.0)
    service_charges = ServiceChargesSerializer(required=False)
    warranty = WarrantySerializer(required=False)
    images = ProductImageSerializer(many=True, required=False)
    videos = serializers.ListField(child=serializers.CharField(), required=False)
    total_stock = serializers.IntegerField(default=0)
    low_stock_threshold = serializers.IntegerField(default=10)
    is_available = serializers.BooleanField(default=True)
    is_featured = serializers.BooleanField(default=False)
    category = serializers.CharField(max_length=100, required=False)
    meta_title = serializers.CharField(max_length=200, required=False)
    meta_description = serializers.CharField(max_length=500, required=False)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)
    is_low_stock = serializers.SerializerMethodField()

    def get_id(self, obj):
        return str(obj.id)

    def get_is_low_stock(self, obj):
        return obj.is_low_stock


class ProductCreateUpdateSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    slug = serializers.CharField(max_length=200)
    model = serializers.CharField(max_length=100)
    description = serializers.CharField(required=False, allow_blank=True)
    specifications = ProductSpecificationsSerializer(required=False)
    base_price = serializers.FloatField()
    dealer_price = serializers.FloatField()
    mrp = serializers.FloatField()
    tax_rate = serializers.FloatField(default=18.0)
    service_charges = ServiceChargesSerializer(required=False)
    warranty = WarrantySerializer(required=False)
    images = ProductImageSerializer(many=True, required=False)
    videos = serializers.ListField(child=serializers.CharField(), required=False)
    total_stock = serializers.IntegerField(default=0)
    low_stock_threshold = serializers.IntegerField(default=10)
    is_available = serializers.BooleanField(default=True)
    is_featured = serializers.BooleanField(default=False)
    category = serializers.CharField(max_length=100, required=False, allow_blank=True)
    meta_title = serializers.CharField(max_length=200, required=False, allow_blank=True)
    meta_description = serializers.CharField(
        max_length=500, required=False, allow_blank=True
    )

    def validate_slug(self, value):
        """Check if slug is unique (for create)"""
        instance = self.context.get("instance")
        if instance:
            # For update, exclude current instance
            if Product.objects(slug=value, id__ne=instance.id).first():
                raise serializers.ValidationError(
                    "Product with this slug already exists."
                )
        else:
            # For create
            if Product.objects(slug=value).first():
                raise serializers.ValidationError(
                    "Product with this slug already exists."
                )
        return value
