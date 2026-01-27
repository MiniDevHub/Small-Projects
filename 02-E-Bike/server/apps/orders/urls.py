from django.urls import path
from . import views

app_name = "orders"

urlpatterns = [
    # Dealer endpoints
    path("create/", views.create_order, name="create_order"),
    path("", views.list_orders, name="list_orders"),
    path("<str:order_id>/", views.get_order, name="get_order"),
    # Admin endpoints
    path("<str:order_id>/approve/", views.approve_order, name="approve_order"),
    path("<str:order_id>/reject/", views.reject_order, name="reject_order"),
    path("<str:order_id>/ship/", views.mark_shipped, name="mark_shipped"),
]
