from mongoengine import (
    Document,
    StringField,
    EmailField,
    BooleanField,
    DateTimeField,
    DecimalField,
    DateField,
    FloatField,
)
from datetime import datetime
import bcrypt


class User(Document):
    """MongoEngine User Document for authentication and user management"""

    # Role choices
    ROLE_SUPER_ADMIN = "super_admin"
    ROLE_ADMIN = "admin"
    ROLE_DEALER = "dealer"
    ROLE_EMPLOYEE = "employee"
    ROLE_SERVICEMAN = "serviceman"
    ROLE_CUSTOMER = "customer"

    ROLE_CHOICES = (
        (ROLE_SUPER_ADMIN, "Super Admin"),
        (ROLE_ADMIN, "Admin"),
        (ROLE_DEALER, "Dealer"),
        (ROLE_EMPLOYEE, "Employee"),
        (ROLE_SERVICEMAN, "Serviceman"),
        (ROLE_CUSTOMER, "Customer"),
    )

    # Employment status choices
    STATUS_ACTIVE = "active"
    STATUS_INACTIVE = "inactive"
    STATUS_TERMINATED = "terminated"
    STATUS_ON_LEAVE = "on_leave"

    EMPLOYMENT_STATUS_CHOICES = (
        (STATUS_ACTIVE, "Active"),
        (STATUS_INACTIVE, "Inactive"),
        (STATUS_TERMINATED, "Terminated"),
        (STATUS_ON_LEAVE, "On Leave"),
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "phone"]

    # Authentication fields
    email = EmailField(required=True, unique=True)
    password = StringField(required=True, max_length=128)

    # Personal information
    first_name = StringField(required=True, max_length=100)
    last_name = StringField(required=True, max_length=100)
    phone = StringField(required=True, max_length=15)
    profile_picture = StringField(max_length=500)

    # Role and permissions
    role = StringField(required=True, choices=ROLE_CHOICES, default=ROLE_CUSTOMER)

    # Relationships (for employees/servicemen)
    dealer_id = StringField(max_length=24)  # Reference to dealer user ID
    admin_id = StringField(max_length=24)  # Reference to admin who created dealer

    # Dealer-specific fields
    dealership_name = StringField(max_length=200)

    # Location details
    address = StringField()
    city = StringField(max_length=100)
    state = StringField(max_length=100)
    pincode = StringField(max_length=10)
    latitude = FloatField()
    longitude = FloatField()

    # Employment details
    joining_date = DateField()
    salary = DecimalField(precision=2)
    employment_status = StringField(
        choices=EMPLOYMENT_STATUS_CHOICES, default=STATUS_ACTIVE
    )

    # Account status
    is_active = BooleanField(default=True)
    is_approved = BooleanField(default=False)
    is_staff = BooleanField(default=False)
    is_superuser = BooleanField(default=False)

    # Timestamps
    date_joined = DateTimeField(default=datetime.utcnow)
    last_login = DateTimeField()
    updated_at = DateTimeField(default=datetime.utcnow)

    # Created by (tracking)
    created_by = StringField(max_length=24)

    meta = {
        "collection": "users",
        "indexes": [
            "email",
            "role",
            "dealer_id",
            "admin_id",
            "-date_joined",
        ],
        "ordering": ["-date_joined"],
    }

    def __str__(self):
        return f"{self.get_full_name()} ({self.role})"

    def get_full_name(self):
        """Return full name"""
        return f"{self.first_name} {self.last_name}".strip()

    def get_short_name(self):
        """Return first name"""
        return self.first_name

    def set_password(self, raw_password):
        """Hash and set password"""
        self.password = bcrypt.hashpw(
            raw_password.encode("utf-8"), bcrypt.gensalt()
        ).decode("utf-8")

    def check_password(self, raw_password):
        """Check if password is correct"""
        try:
            return bcrypt.checkpw(
                raw_password.encode("utf-8"), self.password.encode("utf-8")
            )
        except Exception:
            return False

    @property
    def is_super_admin(self):
        return self.role == self.ROLE_SUPER_ADMIN

    @property
    def is_admin(self):
        return self.role == self.ROLE_ADMIN

    @property
    def is_dealer(self):
        return self.role == self.ROLE_DEALER

    @property
    def is_employee(self):
        return self.role == self.ROLE_EMPLOYEE

    @property
    def is_serviceman(self):
        return self.role == self.ROLE_SERVICEMAN

    @property
    def is_customer(self):
        return self.role == self.ROLE_CUSTOMER

    @property
    def is_authenticated(self):
        """Always return True for authenticated users"""
        return True

    @property
    def is_anonymous(self):
        """Always return False for authenticated users"""
        return False

    @property
    def username(self):
        """Return email as username for JWT compatibility"""
        return self.email

    def save(self, *args, **kwargs):
        """Override save to update timestamp"""
        self.updated_at = datetime.utcnow()
        return super(User, self).save(*args, **kwargs)

    @classmethod
    def create_user(cls, email, password, **extra_fields):
        """Create and save a regular user"""
        if not email:
            raise ValueError("Email is required")

        user = cls(email=email.lower(), **extra_fields)
        user.set_password(password)
        user.save()
        return user

    @classmethod
    def create_superuser(cls, email, password, **extra_fields):
        """Create and save a superuser"""
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_approved", True)
        extra_fields.setdefault("role", cls.ROLE_SUPER_ADMIN)

        return cls.create_user(email, password, **extra_fields)
