from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    # Authentication
    path("register/", views.register_user, name="register"),
    path("register-dealer/", views.register_dealer, name="register-dealer"),
    path("login/", views.CustomTokenObtainPairView.as_view(), name="login"),
    path("logout/", views.logout_user, name="logout"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # User Profile
    path("me/", views.get_current_user, name="current-user"),
    path("profile/", views.update_user_profile, name="update-profile"),
    path("change-password/", views.change_password, name="change-password"),
    # Account Management
    path("delete-account/", views.delete_current_user, name="delete-account"),
    # Testing
    path("test-dealer/", views.test_dealer_endpoint, name="test-dealer"),
]
