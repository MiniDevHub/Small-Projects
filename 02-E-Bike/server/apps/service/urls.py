from django.urls import path
from . import views

app_name = "service"

urlpatterns = [
    # Customer endpoints
    path(
        "request/create/", views.create_service_request, name="create_service_request"
    ),
    path("requests/", views.list_service_requests, name="list_service_requests"),
    path(
        "requests/<str:request_id>/",
        views.get_service_request,
        name="get_service_request",
    ),
    path(
        "warranty/<str:invoice_id>/", views.get_warranty_status, name="warranty_status"
    ),
    # Dealer endpoints
    path(
        "requests/<str:request_id>/assign/", views.assign_service, name="assign_service"
    ),
    # Serviceman endpoints
    path(
        "requests/<str:request_id>/update-status/",
        views.update_service_status,
        name="update_service_status",
    ),
]
