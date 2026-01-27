from django.contrib.auth.backends import BaseBackend
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, AuthenticationFailed
from .models import User


class MongoEngineBackend(BaseBackend):
    """Custom authentication backend for MongoEngine User model"""

    def authenticate(self, request, username=None, password=None, **kwargs):
        """Authenticate user with email and password"""
        email = kwargs.get("email", username)

        if email is None or password is None:
            return None

        try:
            user = User.objects.get(email=email)
            if user.check_password(password) and user.is_active:
                return user
        except User.DoesNotExist:
            return None
        except Exception as e:
            print(f"Authentication error: {e}")
            return None

    def get_user(self, user_id):
        """Get user by ID"""
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None


class MongoEngineJWTAuthentication(JWTAuthentication):
    """
    Custom JWT authentication for mongoengine User model.
    Handles MongoDB ObjectId strings instead of integer IDs.
    """

    def get_user(self, validated_token):
        """
        Returns a mongoengine User object from the validated token.
        """
        try:
            user_id = validated_token.get("user_id")
        except KeyError:
            raise InvalidToken("Token contained no recognizable user identification")

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise AuthenticationFailed("User not found", code="user_not_found")
        except Exception as e:
            raise AuthenticationFailed(f"Error retrieving user: {str(e)}")

        if not user.is_active:
            raise AuthenticationFailed("User is inactive", code="user_inactive")

        return user
