"""
User authentication and profile management views.
Following the permissions matrix with Super Admin, Admin, Dealer, Employee, Serviceman, Customer roles.
"""

from rest_framework import status
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from datetime import datetime, date

from .models import User
from .backends import MongoEngineJWTAuthentication
from .serializers import (
    CustomerRegistrationSerializer,
    AdminRegistrationSerializer,
    DealerRegistrationSerializer,
    EmployeeRegistrationSerializer,
    ServicemanRegistrationSerializer,
    CustomTokenObtainPairSerializer,
    ChangePasswordSerializer,
    UserUpdateSerializer,
    EmployeeUpdateSerializer,
    UserSerializer,
)
from .authentication import (
    get_user_context,
    validate_password_strength,
)


# ============================================
# HELPER FUNCTIONS
# ============================================


def get_user_data(user):
    """Get user data as dictionary"""
    return {
        "id": str(user.id),
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "full_name": user.get_full_name(),
        "phone": user.phone,
        "role": user.role,
        "dealer_id": user.dealer_id,
        "admin_id": user.admin_id,
        "dealership_name": user.dealership_name,
        "address": user.address,
        "city": user.city,
        "state": user.state,
        "pincode": user.pincode,
        "joining_date": user.joining_date.isoformat() if user.joining_date else None,
        "salary": float(user.salary) if user.salary else None,
        "employment_status": user.employment_status,
        "is_active": user.is_active,
        "is_approved": user.is_approved,
        "date_joined": user.date_joined.isoformat() if user.date_joined else None,
        "last_login": user.last_login.isoformat() if user.last_login else None,
    }


# ============================================
# AUTHENTICATION ENDPOINTS (Public/All Users)
# ============================================


class CustomTokenObtainPairView(TokenObtainPairView):
    """Custom JWT token obtain view"""

    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = [AllowAny]
    authentication_classes = []


@api_view(["POST"])
@permission_classes([AllowAny])
@authentication_classes([])
def register_user(request):
    """
    Customer self-registration.

    POST /api/auth/register/
    """
    serializer = CustomerRegistrationSerializer(data=request.data)

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
            {"success": False, "message": error_msg},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        # Create customer
        validated_data = serializer.validated_data
        user = User.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            phone=validated_data["phone"],
            role=User.ROLE_CUSTOMER,
            is_active=True,
            is_approved=True,
        )

        # Generate tokens
        refresh = RefreshToken.for_user(user)
        user_data = get_user_data(user)

        return Response(
            {
                "success": True,
                "message": "Customer registered successfully",
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
            {"success": False, "message": "Registration failed", "error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def logout_user(request):
    """Logout user"""
    return Response(
        {"success": True, "message": "Logout successful"},
        status=status.HTTP_200_OK,
    )


@api_view(["POST"])
@permission_classes([AllowAny])
@authentication_classes([])
def refresh_token(request):
    """Refresh access token"""
    try:
        refresh_token_str = request.data.get("refresh")

        if not refresh_token_str:
            return Response(
                {"success": False, "message": "Refresh token is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        token = RefreshToken(refresh_token_str)

        return Response(
            {"success": True, "access": str(token.access_token)},
            status=status.HTTP_200_OK,
        )

    except TokenError as e:
        return Response(
            {"success": False, "message": "Invalid or expired refresh token"},
            status=status.HTTP_401_UNAUTHORIZED,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def get_current_user(request):
    """Get current authenticated user"""
    try:
        user = request.user
        user_data = get_user_data(user)

        return Response(
            {"success": True, "user": user_data},
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {"success": False, "message": "Failed to retrieve user", "error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["PUT", "PATCH"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def update_user_profile(request):
    """Update current user's profile"""
    try:
        user = request.user
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
        user_data = get_user_data(user)

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
            {"success": False, "message": "Profile update failed", "error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def change_password(request):
    """Change user's password"""
    try:
        user = request.user
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
                {"success": False, "message": "Old password is incorrect"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Validate new password strength
        new_password = serializer.validated_data["new_password"]
        is_valid, error_msg = validate_password_strength(new_password)

        if not is_valid:
            return Response(
                {"success": False, "message": error_msg},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Set new password
        user.set_password(new_password)
        user.save()

        return Response(
            {"success": True, "message": "Password changed successfully"},
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {"success": False, "message": "Password change failed", "error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


# ============================================
# SUPER ADMIN ENDPOINTS (Manage Admins ✅)
# ============================================


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def register_admin(request):
    """
    Register a new admin (Super Admin only).

    POST /api/auth/admins/register/
    """
    try:
        # Check if user is super admin
        if request.user.role != User.ROLE_SUPER_ADMIN:
            return Response(
                {"success": False, "message": "Only Super Admins can register admins"},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = AdminRegistrationSerializer(data=request.data)

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
        password = serializer.validated_data["password"]
        is_valid, error_msg = validate_password_strength(password)
        if not is_valid:
            return Response(
                {"success": False, "message": error_msg},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Create admin
        validated_data = serializer.validated_data
        admin = User.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            phone=validated_data["phone"],
            role=User.ROLE_ADMIN,
            is_active=True,
            is_approved=True,
            is_staff=True,
            created_by=str(request.user.id),
        )

        admin_data = get_user_data(admin)

        return Response(
            {
                "success": True,
                "message": "Admin registered successfully",
                "admin": admin_data,
            },
            status=status.HTTP_201_CREATED,
        )

    except Exception as e:
        return Response(
            {"success": False, "message": "Admin registration failed", "error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def list_admins(request):
    """
    List all admins (Super Admin only).

    GET /api/auth/admins/
    """
    try:
        if request.user.role != User.ROLE_SUPER_ADMIN:
            return Response(
                {"success": False, "message": "Only Super Admins can view admins"},
                status=status.HTTP_403_FORBIDDEN,
            )

        admins = User.objects(role=User.ROLE_ADMIN)
        admin_list = [get_user_data(admin) for admin in admins]

        return Response(
            {
                "success": True,
                "count": len(admin_list),
                "admins": admin_list,
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {"success": False, "message": "Failed to retrieve admins", "error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["PUT", "PATCH"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def update_admin(request, admin_id):
    """
    Update admin (Super Admin only).

    PUT/PATCH /api/auth/admins/<admin_id>/
    """
    try:
        if request.user.role != User.ROLE_SUPER_ADMIN:
            return Response(
                {"success": False, "message": "Only Super Admins can update admins"},
                status=status.HTTP_403_FORBIDDEN,
            )

        admin = User.objects(id=admin_id, role=User.ROLE_ADMIN).first()
        if not admin:
            return Response(
                {"success": False, "message": "Admin not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = UserUpdateSerializer(data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "message": "Validation failed",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        for field, value in serializer.validated_data.items():
            setattr(admin, field, value)

        admin.save()
        admin_data = get_user_data(admin)

        return Response(
            {
                "success": True,
                "message": "Admin updated successfully",
                "admin": admin_data,
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {"success": False, "message": "Admin update failed", "error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def delete_admin(request, admin_id):
    """
    Delete admin (Super Admin only).

    DELETE /api/auth/admins/<admin_id>/
    """
    try:
        if request.user.role != User.ROLE_SUPER_ADMIN:
            return Response(
                {"success": False, "message": "Only Super Admins can delete admins"},
                status=status.HTTP_403_FORBIDDEN,
            )

        admin = User.objects(id=admin_id, role=User.ROLE_ADMIN).first()
        if not admin:
            return Response(
                {"success": False, "message": "Admin not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        admin_name = admin.get_full_name()
        admin.delete()

        return Response(
            {
                "success": True,
                "message": f"Admin {admin_name} deleted successfully",
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {"success": False, "message": "Admin deletion failed", "error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


# ============================================
# ADMIN ENDPOINTS (Manage Dealers ✅)
# ============================================


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def register_dealer(request):
    """
    Register a new dealer (Admin only).

    POST /api/auth/dealers/register/
    """
    try:
        if request.user.role != User.ROLE_ADMIN:
            return Response(
                {"success": False, "message": "Only Admins can register dealers"},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = DealerRegistrationSerializer(data=request.data)

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
        password = serializer.validated_data["password"]
        is_valid, error_msg = validate_password_strength(password)
        if not is_valid:
            return Response(
                {"success": False, "message": error_msg},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Create dealer
        validated_data = serializer.validated_data
        dealer = User.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            phone=validated_data["phone"],
            role=User.ROLE_DEALER,
            dealership_name=validated_data["dealership_name"],
            address=validated_data.get("address", ""),
            city=validated_data["city"],
            state=validated_data.get("state", ""),
            pincode=validated_data.get("pincode", ""),
            is_active=True,
            is_approved=True,
            admin_id=str(request.user.id),
            created_by=str(request.user.id),
        )

        dealer_data = get_user_data(dealer)

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


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def list_dealers(request):
    """
    List all dealers (Admin only).

    GET /api/auth/dealers/
    """
    try:
        if request.user.role != User.ROLE_ADMIN:
            return Response(
                {"success": False, "message": "Only Admins can view dealers"},
                status=status.HTTP_403_FORBIDDEN,
            )

        dealers = User.objects(role=User.ROLE_DEALER)
        dealer_list = [get_user_data(dealer) for dealer in dealers]

        return Response(
            {
                "success": True,
                "count": len(dealer_list),
                "dealers": dealer_list,
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve dealers",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["PUT", "PATCH"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def update_dealer(request, dealer_id):
    """
    Update dealer (Admin only).

    PUT/PATCH /api/auth/dealers/<dealer_id>/
    """
    try:
        if request.user.role != User.ROLE_ADMIN:
            return Response(
                {"success": False, "message": "Only Admins can update dealers"},
                status=status.HTTP_403_FORBIDDEN,
            )

        dealer = User.objects(id=dealer_id, role=User.ROLE_DEALER).first()
        if not dealer:
            return Response(
                {"success": False, "message": "Dealer not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = UserUpdateSerializer(data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "message": "Validation failed",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        for field, value in serializer.validated_data.items():
            setattr(dealer, field, value)

        dealer.save()
        dealer_data = get_user_data(dealer)

        return Response(
            {
                "success": True,
                "message": "Dealer updated successfully",
                "dealer": dealer_data,
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {"success": False, "message": "Dealer update failed", "error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def delete_dealer(request, dealer_id):
    """
    Delete dealer (Admin only).

    DELETE /api/auth/dealers/<dealer_id>/
    """
    try:
        if request.user.role != User.ROLE_ADMIN:
            return Response(
                {"success": False, "message": "Only Admins can delete dealers"},
                status=status.HTTP_403_FORBIDDEN,
            )

        dealer = User.objects(id=dealer_id, role=User.ROLE_DEALER).first()
        if not dealer:
            return Response(
                {"success": False, "message": "Dealer not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        dealer_name = dealer.get_full_name()
        dealer.delete()

        return Response(
            {
                "success": True,
                "message": f"Dealer {dealer_name} deleted successfully",
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {"success": False, "message": "Dealer deletion failed", "error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


# ============================================
# ADMIN & DEALER ENDPOINTS (Manage Employees ✅)
# ============================================


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def register_employee(request):
    """
    Register a new employee (Admin or Dealer).

    POST /api/auth/employees/register/
    """
    try:
        user = request.user

        # Check if user is Admin or Dealer
        if user.role not in [User.ROLE_ADMIN, User.ROLE_DEALER]:
            return Response(
                {
                    "success": False,
                    "message": "Only Admins or Dealers can register employees",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = EmployeeRegistrationSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "message": "Validation failed",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Validate password
        password = serializer.validated_data["password"]
        is_valid, error_msg = validate_password_strength(password)
        if not is_valid:
            return Response(
                {"success": False, "message": error_msg},
                status=status.HTTP_400_BAD_REQUEST,
            )

        validated_data = serializer.validated_data

        # Set dealer_id based on who's creating
        if user.role == User.ROLE_DEALER:
            dealer_id = str(user.id)
        elif user.role == User.ROLE_ADMIN:
            # Admin can specify dealer_id or leave it blank
            dealer_id = validated_data.get("dealer_id", None)
        else:
            dealer_id = None

        # Create employee
        employee = User.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            phone=validated_data["phone"],
            role=User.ROLE_EMPLOYEE,
            dealer_id=dealer_id,
            joining_date=validated_data.get("joining_date", date.today()),
            salary=validated_data.get("salary", None),
            address=validated_data.get("address", ""),
            is_active=True,
            is_approved=True,
            created_by=str(user.id),
        )

        employee_data = get_user_data(employee)

        return Response(
            {
                "success": True,
                "message": "Employee registered successfully",
                "employee": employee_data,
            },
            status=status.HTTP_201_CREATED,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Employee registration failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def register_serviceman(request):
    """
    Register a new serviceman (Admin or Dealer).

    POST /api/auth/servicemen/register/
    """
    try:
        user = request.user

        if user.role not in [User.ROLE_ADMIN, User.ROLE_DEALER]:
            return Response(
                {
                    "success": False,
                    "message": "Only Admins or Dealers can register servicemen",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = ServicemanRegistrationSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "message": "Validation failed",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        password = serializer.validated_data["password"]
        is_valid, error_msg = validate_password_strength(password)
        if not is_valid:
            return Response(
                {"success": False, "message": error_msg},
                status=status.HTTP_400_BAD_REQUEST,
            )

        validated_data = serializer.validated_data

        # Set dealer_id
        if user.role == User.ROLE_DEALER:
            dealer_id = str(user.id)
        elif user.role == User.ROLE_ADMIN:
            dealer_id = validated_data.get("dealer_id", None)
        else:
            dealer_id = None

        # Create serviceman
        serviceman = User.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            phone=validated_data["phone"],
            role=User.ROLE_SERVICEMAN,
            dealer_id=dealer_id,
            joining_date=validated_data.get("joining_date", date.today()),
            salary=validated_data.get("salary", None),
            address=validated_data.get("address", ""),
            is_active=True,
            is_approved=True,
            created_by=str(user.id),
        )

        serviceman_data = get_user_data(serviceman)

        return Response(
            {
                "success": True,
                "message": "Serviceman registered successfully",
                "serviceman": serviceman_data,
            },
            status=status.HTTP_201_CREATED,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Serviceman registration failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def list_employees(request):
    """
    List employees.
    - Admin: See all employees
    - Dealer: See their own employees

    GET /api/auth/employees/
    """
    try:
        user = request.user

        if user.role == User.ROLE_ADMIN:
            # Admin sees all employees
            employees = User.objects(role=User.ROLE_EMPLOYEE)
        elif user.role == User.ROLE_DEALER:
            # Dealer sees only their employees
            employees = User.objects(role=User.ROLE_EMPLOYEE, dealer_id=str(user.id))
        else:
            return Response(
                {
                    "success": False,
                    "message": "Only Admins or Dealers can view employees",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        employee_list = [get_user_data(emp) for emp in employees]

        return Response(
            {
                "success": True,
                "count": len(employee_list),
                "employees": employee_list,
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve employees",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def list_servicemen(request):
    """
    List servicemen.
    - Admin: See all servicemen
    - Dealer: See their own servicemen

    GET /api/auth/servicemen/
    """
    try:
        user = request.user

        if user.role == User.ROLE_ADMIN:
            servicemen = User.objects(role=User.ROLE_SERVICEMAN)
        elif user.role == User.ROLE_DEALER:
            servicemen = User.objects(role=User.ROLE_SERVICEMAN, dealer_id=str(user.id))
        else:
            return Response(
                {
                    "success": False,
                    "message": "Only Admins or Dealers can view servicemen",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        serviceman_list = [get_user_data(sm) for sm in servicemen]

        return Response(
            {
                "success": True,
                "count": len(serviceman_list),
                "servicemen": serviceman_list,
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve servicemen",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["PUT", "PATCH"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def update_employee(request, employee_id):
    """
    Update employee (Admin or their Dealer).

    PUT/PATCH /api/auth/employees/<employee_id>/
    """
    try:
        user = request.user

        employee = User.objects(id=employee_id, role=User.ROLE_EMPLOYEE).first()
        if not employee:
            return Response(
                {"success": False, "message": "Employee not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Permission check
        if user.role == User.ROLE_ADMIN:
            # Admin can update any employee
            pass
        elif user.role == User.ROLE_DEALER:
            # Dealer can only update their own employees
            if employee.dealer_id != str(user.id):
                return Response(
                    {
                        "success": False,
                        "message": "You can only update your own employees",
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )
        else:
            return Response(
                {
                    "success": False,
                    "message": "Only Admins or Dealers can update employees",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = EmployeeUpdateSerializer(data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "message": "Validation failed",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        for field, value in serializer.validated_data.items():
            setattr(employee, field, value)

        employee.save()
        employee_data = get_user_data(employee)

        return Response(
            {
                "success": True,
                "message": "Employee updated successfully",
                "employee": employee_data,
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {"success": False, "message": "Employee update failed", "error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["PUT", "PATCH"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def update_serviceman(request, serviceman_id):
    """
    Update serviceman (Admin or their Dealer).

    PUT/PATCH /api/auth/servicemen/<serviceman_id>/
    """
    try:
        user = request.user

        serviceman = User.objects(id=serviceman_id, role=User.ROLE_SERVICEMAN).first()
        if not serviceman:
            return Response(
                {"success": False, "message": "Serviceman not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Permission check
        if user.role == User.ROLE_ADMIN:
            pass
        elif user.role == User.ROLE_DEALER:
            if serviceman.dealer_id != str(user.id):
                return Response(
                    {
                        "success": False,
                        "message": "You can only update your own servicemen",
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )
        else:
            return Response(
                {
                    "success": False,
                    "message": "Only Admins or Dealers can update servicemen",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = EmployeeUpdateSerializer(data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "message": "Validation failed",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        for field, value in serializer.validated_data.items():
            setattr(serviceman, field, value)

        serviceman.save()
        serviceman_data = get_user_data(serviceman)

        return Response(
            {
                "success": True,
                "message": "Serviceman updated successfully",
                "serviceman": serviceman_data,
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Serviceman update failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def delete_employee(request, employee_id):
    """
    Delete employee (Admin or their Dealer).

    DELETE /api/auth/employees/<employee_id>/
    """
    try:
        user = request.user

        employee = User.objects(id=employee_id, role=User.ROLE_EMPLOYEE).first()
        if not employee:
            return Response(
                {"success": False, "message": "Employee not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Permission check
        if user.role == User.ROLE_ADMIN:
            pass
        elif user.role == User.ROLE_DEALER:
            if employee.dealer_id != str(user.id):
                return Response(
                    {
                        "success": False,
                        "message": "You can only delete your own employees",
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )
        else:
            return Response(
                {
                    "success": False,
                    "message": "Only Admins or Dealers can delete employees",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        employee_name = employee.get_full_name()
        employee.delete()

        return Response(
            {
                "success": True,
                "message": f"Employee {employee_name} deleted successfully",
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {"success": False, "message": "Employee deletion failed", "error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def delete_serviceman(request, serviceman_id):
    """
    Delete serviceman (Admin or their Dealer).

    DELETE /api/auth/servicemen/<serviceman_id>/
    """
    try:
        user = request.user

        serviceman = User.objects(id=serviceman_id, role=User.ROLE_SERVICEMAN).first()
        if not serviceman:
            return Response(
                {"success": False, "message": "Serviceman not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Permission check
        if user.role == User.ROLE_ADMIN:
            pass
        elif user.role == User.ROLE_DEALER:
            if serviceman.dealer_id != str(user.id):
                return Response(
                    {
                        "success": False,
                        "message": "You can only delete your own servicemen",
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )
        else:
            return Response(
                {
                    "success": False,
                    "message": "Only Admins or Dealers can delete servicemen",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        serviceman_name = serviceman.get_full_name()
        serviceman.delete()

        return Response(
            {
                "success": True,
                "message": f"Serviceman {serviceman_name} deleted successfully",
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Serviceman deletion failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
