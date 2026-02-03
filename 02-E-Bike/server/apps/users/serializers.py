from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User
from datetime import datetime


class UserSerializer(serializers.Serializer):
    """Serializer for User MongoEngine Document"""

    id = serializers.SerializerMethodField()
    email = serializers.EmailField()
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    full_name = serializers.SerializerMethodField()
    phone = serializers.CharField(max_length=15)
    role = serializers.ChoiceField(choices=User.ROLE_CHOICES)
    profile_picture = serializers.CharField(required=False, allow_blank=True)
    dealer_id = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    admin_id = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    dealership_name = serializers.CharField(required=False, allow_blank=True)
    address = serializers.CharField(required=False, allow_blank=True)
    city = serializers.CharField(required=False, allow_blank=True)
    state = serializers.CharField(required=False, allow_blank=True)
    pincode = serializers.CharField(required=False, allow_blank=True)
    joining_date = serializers.DateField(required=False, allow_null=True)
    salary = serializers.DecimalField(
        max_digits=10, decimal_places=2, required=False, allow_null=True
    )
    employment_status = serializers.ChoiceField(
        choices=User.EMPLOYMENT_STATUS_CHOICES, required=False
    )
    is_active = serializers.BooleanField(default=True)
    is_approved = serializers.BooleanField(default=False)
    date_joined = serializers.DateTimeField(read_only=True)
    last_login = serializers.DateTimeField(read_only=True)

    def get_id(self, obj):
        return str(obj.id)

    def get_full_name(self, obj):
        return obj.get_full_name()


# ============================================
# REGISTRATION SERIALIZERS
# ============================================


class CustomerRegistrationSerializer(serializers.Serializer):
    """Customer self-registration"""

    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, required=True)
    first_name = serializers.CharField(required=True, max_length=100)
    last_name = serializers.CharField(required=True, max_length=100)
    phone = serializers.CharField(required=True, max_length=15)

    def validate_email(self, value):
        email_lower = value.lower()
        if User.objects(email=email_lower).first():
            raise serializers.ValidationError("User with this email already exists.")
        return email_lower

    def validate(self, attrs):
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError("Passwords do not match")
        return attrs


class AdminRegistrationSerializer(serializers.Serializer):
    """Admin registration by Super Admin"""

    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, required=True)
    first_name = serializers.CharField(required=True, max_length=100)
    last_name = serializers.CharField(required=True, max_length=100)
    phone = serializers.CharField(required=True, max_length=15)

    def validate_email(self, value):
        email_lower = value.lower()
        if User.objects(email=email_lower).first():
            raise serializers.ValidationError("User with this email already exists.")
        return email_lower

    def validate(self, attrs):
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError("Passwords do not match")
        return attrs


class DealerRegistrationSerializer(serializers.Serializer):
    """Dealer registration by Admin"""

    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, required=True)
    first_name = serializers.CharField(required=True, max_length=100)
    last_name = serializers.CharField(required=True, max_length=100)
    phone = serializers.CharField(required=True, max_length=15)
    dealership_name = serializers.CharField(required=True, max_length=200)
    address = serializers.CharField(required=False, allow_blank=True)
    city = serializers.CharField(required=True, max_length=100)
    state = serializers.CharField(required=False, allow_blank=True)
    pincode = serializers.CharField(required=False, allow_blank=True)

    def validate_email(self, value):
        email_lower = value.lower()
        if User.objects(email=email_lower).first():
            raise serializers.ValidationError("User with this email already exists.")
        return email_lower

    def validate(self, attrs):
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError("Passwords do not match")
        return attrs


class EmployeeRegistrationSerializer(serializers.Serializer):
    """Employee registration by Admin or Dealer"""

    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, required=True)
    first_name = serializers.CharField(required=True, max_length=100)
    last_name = serializers.CharField(required=True, max_length=100)
    phone = serializers.CharField(required=True, max_length=15)
    joining_date = serializers.DateField(required=False)
    salary = serializers.DecimalField(
        max_digits=10, decimal_places=2, required=False, allow_null=True
    )
    address = serializers.CharField(required=False, allow_blank=True)
    dealer_id = serializers.CharField(required=False, allow_blank=True, allow_null=True)

    def validate_email(self, value):
        email_lower = value.lower()
        if User.objects(email=email_lower).first():
            raise serializers.ValidationError("User with this email already exists.")
        return email_lower

    def validate(self, attrs):
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError("Passwords do not match")
        return attrs


class ServicemanRegistrationSerializer(serializers.Serializer):
    """Serviceman registration by Admin or Dealer"""

    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, required=True)
    first_name = serializers.CharField(required=True, max_length=100)
    last_name = serializers.CharField(required=True, max_length=100)
    phone = serializers.CharField(required=True, max_length=15)
    joining_date = serializers.DateField(required=False)
    salary = serializers.DecimalField(
        max_digits=10, decimal_places=2, required=False, allow_null=True
    )
    address = serializers.CharField(required=False, allow_blank=True)
    dealer_id = serializers.CharField(required=False, allow_blank=True, allow_null=True)

    def validate_email(self, value):
        email_lower = value.lower()
        if User.objects(email=email_lower).first():
            raise serializers.ValidationError("User with this email already exists.")
        return email_lower

    def validate(self, attrs):
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError("Passwords do not match")
        return attrs


# ============================================
# AUTH SERIALIZERS
# ============================================


class LoginSerializer(serializers.Serializer):
    """User login"""

    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Custom JWT token serializer"""

    username_field = "email"

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        user = User.objects(email=email.lower()).first()

        if user is None or not user.check_password(password):
            raise serializers.ValidationError("Invalid email or password")

        if not user.is_active:
            raise serializers.ValidationError("User account is disabled")

        # Update last login
        user.last_login = datetime.utcnow()
        user.save()

        # Generate tokens
        refresh = self.get_token(user)

        data = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "id": str(user.id),
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "full_name": user.get_full_name(),
                "role": user.role,
                "phone": user.phone,
                "is_approved": user.is_approved,
                "dealer_id": user.dealer_id,
                "admin_id": user.admin_id,
                "dealership_name": user.dealership_name,
            },
        }

        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["email"] = user.email
        token["role"] = user.role
        token["user_id"] = str(user.id)
        return token


class ChangePasswordSerializer(serializers.Serializer):
    """Password change"""

    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True, min_length=8)
    confirm_password = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        if attrs["new_password"] != attrs["confirm_password"]:
            raise serializers.ValidationError("New passwords do not match")
        return attrs


class UserUpdateSerializer(serializers.Serializer):
    """Update user profile"""

    first_name = serializers.CharField(max_length=100, required=False)
    last_name = serializers.CharField(max_length=100, required=False)
    phone = serializers.CharField(max_length=15, required=False)
    profile_picture = serializers.CharField(required=False, allow_blank=True)
    address = serializers.CharField(required=False, allow_blank=True)
    city = serializers.CharField(max_length=100, required=False)
    state = serializers.CharField(max_length=100, required=False)
    pincode = serializers.CharField(max_length=10, required=False)


class EmployeeUpdateSerializer(serializers.Serializer):
    """Update employee/serviceman by Admin/Dealer"""

    first_name = serializers.CharField(max_length=100, required=False)
    last_name = serializers.CharField(max_length=100, required=False)
    phone = serializers.CharField(max_length=15, required=False)
    salary = serializers.DecimalField(
        max_digits=10, decimal_places=2, required=False, allow_null=True
    )
    employment_status = serializers.ChoiceField(
        choices=User.EMPLOYMENT_STATUS_CHOICES, required=False
    )
    is_active = serializers.BooleanField(required=False)
    address = serializers.CharField(required=False, allow_blank=True)
