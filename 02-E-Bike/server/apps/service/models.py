from mongoengine import (
    Document,
    StringField,
    IntField,
    FloatField,
    DateTimeField,
    ListField,
    BooleanField,
    EmbeddedDocument,
    EmbeddedDocumentField,
)
from datetime import datetime
import random
import string


class PartUsed(EmbeddedDocument):
    """Parts used in service"""

    part_name = StringField(required=True)
    quantity = IntField(required=True)
    cost = FloatField(required=True)


class StatusHistory(EmbeddedDocument):
    """Status change history"""

    status = StringField(required=True)
    timestamp = DateTimeField(default=datetime.utcnow)
    updated_by = StringField()
    notes = StringField()


class CustomerInfo(EmbeddedDocument):
    """Customer information"""

    name = StringField()
    phone = StringField()
    email = StringField()
    address = StringField()


class ServiceRequest(Document):
    """Service request model"""

    STATUS_PENDING = "pending"
    STATUS_ASSIGNED = "assigned"
    STATUS_IN_PROGRESS = "in_progress"
    STATUS_WAITING_PARTS = "waiting_parts"
    STATUS_COMPLETED = "completed"
    STATUS_CANCELLED = "cancelled"

    STATUS_CHOICES = (
        (STATUS_PENDING, "Pending"),
        (STATUS_ASSIGNED, "Assigned"),
        (STATUS_IN_PROGRESS, "In Progress"),
        (STATUS_WAITING_PARTS, "Waiting for Parts"),
        (STATUS_COMPLETED, "Completed"),
        (STATUS_CANCELLED, "Cancelled"),
    )

    ISSUE_MAINTENANCE = "maintenance"
    ISSUE_REPAIR = "repair"
    ISSUE_WARRANTY = "warranty"
    ISSUE_INSPECTION = "inspection"

    ISSUE_TYPE_CHOICES = (
        (ISSUE_MAINTENANCE, "Maintenance"),
        (ISSUE_REPAIR, "Repair"),
        (ISSUE_WARRANTY, "Warranty"),
        (ISSUE_INSPECTION, "Inspection"),
    )

    PRIORITY_LOW = "low"
    PRIORITY_MEDIUM = "medium"
    PRIORITY_HIGH = "high"
    PRIORITY_URGENT = "urgent"

    PRIORITY_CHOICES = (
        (PRIORITY_LOW, "Low"),
        (PRIORITY_MEDIUM, "Medium"),
        (PRIORITY_HIGH, "High"),
        (PRIORITY_URGENT, "Urgent"),
    )

    PAYMENT_FREE = "free"
    PAYMENT_PENDING = "pending"
    PAYMENT_PAID = "paid"

    PAYMENT_STATUS_CHOICES = (
        (PAYMENT_FREE, "Free"),
        (PAYMENT_PENDING, "Pending"),
        (PAYMENT_PAID, "Paid"),
    )

    # Request details
    request_number = StringField(required=True, unique=True)

    # Customer & Product
    customer_id = StringField(required=True)
    customer = EmbeddedDocumentField(CustomerInfo)
    product_id = StringField(required=True)
    invoice_id = StringField()  # Reference to sale

    # Service details
    service_number = IntField(required=True)  # 1, 2, 3, 4, 5...
    is_free_service = BooleanField(default=False)
    service_charge = FloatField(default=0.0)
    display_label = StringField()  # "Service 1 - Free" or "Service 5 - ₹500"

    issue_type = StringField(choices=ISSUE_TYPE_CHOICES)
    issue_description = StringField()
    priority = StringField(choices=PRIORITY_CHOICES, default=PRIORITY_MEDIUM)

    # Assignment
    dealer_id = StringField(required=True)
    assigned_to = StringField()  # Serviceman user ID
    assigned_date = DateTimeField()

    # Status tracking
    status = StringField(choices=STATUS_CHOICES, default=STATUS_PENDING)
    status_history = ListField(EmbeddedDocumentField(StatusHistory))

    # Service work
    parts_used = ListField(EmbeddedDocumentField(PartUsed))
    service_notes = StringField()
    service_photos = ListField(StringField())
    service_time_minutes = IntField(default=0)

    # Charges
    parts_cost = FloatField(default=0.0)
    total_cost = FloatField(default=0.0)
    payment_status = StringField(choices=PAYMENT_STATUS_CHOICES, default=PAYMENT_FREE)

    # Scheduling
    scheduled_date = DateTimeField()
    started_at = DateTimeField()
    completed_at = DateTimeField()

    # Customer feedback
    customer_signature = StringField()
    rating = IntField(min_value=1, max_value=5)
    feedback = StringField()

    # Timestamps
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)

    meta = {
        "collection": "service_requests",
        "indexes": [
            "request_number",
            "customer_id",
            "dealer_id",
            "assigned_to",
            "invoice_id",
            "status",
            "-created_at",
        ],
        "ordering": ["-created_at"],
    }

    def __str__(self):
        return f"Service Request {self.request_number}"

    def save(self, *args, **kwargs):
        self.updated_at = datetime.utcnow()

        # Calculate total cost
        self.total_cost = self.service_charge + self.parts_cost

        return super(ServiceRequest, self).save(*args, **kwargs)

    @staticmethod
    def generate_request_number():
        """Generate unique request number"""
        date_part = datetime.now().strftime("%Y%m%d")
        random_part = "".join(random.choices(string.digits, k=6))
        return f"SRV-{date_part}-{random_part}"


class ServiceWarrantyTracker(Document):
    """Track warranty and free services per purchase"""

    invoice_id = StringField(required=True, unique=True)
    customer_id = StringField(required=True)
    product_id = StringField(required=True)

    # Warranty details
    total_free_services = IntField(default=4)
    services_completed = IntField(default=0)
    services_remaining = IntField(default=4)

    # Service records
    service_request_ids = ListField(StringField())

    # Status
    WARRANTY_ACTIVE = "active"
    WARRANTY_EXPIRED = "expired"
    WARRANTY_COMPLETED = "completed"

    WARRANTY_STATUS_CHOICES = (
        (WARRANTY_ACTIVE, "Active"),
        (WARRANTY_EXPIRED, "Expired"),
        (WARRANTY_COMPLETED, "Completed"),
    )

    warranty_status = StringField(
        choices=WARRANTY_STATUS_CHOICES, default=WARRANTY_ACTIVE
    )
    warranty_expiry_date = DateTimeField()

    # Timestamps
    activated_at = DateTimeField(default=datetime.utcnow)
    last_service_date = DateTimeField()

    meta = {
        "collection": "service_warranty_tracker",
        "indexes": [
            "invoice_id",
            "customer_id",
            "product_id",
        ],
    }

    def __str__(self):
        return f"Warranty Tracker: {self.invoice_id}"
