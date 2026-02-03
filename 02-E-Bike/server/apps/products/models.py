from mongoengine import (
    Document,
    fields,
    StringField,
    FloatField,
    IntField,
    BooleanField,
    DateTimeField,
    ListField,
    DictField,
    EmbeddedDocument,
    EmbeddedDocumentField,
)
from datetime import datetime
import os


class ProductSpecifications(EmbeddedDocument):
    """Embedded document for product specifications"""

    range_km = StringField(max_length=50)  # "50-60 KM"
    battery_type = StringField(max_length=100)
    battery_capacity = StringField(max_length=50)
    top_speed = StringField(max_length=50)
    charging_time = StringField(max_length=50)
    motor_power = StringField(max_length=50)
    weight = StringField(max_length=50)
    load_capacity = StringField(max_length=50)
    colors = ListField(StringField(max_length=50))
    length = StringField(max_length=50)
    width = StringField(max_length=50)
    height = StringField(max_length=50)


class ServiceCharges(EmbeddedDocument):
    """Embedded document for service charges"""

    standard_service = FloatField(default=500.0)
    major_service = FloatField(default=1000.0)
    repair = FloatField(default=500.0)
    inspection = FloatField(default=300.0)


class Warranty(EmbeddedDocument):
    """Embedded document for warranty details"""

    free_services = IntField(default=4)
    warranty_period_months = IntField(default=24)
    terms = StringField()


class ProductImage(EmbeddedDocument):
    """Embedded document for product images"""

    url = fields.StringField(required=True)  # Relative path: /media/products/image.jpg
    alt = fields.StringField(max_length=200)
    is_primary = fields.BooleanField(default=False)
    uploaded_at = fields.DateTimeField(default=datetime.now)


class Product(Document):
    """Product model for e-bikes"""

    # Basic Information
    name = StringField(required=True, max_length=200)
    slug = StringField(required=True, unique=True, max_length=200)
    model = StringField(required=True, max_length=100)  # LIGHTNING, MARIUM, etc.
    description = StringField()

    # Specifications
    specifications = EmbeddedDocumentField(ProductSpecifications)

    # Pricing
    base_price = FloatField(required=True)
    dealer_price = FloatField(required=True)  # Wholesale price
    mrp = FloatField(required=True)
    tax_rate = FloatField(default=18.0)  # GST percentage

    # Service & Warranty
    service_charges = EmbeddedDocumentField(ServiceCharges, default=ServiceCharges)
    warranty = EmbeddedDocumentField(Warranty, default=Warranty)

    # Media
    images = fields.ListField(fields.EmbeddedDocumentField(ProductImage), default=list)
    videos = ListField(StringField())

    # Inventory
    total_stock = IntField(default=0)  # Admin master stock
    low_stock_threshold = IntField(default=10)

    # Status
    is_available = BooleanField(default=True)
    is_featured = BooleanField(default=False)
    category = StringField(max_length=100)

    # SEO
    meta_title = StringField(max_length=200)
    meta_description = StringField(max_length=500)

    # Timestamps
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    created_by = StringField(max_length=24)  # User ID

    meta = {
        "collection": "products",
        "indexes": [
            "slug",
            "model",
            "category",
            "is_available",
            "-created_at",
        ],
        "ordering": ["-created_at"],
    }

    def __str__(self):
        return f"{self.name} ({self.model})"

    def save(self, *args, **kwargs):
        """Override save to update timestamp"""
        self.updated_at = datetime.utcnow()
        return super(Product, self).save(*args, **kwargs)

    @property
    def is_low_stock(self):
        """Check if stock is low"""
        return self.total_stock <= self.low_stock_threshold
