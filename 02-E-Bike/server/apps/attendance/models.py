from mongoengine import (
    Document,
    StringField,
    DateTimeField,
    FloatField,
    BooleanField,
    DateField,
)
from datetime import datetime


class Attendance(Document):
    """Attendance model for employees and servicemen"""

    STATUS_PRESENT = "present"
    STATUS_ABSENT = "absent"
    STATUS_HALF_DAY = "half_day"
    STATUS_LEAVE = "leave"
    STATUS_OFF_DAY = "off_day"

    STATUS_CHOICES = (
        (STATUS_PRESENT, "Present"),
        (STATUS_ABSENT, "Absent"),
        (STATUS_HALF_DAY, "Half Day"),
        (STATUS_LEAVE, "Leave"),
        (STATUS_OFF_DAY, "Off Day"),
    )

    user_id = StringField(required=True)
    dealer_id = StringField(required=True)
    date = DateField(required=True)

    # Login/Logout
    login_time = DateTimeField()
    logout_time = DateTimeField()
    auto_logout = BooleanField(default=False)

    # Status
    status = StringField(choices=STATUS_CHOICES, default=STATUS_PRESENT)
    manually_edited = BooleanField(default=False)
    edited_by = StringField()  # Dealer user ID
    edit_reason = StringField()

    # Working hours
    total_hours = FloatField(default=0.0)
    overtime_hours = FloatField(default=0.0)

    # Notes
    notes = StringField()

    # Timestamps
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)

    meta = {
        "collection": "attendance",
        "indexes": [
            ("user_id", "date"),
            "user_id",
            "dealer_id",
            "date",
            "-date",
        ],
    }

    def __str__(self):
        return f"Attendance: {self.user_id} - {self.date}"

    def save(self, *args, **kwargs):
        self.updated_at = datetime.utcnow()

        # Calculate total hours
        if self.login_time and self.logout_time:
            delta = self.logout_time - self.login_time
            self.total_hours = delta.total_seconds() / 3600

            # Calculate overtime (> 9 hours)
            if self.total_hours > 9:
                self.overtime_hours = self.total_hours - 9

        return super(Attendance, self).save(*args, **kwargs)
