"""
User authentication and profile management views.
Handles registration, login, logout, profile updates, and password changes.
"""

from rest_framework import status
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from .models import User
from .backends import MongoEngineJWTAuthentication
from .serializers import (
    RegisterSerializer,
    UserSerializer,
    CustomTokenObtainPairSerializer,
    ChangePasswordSerializer,
    UserUpdateSerializer,
)
from .authentication import (
    validate_user_for_login,
    get_user_context,
    validate_password_strength,
)


class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Custom JWT token obtain view with enhanced login validation.
    Handles user authentication and returns JWT tokens.
    """

    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = [AllowAny]
    authentication_classes = []


@api_view(["POST"])
@permission_classes([AllowAny])
@authentication_classes([])
def register_user(request):
    """
    Register a new user.

    POST /api/auth/register/
    Body: {
        "email": "user@example.com",
        "username": "username",
        "password": "password123",
        "first_name": "John",
        "last_name": "Doe"
    }
    """
    serializer = RegisterSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(
            {
                "success": False,
                "message": "Validation failed",
                "errors": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Validate password strength
    password = serializer.validated_data.get("password")
    is_valid, error_msg = validate_password_strength(password)
    if not is_valid:
        return Response(
            {
                "success": False,
                "message": error_msg,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        # Create user
        user = serializer.save()

        # Generate tokens
        refresh = RefreshToken.for_user(user)

        # Get user context
        user_data = get_user_context(user)

        return Response(
            {
                "success": True,
                "message": "User registered successfully",
                "user": user_data,
                "tokens": {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                },
            },
            status=status.HTTP_201_CREATED,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Registration failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def logout_user(request):
    """
    Logout user by client-side token removal.

    POST /api/auth/logout/
    Body: {
        "refresh": "refresh_token_string"  (optional)
    }

    Note: JWT tokens are stateless. The client should delete tokens on logout.
    Tokens will expire naturally after their lifetime.
    """
    try:

        return Response(
            {
                "success": True,
                "message": "Logout successful. Tokens have been cleared.",
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Logout failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def get_current_user(request):
    """
    Get current authenticated user's information.

    GET /api/auth/me/
    Headers: Authorization: Bearer <access_token>
    """
    try:
        # request.user is already the mongoengine User object
        # thanks to our custom MongoEngineJWTAuthentication backend
        user = request.user

        if not user or not hasattr(user, "id"):
            return Response(
                {
                    "success": False,
                    "message": "User not authenticated",
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # Get comprehensive user context
        user_data = get_user_context(user)

        return Response(
            {
                "success": True,
                "user": user_data,
            },
            status=status.HTTP_200_OK,
        )

    except User.DoesNotExist:
        return Response(
            {
                "success": False,
                "message": "User not found",
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve user",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["PUT", "PATCH"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def update_user_profile(request):
    """
    Update current user's profile.

    PUT/PATCH /api/auth/profile/
    Body: {
        "first_name": "John",
        "last_name": "Doe",
        "username": "johndoe"
    }
    """
    try:
        user = request.user

        if not user or not hasattr(user, "id"):
            return Response(
                {
                    "success": False,
                    "message": "User not authenticated",
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # Use partial=True for PATCH requests
        is_partial = request.method == "PATCH"
        serializer = UserUpdateSerializer(data=request.data, partial=is_partial)

        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "message": "Validation failed",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Update user fields
        for field, value in serializer.validated_data.items():
            setattr(user, field, value)

        user.save()

        # Get updated user context
        user_data = get_user_context(user)

        return Response(
            {
                "success": True,
                "message": "Profile updated successfully",
                "user": user_data,
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Profile update failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def change_password(request):
    """
    Change user's password.

    POST /api/auth/change-password/
    Body: {
        "old_password": "old_password",
        "new_password": "new_password",
        "confirm_password": "new_password"
    }
    """
    try:
        user = request.user

        if not user or not hasattr(user, "id"):
            return Response(
                {
                    "success": False,
                    "message": "User not authenticated",
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )

        serializer = ChangePasswordSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "message": "Validation failed",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Validate old password
        if not user.check_password(serializer.validated_data["old_password"]):
            return Response(
                {
                    "success": False,
                    "message": "Old password is incorrect",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Validate new password strength
        new_password = serializer.validated_data["new_password"]
        is_valid, error_msg = validate_password_strength(new_password)

        if not is_valid:
            return Response(
                {
                    "success": False,
                    "message": error_msg,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Set new password
        user.set_password(new_password)
        user.save()

        return Response(
            {
                "success": True,
                "message": "Password changed successfully",
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Password change failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def delete_current_user(request):
    """
    Delete current authenticated user account.

    DELETE /api/auth/delete-account/
    """
    try:
        user = request.user

        if not user or not hasattr(user, "id"):
            return Response(
                {
                    "success": False,
                    "message": "User not authenticated",
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )

        user_email = user.email
        user_name = user.get_full_name()

        # Delete the user
        user.delete()

        return Response(
            {
                "success": True,
                "message": f"Account deleted successfully for {user_name} ({user_email})",
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Account deletion failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([AllowAny])
@authentication_classes([])
def refresh_token(request):
    """
    Refresh access token using refresh token.

    POST /api/auth/token/refresh/
    Body: {
        "refresh": "refresh_token_string"
    }
    """
    try:
        refresh_token = request.data.get("refresh")

        if not refresh_token:
            return Response(
                {
                    "success": False,
                    "message": "Refresh token is required",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Generate new access token
        token = RefreshToken(refresh_token)

        return Response(
            {
                "success": True,
                "access": str(token.access_token),
            },
            status=status.HTTP_200_OK,
        )

    except TokenError as e:
        return Response(
            {
                "success": False,
                "message": "Invalid or expired refresh token",
                "error": str(e),
            },
            status=status.HTTP_401_UNAUTHORIZED,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Token refresh failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


# Optional: Class-based view alternative for current user
class CurrentUserView(APIView):
    """
    Alternative class-based view for getting current user.
    GET /api/auth/user/
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Get current user"""
        try:
            user = request.user
            user_data = get_user_context(user)

            return Response(
                {
                    "success": True,
                    "user": user_data,
                },
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            return Response(
                {
                    "success": False,
                    "message": "Failed to retrieve user",
                    "error": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


@api_view(["GET"])
@permission_classes([AllowAny])
def test_dealer_endpoint(request):
    """Test endpoint to verify routing"""
    return Response(
        {
            "success": True,
            "message": "Dealer endpoint is working!",
            "path": request.path,
            "method": request.method,
        }
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def register_dealer(request):
    """
    Register a new dealer (Admin only).

    POST /api/auth/register-dealer/
    Body: {
        "email": "dealer@example.com",
        "password": "password123",
        "confirm_password": "password123",
        "first_name": "John",
        "last_name": "Doe",
        "phone": "9876543210",
        "dealership_name": "ABC Motors",
        "address": "123 Main St",
        "city": "Mumbai",
        "state": "Maharashtra",
        "pincode": "400001"
    }
    """
    try:
        # Check if user is admin
        if not hasattr(request.user, "role"):
            print("❌ User has no role attribute")
            return Response(
                {
                    "success": False,
                    "message": "User has no role attribute",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        if request.user.role != User.ROLE_ADMIN:
            print(f"❌ User is not admin. Role: {request.user.role}")
            return Response(
                {
                    "success": False,
                    "message": f"Only admins can register dealers. Your role: {request.user.role}",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        print("✅ User is admin, proceeding...")

        # Validate required fields
        required_fields = [
            "email",
            "password",
            "confirm_password",
            "first_name",
            "last_name",
            "phone",
            "dealership_name",
            "city",
        ]

        for field in required_fields:
            if field not in request.data or not request.data.get(field):
                return Response(
                    {
                        "success": False,
                        "message": f"Field '{field}' is required",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

        # Validate passwords match
        if request.data["password"] != request.data["confirm_password"]:
            return Response(
                {
                    "success": False,
                    "message": "Passwords do not match",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Validate password strength
        password = request.data["password"]
        is_valid, error_msg = validate_password_strength(password)
        if not is_valid:
            return Response(
                {
                    "success": False,
                    "message": error_msg,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check if email already exists
        email = request.data["email"].lower()
        if User.objects(email=email).first():
            return Response(
                {
                    "success": False,
                    "message": f"User with email {email} already exists",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Create dealer user
        dealer = User.create_user(
            email=email,
            password=password,
            first_name=request.data["first_name"],
            last_name=request.data["last_name"],
            phone=request.data["phone"],
            role=User.ROLE_DEALER,
            dealership_name=request.data["dealership_name"],
            address=request.data.get("address", ""),
            city=request.data["city"],
            state=request.data.get("state", ""),
            pincode=request.data.get("pincode", ""),
            is_active=True,
            is_approved=True,
            created_by=str(request.user.id),
        )

        # Get dealer context
        dealer_data = {
            "id": str(dealer.id),
            "email": dealer.email,
            "first_name": dealer.first_name,
            "last_name": dealer.last_name,
            "full_name": dealer.get_full_name(),
            "phone": dealer.phone,
            "role": dealer.role,
            "dealership_name": dealer.dealership_name,
            "address": dealer.address,
            "city": dealer.city,
            "state": dealer.state,
            "pincode": dealer.pincode,
            "is_active": dealer.is_active,
            "is_approved": dealer.is_approved,
            "date_joined": (
                dealer.date_joined.isoformat() if dealer.date_joined else None
            ),
        }

        return Response(
            {
                "success": True,
                "message": "Dealer registered successfully",
                "dealer": dealer_data,
            },
            status=status.HTTP_201_CREATED,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Dealer registration failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
