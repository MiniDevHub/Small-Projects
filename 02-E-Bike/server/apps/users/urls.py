from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

# Create router for ViewSets
router = DefaultRouter()
router.register(r"users", views.UserManagementViewSet, basename="user-management")

urlpatterns = [
    # ============================================
    # AUTHENTICATION (Public/All Users)
    # ============================================
    path("register/", views.register_user, name="register"),
    path("login/", views.CustomTokenObtainPairView.as_view(), name="login"),
    path("logout/", views.logout_user, name="logout"),
    path("token/refresh/", views.refresh_token, name="token-refresh"),
    # User Profile
    path("me/", views.get_current_user, name="current-user"),
    path("profile/", views.update_user_profile, name="update-profile"),
    path("change-password/", views.change_password, name="change-password"),
    # ============================================
    # SUPER ADMIN ENDPOINTS (Manage Admins ✅)
    # ============================================
    path("admins/register/", views.register_admin, name="register-admin"),
    path("admins/", views.list_admins, name="list-admins"),
    path("admins/<str:admin_id>/", views.update_admin, name="update-admin"),
    path("admins/<str:admin_id>/delete/", views.delete_admin, name="delete-admin"),
    # ============================================
    # ADMIN ENDPOINTS (Manage Dealers ✅)
    # ============================================
    path("dealers/register/", views.register_dealer, name="register-dealer"),
    path("dealers/", views.list_dealers, name="list-dealers"),
    path("dealers/<str:dealer_id>/", views.update_dealer, name="update-dealer"),
    path("dealers/<str:dealer_id>/delete/", views.delete_dealer, name="delete-dealer"),
    # ============================================
    # ADMIN & DEALER ENDPOINTS (Manage Employees ✅)
    # ============================================
    # Employees
    path("employees/register/", views.register_employee, name="register-employee"),
    path("employees/", views.list_employees, name="list-employees"),
    path("employees/<str:employee_id>/", views.update_employee, name="update-employee"),
    path(
        "employees/<str:employee_id>/delete/",
        views.delete_employee,
        name="delete-employee",
    ),
    # Servicemen
    path("servicemen/register/", views.register_serviceman, name="register-serviceman"),
    path("servicemen/", views.list_servicemen, name="list-servicemen"),
    path(
        "servicemen/<str:serviceman_id>/",
        views.update_serviceman,
        name="update-serviceman",
    ),
    path(
        "servicemen/<str:serviceman_id>/delete/",
        views.delete_serviceman,
        name="delete-serviceman",
    ),
    # ============================================
    # ROUTER URLS (ViewSets) ✅
    # ============================================
    path("", include(router.urls)),
]
