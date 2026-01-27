"""
Custom authentication utilities for MongoEngine User model.
Provides JWT token customization, user validation, and authentication rules.
"""

from typing import Dict, Any, Optional
from datetime import datetime
from apps.users.models import User


def user_authentication_rule(user: Optional[User]) -> bool:
    """
    Custom authentication rule for JWT tokens.

    Validates that the user exists, is active, and meets security requirements.
    This function is called by djangorestframework-simplejwt to validate tokens.

    Args:
        user: MongoEngine User instance or None

    Returns:
        bool: True if user is valid and should be authenticated, False otherwise

    Examples:
        >>> user = User.objects.get(email='user@example.com')
        >>> user_authentication_rule(user)
        True
    """
    if user is None:
        return False

    # Basic checks
    if not user.is_active:
        return False

    # Future: Add additional security checks here
    # if user.is_locked or user.password_expired:
    #     return False

    # Future: Check if user needs to change password
    # if user.force_password_change:
    #     return False

    return True


def get_user_from_token_payload(payload: Dict[str, Any]) -> Optional[User]:
    """
    Retrieve user from JWT token payload.

    Args:
        payload: Decoded JWT token payload

    Returns:
        User instance or None if user doesn't exist

    Raises:
        ValueError: If user_id is missing from payload
    """
    user_id = payload.get("user_id")

    if not user_id:
        raise ValueError("Token payload missing user_id")

    try:
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        return None


def customize_token_payload(user: User) -> Dict[str, Any]:
    """
    Add custom claims to JWT token payload.

    Use this to add additional user information to the token.
    Keep it minimal to avoid large token sizes.

    Args:
        user: MongoEngine User instance

    Returns:
        Dictionary of custom claims to add to token

    Examples:
        >>> user = User.objects.get(email='admin@example.com')
        >>> customize_token_payload(user)
        {
            'email': 'admin@example.com',
            'username': 'admin',
            'is_staff': True,
            'role': 'admin'
        }
    """
    return {
        "email": user.email,
        "username": user.username,
        "is_staff": user.is_staff,
        "is_superuser": user.is_superuser,
        # Future: Add role-based claims
        # 'role': user.role,
        # 'permissions': user.get_permissions(),
    }


def validate_user_for_login(
    email: str, password: str
) -> tuple[Optional[User], Optional[str]]:
    """
    Validate user credentials for login.

    Args:
        email: User's email address
        password: Raw password string

    Returns:
        Tuple of (User instance or None, error message or None)

    Examples:
        >>> user, error = validate_user_for_login('user@example.com', 'password123')
        >>> if user:
        ...     print(f'Login successful for {user.email}')
        ... else:
        ...     print(f'Login failed: {error}')
    """
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return None, "Invalid email or password"

    if not user.is_active:
        return None, "Account is deactivated"

    if not user.check_password(password):
        # Future: Track failed login attempts
        # user.increment_failed_login_attempts()
        return None, "Invalid email or password"

    # Future: Check account locks
    # if user.is_locked:
    #     return None, 'Account is locked due to too many failed login attempts'

    # Future: Check password expiration
    # if user.password_expired:
    #     return None, 'Password has expired, please reset'

    # Update last login time
    user.last_login = datetime.utcnow()
    user.save()

    return user, None


def validate_user_permissions(user: User, required_permission: str) -> bool:
    """
    Check if user has specific permission.

    Args:
        user: MongoEngine User instance
        required_permission: Permission string (e.g., 'can_view_reports')

    Returns:
        bool: True if user has permission, False otherwise

    Examples:
        >>> user = User.objects.get(email='manager@example.com')
        >>> validate_user_permissions(user, 'can_approve_orders')
        True
    """
    # Superusers have all permissions
    if user.is_superuser:
        return True

    # Future: Implement role-based permissions
    # if hasattr(user, 'role') and user.role:
    #     return required_permission in user.role.permissions

    # Future: Implement custom permission system
    # if hasattr(user, 'permissions'):
    #     return required_permission in user.permissions

    # Default: staff members have basic permissions
    return user.is_staff


def get_user_context(user: User) -> Dict[str, Any]:
    """
    Get comprehensive user context for API responses.

    Args:
        user: MongoEngine User instance

    Returns:
        Dictionary with user information

    Examples:
        >>> user = User.objects.get(email='user@example.com')
        >>> context = get_user_context(user)
        >>> print(context['email'])
        'user@example.com'
    """
    return {
        "id": str(user.id),
        "email": user.email,
        "username": user.username,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "full_name": f"{user.first_name} {user.last_name}".strip() or user.username,
        "is_active": user.is_active,
        "is_staff": user.is_staff,
        "is_superuser": user.is_superuser,
        "date_joined": user.date_joined.isoformat() if user.date_joined else None,
        "last_login": user.last_login.isoformat() if user.last_login else None,
        # Future: Add additional context
        # 'role': user.role,
        # 'department': user.department,
        # 'permissions': user.get_permissions(),
    }


def refresh_user_session(user: User) -> None:
    """
    Update user session timestamp.

    Call this to track user activity and extend session.

    Args:
        user: MongoEngine User instance
    """
    user.last_login = datetime.utcnow()
    user.save()


# Future: Add rate limiting utilities
def check_login_rate_limit(email: str) -> tuple[bool, Optional[str]]:
    """
    Check if user has exceeded login attempt rate limit.

    Args:
        email: User's email address

    Returns:
        Tuple of (is_allowed: bool, error_message: Optional[str])
    """
    # TODO: Implement Redis-based rate limiting
    # from django.core.cache import cache
    # attempts = cache.get(f'login_attempts:{email}', 0)
    # if attempts >= 5:
    #     return False, 'Too many login attempts. Try again in 15 minutes.'
    return True, None


# Future: Add password validation
def validate_password_strength(password: str) -> tuple[bool, Optional[str]]:
    """
    Validate password meets security requirements.

    Args:
        password: Raw password string

    Returns:
        Tuple of (is_valid: bool, error_message: Optional[str])
    """
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"

    # Future: Add more sophisticated checks
    # - Must contain uppercase letter
    # - Must contain lowercase letter
    # - Must contain number
    # - Must contain special character
    # - Cannot be common password

    return True, None
