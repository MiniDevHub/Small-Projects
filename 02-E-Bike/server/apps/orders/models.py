from mongoengine import (
    Document,
    StringField,
    FloatField,
    IntField,
    DateTimeField,
    ListField,
    EmbeddedDocument,
    EmbeddedDocumentField,
    BooleanField,
)
from datetime import datetime
import random
import string


class OrderItem(EmbeddedDocument):
    """Order item embedded document"""

    product_id = StringField(required=True)
    product_name = StringField(required=True)
    product_model = StringField()
    quantity = IntField(required=True, min_value=1)
    unit_price = FloatField(required=True)
    subtotal = FloatField(required=True)


class DealerOrder(Document):
    """
    Dealer ordering stock from Admin.
    Admin must approve before stock is allocated.
    """

    STATUS_PENDING = "pending"
    STATUS_APPROVED = "approved"
    STATUS_REJECTED = "rejected"
    STATUS_SHIPPED = "shipped"
    STATUS_DELIVERED = "delivered"

    STATUS_CHOICES = (
        (STATUS_PENDING, "Pending Approval"),
        (STATUS_APPROVED, "Approved"),
        (STATUS_REJECTED, "Rejected"),
        (STATUS_SHIPPED, "Shipped"),
        (STATUS_DELIVERED, "Delivered"),
    )

    # Order details
    order_number = StringField(required=True, unique=True)
    dealer_id = StringField(required=True, max_length=24)
    dealer_name = StringField(required=True)
    dealer_email = StringField()
    dealer_phone = StringField()

    # Items
    items = ListField(EmbeddedDocumentField(OrderItem), required=True)

    # Amounts
    total_amount = FloatField(required=True)
    tax_amount = FloatField(default=0.0)
    grand_total = FloatField(required=True)

    # Status
    status = StringField(choices=STATUS_CHOICES, default=STATUS_PENDING)

    # Approval (Admin)
    approved_by = StringField(max_length=24)  # Admin user ID
    approved_by_name = StringField()
    approval_date = DateTimeField()
    rejection_reason = StringField()

    # Shipping
    expected_delivery = DateTimeField()
    actual_delivery = DateTimeField()
    tracking_number = StringField(max_length=100)
    shipping_address = StringField()

    # Notes
    dealer_notes = StringField()
    admin_notes = StringField()

    # Timestamps
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)

    meta = {
        "collection": "dealer_orders",
        "indexes": [
            "order_number",
            "dealer_id",
            "status",
            "-created_at",
        ],
        "ordering": ["-created_at"],
    }

    def __str__(self):
        return f"Dealer Order {self.order_number} - {self.dealer_name}"

    def save(self, *args, **kwargs):
        """Override save to update timestamp"""
        self.updated_at = datetime.utcnow()
        return super(DealerOrder, self).save(*args, **kwargs)

    @staticmethod
    def generate_order_number():
        """Generate unique dealer order number"""
        date_part = datetime.now().strftime("%Y%m%d")
        random_part = "".join(random.choices(string.digits, k=6))
        return f"DO-{date_part}-{random_part}"


class CustomerOrder(Document):
    """
    Customer ordering from Dealer.
    No admin approval needed - direct purchase.
    """

    STATUS_PENDING = "pending"
    STATUS_CONFIRMED = "confirmed"
    STATUS_PROCESSING = "processing"
    STATUS_READY = "ready_for_pickup"
    STATUS_DELIVERED = "delivered"
    STATUS_CANCELLED = "cancelled"

    STATUS_CHOICES = (
        (STATUS_PENDING, "Pending"),
        (STATUS_CONFIRMED, "Confirmed"),
        (STATUS_PROCESSING, "Processing"),
        (STATUS_READY, "Ready for Pickup"),
        (STATUS_DELIVERED, "Delivered"),
        (STATUS_CANCELLED, "Cancelled"),
    )

    PAYMENT_PENDING = "pending"
    PAYMENT_PARTIAL = "partial"
    PAYMENT_COMPLETED = "completed"

    PAYMENT_STATUS_CHOICES = (
        (PAYMENT_PENDING, "Pending"),
        (PAYMENT_PARTIAL, "Partial"),
        (PAYMENT_COMPLETED, "Completed"),
    )

    # Order details
    order_number = StringField(required=True, unique=True)

    # Customer details
    customer_id = StringField(required=True, max_length=24)
    customer_name = StringField(required=True)
    customer_email = StringField()
    customer_phone = StringField(required=True)

    # Dealer details
    dealer_id = StringField(required=True, max_length=24)
    dealer_name = StringField(required=True)
    dealership_name = StringField()

    # Items
    items = ListField(EmbeddedDocumentField(OrderItem), required=True)

    # Amounts
    total_amount = FloatField(required=True)
    tax_amount = FloatField(default=0.0)
    discount_amount = FloatField(default=0.0)
    grand_total = FloatField(required=True)

    # Payment
    payment_status = StringField(
        choices=PAYMENT_STATUS_CHOICES, default=PAYMENT_PENDING
    )
    amount_paid = FloatField(default=0.0)
    amount_remaining = FloatField(default=0.0)

    # Status
    status = StringField(choices=STATUS_CHOICES, default=STATUS_PENDING)

    # Delivery
    delivery_address = StringField()
    delivery_city = StringField()
    delivery_state = StringField()
    delivery_pincode = StringField()
    delivery_date = DateTimeField()
    is_home_delivery = BooleanField(default=False)

    # Notes
    customer_notes = StringField()
    dealer_notes = StringField()
    cancellation_reason = StringField()

    # Processed by (Employee who handled the sale)
    processed_by = StringField(max_length=24)  # Employee ID
    processed_by_name = StringField()

    # Timestamps
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)

    meta = {
        "collection": "customer_orders",
        "indexes": [
            "order_number",
            "customer_id",
            "dealer_id",
            "status",
            "payment_status",
            "-created_at",
        ],
        "ordering": ["-created_at"],
    }

    def __str__(self):
        return f"Customer Order {self.order_number} - {self.customer_name}"

    def save(self, *args, **kwargs):
        """Override save to update timestamp"""
        self.updated_at = datetime.utcnow()
        self.amount_remaining = self.grand_total - self.amount_paid
        return super(CustomerOrder, self).save(*args, **kwargs)

    @staticmethod
    def generate_order_number():
        """Generate unique customer order number"""
        date_part = datetime.now().strftime("%Y%m%d")
        random_part = "".join(random.choices(string.digits, k=6))
        return f"CO-{date_part}-{random_part}"
