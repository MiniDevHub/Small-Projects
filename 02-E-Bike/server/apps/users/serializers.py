from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User
from bson import ObjectId
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
    dealership_name = serializers.CharField(required=False, allow_blank=True)
    address = serializers.CharField(required=False, allow_blank=True)
    city = serializers.CharField(required=False, allow_blank=True)
    state = serializers.CharField(required=False, allow_blank=True)
    pincode = serializers.CharField(required=False, allow_blank=True)
    latitude = serializers.FloatField(required=False, allow_null=True)
    longitude = serializers.FloatField(required=False, allow_null=True)
    joining_date = serializers.DateField(required=False, allow_null=True)
    salary = serializers.DecimalField(
        max_digits=10, decimal_places=2, required=False, allow_null=True
    )
    employment_status = serializers.ChoiceField(
        choices=User.EMPLOYMENT_STATUS_CHOICES, required=False
    )
    is_active = serializers.BooleanField(default=True)
    is_approved = serializers.BooleanField(default=False)
    is_staff = serializers.BooleanField(default=False)
    date_joined = serializers.DateTimeField(read_only=True)
    last_login = serializers.DateTimeField(read_only=True)

    def get_id(self, obj):
        """Convert ObjectId to string"""
        return str(obj.id)

    def get_full_name(self, obj):
        """Get full name"""
        return obj.get_full_name()


class RegisterSerializer(serializers.Serializer):
    """Serializer for user registration"""

    email = serializers.EmailField(required=True)
    password = serializers.CharField(
        write_only=True, required=True, min_length=8, style={"input_type": "password"}
    )
    confirm_password = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"}
    )
    first_name = serializers.CharField(required=True, max_length=100)
    last_name = serializers.CharField(required=True, max_length=100)
    phone = serializers.CharField(required=True, max_length=15)

    def validate_email(self, value):
        """Check if email already exists"""
        email_lower = value.lower()
        existing_user = User.objects(email=email_lower).first()

        if existing_user:
            error_msg = f"User with this email already exists. User ID: {existing_user.id}, Active: {existing_user.is_active}"
            raise serializers.ValidationError(error_msg)

        return email_lower

    def validate(self, attrs):
        """Validate password match"""
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )
        return attrs

    def create(self, validated_data):
        """Create new user"""
        validated_data.pop("confirm_password")
        password = validated_data.pop("password")

        user = User.create_user(
            email=validated_data["email"],
            password=password,
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            phone=validated_data["phone"],
            role=User.ROLE_CUSTOMER,
            is_active=True,
            is_approved=True,
        )
        return user


class LoginSerializer(serializers.Serializer):
    """Serializer for user login"""

    email = serializers.EmailField(required=True)
    password = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"}
    )


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Custom JWT token serializer"""

    username_field = "email"

    def validate(self, attrs):
        """Validate and return tokens with user data"""
        # Authenticate user
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
                "dealership_name": user.dealership_name,
            },
        }

        return data

    @classmethod
    def get_token(cls, user):
        """Generate token with custom claims"""
        token = super().get_token(user)

        # Add custom claims
        token["email"] = user.email
        token["role"] = user.role
        token["user_id"] = str(user.id)

        return token


class ChangePasswordSerializer(serializers.Serializer):
    """Serializer for password change"""

    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True, min_length=8)
    confirm_password = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        """Validate new passwords match"""
        if attrs["new_password"] != attrs["confirm_password"]:
            raise serializers.ValidationError(
                {"new_password": "New password fields didn't match."}
            )
        return attrs


class UserUpdateSerializer(serializers.Serializer):
    """Serializer for updating user profile"""

    first_name = serializers.CharField(max_length=100, required=False)
    last_name = serializers.CharField(max_length=100, required=False)
    phone = serializers.CharField(max_length=15, required=False)
    profile_picture = serializers.CharField(required=False, allow_blank=True)
    address = serializers.CharField(required=False, allow_blank=True)
    city = serializers.CharField(max_length=100, required=False)
    state = serializers.CharField(max_length=100, required=False)
    pincode = serializers.CharField(max_length=10, required=False)
