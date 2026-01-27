from mongoengine import (
    Document,
    StringField,
    FloatField,
    IntField,
    DateTimeField,
    ListField,
    BooleanField,
    EmbeddedDocument,
    EmbeddedDocumentField,
    DictField,
)
from datetime import datetime, timedelta
import random
import string


class SaleItem(EmbeddedDocument):
    """Sale item embedded document"""

    product_id = StringField(required=True)
    product_name = StringField(required=True)
    quantity = IntField(required=True)
    unit_price = FloatField(required=True)
    discount = FloatField(default=0.0)
    tax_rate = FloatField(default=18.0)
    subtotal = FloatField(required=True)


class CustomerDetails(EmbeddedDocument):
    """Customer details for walk-ins"""

    name = StringField()
    phone = StringField()
    email = StringField()
    address = StringField()


class PaymentDetails(EmbeddedDocument):
    """Payment details embedded document"""

    transaction_id = StringField()
    emi_months = IntField()
    down_payment = FloatField()


class WarrantyInfo(EmbeddedDocument):
    """Warranty information embedded document"""

    is_activated = BooleanField(default=True)
    activation_date = DateTimeField(default=datetime.utcnow)
    expiry_date = DateTimeField()
    free_services_total = IntField(default=4)
    free_services_used = IntField(default=0)
    free_services_remaining = IntField(default=4)


class Sale(Document):
    """Sale/Invoice model for customer purchases"""

    PAYMENT_CASH = "cash"
    PAYMENT_CARD = "card"
    PAYMENT_UPI = "upi"
    PAYMENT_EMI = "emi"
    PAYMENT_BANK_TRANSFER = "bank_transfer"

    PAYMENT_METHOD_CHOICES = (
        (PAYMENT_CASH, "Cash"),
        (PAYMENT_CARD, "Card"),
        (PAYMENT_UPI, "UPI"),
        (PAYMENT_EMI, "EMI"),
        (PAYMENT_BANK_TRANSFER, "Bank Transfer"),
    )

    STATUS_PAID = "paid"
    STATUS_PENDING = "pending"
    STATUS_PARTIAL = "partial"

    PAYMENT_STATUS_CHOICES = (
        (STATUS_PAID, "Paid"),
        (STATUS_PENDING, "Pending"),
        (STATUS_PARTIAL, "Partial"),
    )

    DELIVERY_PENDING = "pending"
    DELIVERY_READY = "ready"
    DELIVERY_DELIVERED = "delivered"

    DELIVERY_STATUS_CHOICES = (
        (DELIVERY_PENDING, "Pending"),
        (DELIVERY_READY, "Ready"),
        (DELIVERY_DELIVERED, "Delivered"),
    )

    # Invoice details
    invoice_number = StringField(required=True, unique=True)

    # Parties
    dealer_id = StringField(required=True)
    employee_id = StringField(required=True)
    customer_id = StringField()  # Nullable for walk-ins

    # Customer details (for walk-ins)
    customer = EmbeddedDocumentField(CustomerDetails)

    # Items
    items = ListField(EmbeddedDocumentField(SaleItem))

    # Billing
    subtotal = FloatField(required=True)
    discount = FloatField(default=0.0)
    tax_amount = FloatField(required=True)
    grand_total = FloatField(required=True)

    # Payment
    payment_method = StringField(choices=PAYMENT_METHOD_CHOICES)
    payment_status = StringField(choices=PAYMENT_STATUS_CHOICES)
    payment_details = EmbeddedDocumentField(PaymentDetails)

    # Warranty
    warranty = EmbeddedDocumentField(WarrantyInfo)

    # Documents
    invoice_pdf = StringField()

    # Status
    delivery_status = StringField(
        choices=DELIVERY_STATUS_CHOICES, default=DELIVERY_PENDING
    )

    # Timestamps
    sale_date = DateTimeField(default=datetime.utcnow)
    created_at = DateTimeField(default=datetime.utcnow)

    meta = {
        "collection": "sales",
        "indexes": [
            "invoice_number",
            "dealer_id",
            "employee_id",
            "customer_id",
            "-sale_date",
        ],
        "ordering": ["-sale_date"],
    }

    def __str__(self):
        return f"Invoice {self.invoice_number}"

    @staticmethod
    def generate_invoice_number():
        """Generate unique invoice number"""
        date_part = datetime.now().strftime("%Y%m%d")
        random_part = "".join(random.choices(string.digits, k=6))
        return f"INV-{date_part}-{random_part}"


class StockMovement(Document):
    """Stock movement audit trail"""

    MOVEMENT_ORDER_RECEIVED = "order_received"
    MOVEMENT_SALE = "sale"
    MOVEMENT_RETURN = "return"
    MOVEMENT_ADJUSTMENT = "adjustment"

    MOVEMENT_TYPE_CHOICES = (
        (MOVEMENT_ORDER_RECEIVED, "Order Received"),
        (MOVEMENT_SALE, "Sale"),
        (MOVEMENT_RETURN, "Return"),
        (MOVEMENT_ADJUSTMENT, "Adjustment"),
    )

    product_id = StringField(required=True)
    dealer_id = StringField()
    movement_type = StringField(choices=MOVEMENT_TYPE_CHOICES)
    quantity = IntField(
        required=True
    )  # Positive for additions, negative for deductions
    reference_id = StringField()  # order_id or sale_id
    reference_type = StringField()
    performed_by = StringField()  # User ID
    notes = StringField()
    previous_stock = IntField()
    new_stock = IntField()
    timestamp = DateTimeField(default=datetime.utcnow)

    meta = {
        "collection": "stock_movements",
        "indexes": [
            "product_id",
            "dealer_id",
            "-timestamp",
        ],
    }
