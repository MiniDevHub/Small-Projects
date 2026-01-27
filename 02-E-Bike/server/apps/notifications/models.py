from mongoengine import (
    Document,
    StringField,
    BooleanField,
    DateTimeField,
    ListField,
    EmbeddedDocument,
    EmbeddedDocumentField,
)
from datetime import datetime


class ReadReceipt(EmbeddedDocument):
    """Read receipt embedded document"""

    user_id = StringField(required=True)
    read_at = DateTimeField(default=datetime.utcnow)


class Notification(Document):
    """Notification model"""

    TYPE_INFO = "info"
    TYPE_WARNING = "warning"
    TYPE_SUCCESS = "success"
    TYPE_ALERT = "alert"

    TYPE_CHOICES = (
        (TYPE_INFO, "Info"),
        (TYPE_WARNING, "Warning"),
        (TYPE_SUCCESS, "Success"),
        (TYPE_ALERT, "Alert"),
    )

    PRIORITY_LOW = "low"
    PRIORITY_MEDIUM = "medium"
    PRIORITY_HIGH = "high"

    PRIORITY_CHOICES = (
        (PRIORITY_LOW, "Low"),
        (PRIORITY_MEDIUM, "Medium"),
        (PRIORITY_HIGH, "High"),
    )

    # Sender
    sent_by = StringField(required=True)
    sender_role = StringField()

    # Recipients
    RECIPIENT_ALL = "all"
    RECIPIENT_ROLE = "role"
    RECIPIENT_SPECIFIC = "specific_users"
    RECIPIENT_DEALER_EMPLOYEES = "dealer_employees"

    RECIPIENT_TYPE_CHOICES = (
        (RECIPIENT_ALL, "All Users"),
        (RECIPIENT_ROLE, "By Role"),
        (RECIPIENT_SPECIFIC, "Specific Users"),
        (RECIPIENT_DEALER_EMPLOYEES, "Dealer Employees"),
    )

    recipient_type = StringField(choices=RECIPIENT_TYPE_CHOICES)
    recipient_roles = ListField(StringField())
    recipient_ids = ListField(StringField())
    dealer_id = StringField()

    # Content
    title = StringField(required=True, max_length=200)
    message = StringField(required=True)
    notification_type = StringField(choices=TYPE_CHOICES, default=TYPE_INFO)
    priority = StringField(choices=PRIORITY_CHOICES, default=PRIORITY_MEDIUM)

    # Links
    action_url = StringField()
    action_label = StringField(max_length=100)

    # Delivery tracking
    sent_at = DateTimeField(default=datetime.utcnow)
    read_by = ListField(EmbeddedDocumentField(ReadReceipt))

    # Status
    is_active = BooleanField(default=True)
    expires_at = DateTimeField()

    meta = {
        "collection": "notifications",
        "indexes": [
            "sent_by",
            "recipient_type",
            "-sent_at",
        ],
        "ordering": ["-sent_at"],
    }

    def __str__(self):
        return f"Notification: {self.title}"
