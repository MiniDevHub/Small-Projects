from mongoengine import (
    Document,
    StringField,
    FloatField,
    IntField,
    DateTimeField,
    ListField,
    EmbeddedDocument,
    EmbeddedDocumentField,
)
from datetime import datetime
import random
import string


class OrderItem(EmbeddedDocument):
    """Order item embedded document"""

    product_id = StringField(required=True)
    product_name = StringField(required=True)
    quantity = IntField(required=True)
    unit_price = FloatField(required=True)
    subtotal = FloatField(required=True)


class Order(Document):
    """Order model for Dealer → Admin product orders"""

    STATUS_PENDING = "pending"
    STATUS_APPROVED = "approved"
    STATUS_REJECTED = "rejected"
    STATUS_SHIPPED = "shipped"
    STATUS_DELIVERED = "delivered"

    STATUS_CHOICES = (
        (STATUS_PENDING, "Pending"),
        (STATUS_APPROVED, "Approved"),
        (STATUS_REJECTED, "Rejected"),
        (STATUS_SHIPPED, "Shipped"),
        (STATUS_DELIVERED, "Delivered"),
    )

    # Order details
    order_number = StringField(required=True, unique=True)
    dealer_id = StringField(required=True)
    dealer_name = StringField(required=True)

    # Items
    items = ListField(EmbeddedDocumentField(OrderItem))

    # Amounts
    total_amount = FloatField(required=True)
    tax_amount = FloatField(default=0.0)
    grand_total = FloatField(required=True)

    # Status
    status = StringField(choices=STATUS_CHOICES, default=STATUS_PENDING)

    # Approval
    approved_by = StringField(max_length=24)  # Admin user ID
    approval_date = DateTimeField()
    rejection_reason = StringField()

    # Shipping
    expected_delivery = DateTimeField()
    actual_delivery = DateTimeField()
    tracking_number = StringField(max_length=100)

    # Notes
    dealer_notes = StringField()
    admin_notes = StringField()

    # Timestamps
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)

    meta = {
        "collection": "orders",
        "indexes": [
            "order_number",
            "dealer_id",
            "status",
            "-created_at",
        ],
        "ordering": ["-created_at"],
    }

    def __str__(self):
        return f"Order {self.order_number} - {self.dealer_name}"

    def save(self, *args, **kwargs):
        """Override save to update timestamp"""
        self.updated_at = datetime.utcnow()
        return super(Order, self).save(*args, **kwargs)

    @staticmethod
    def generate_order_number():
        """Generate unique order number"""
        date_part = datetime.now().strftime("%Y%m%d")
        random_part = "".join(random.choices(string.digits, k=6))
        return f"ORD-{date_part}-{random_part}"
