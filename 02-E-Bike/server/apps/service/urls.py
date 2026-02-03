from django.urls import path
from . import views

app_name = "service"

urlpatterns = [
    # ============================================
    # CUSTOMER ENDPOINTS (Book Services ✅)
    # ============================================
    path(
        "request/create/", views.create_service_request, name="create-service-request"
    ),
    path(
        "warranty/<str:invoice_id>/", views.get_warranty_status, name="warranty-status"
    ),
    # ============================================
    # DEALER ENDPOINTS (Assign Services ✅)
    # ============================================
    path(
        "requests/<str:request_id>/assign/",
        views.assign_service,
        name="assign-service",
    ),
    # ============================================
    # SERVICEMAN ENDPOINTS (Update Services ✅)
    # ============================================
    path(
        "requests/<str:request_id>/status/",
        views.update_service_status,
        name="update-service-status",
    ),
    # ============================================
    # COMMON ENDPOINTS (View Services)
    # ============================================
    path("requests/", views.list_service_requests, name="list-service-requests"),
    path(
        "requests/<str:request_id>/",
        views.get_service_request,
        name="get-service-request",
    ),
]
