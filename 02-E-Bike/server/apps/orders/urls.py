from django.urls import path
from . import views

app_name = "orders"

urlpatterns = [
    # ============================================
    # DEALER ORDER ENDPOINTS
    # Dealer → Admin (Stock Ordering)
    # ============================================
    # Dealer creates order
    path("dealer/create/", views.create_dealer_order, name="create-dealer-order"),
    # List & View
    path("dealer/", views.list_dealer_orders, name="list-dealer-orders"),
    path("dealer/<str:order_id>/", views.get_dealer_order, name="get-dealer-order"),
    # Admin approves/rejects/ships
    path(
        "dealer/<str:order_id>/approve/",
        views.approve_dealer_order,
        name="approve-dealer-order",
    ),
    path(
        "dealer/<str:order_id>/reject/",
        views.reject_dealer_order,
        name="reject-dealer-order",
    ),
    path(
        "dealer/<str:order_id>/ship/",
        views.mark_dealer_order_shipped,
        name="ship-dealer-order",
    ),
    path(
        "dealer/<str:order_id>/deliver/",
        views.mark_dealer_order_delivered,
        name="deliver-dealer-order",
    ),
    # ============================================
    # CUSTOMER ORDER ENDPOINTS
    # Customer → Dealer (Direct Purchase)
    # ============================================
    # Customer creates order
    path("customer/create/", views.create_customer_order, name="create-customer-order"),
    # List & View
    path("customer/", views.list_customer_orders, name="list-customer-orders"),
    path(
        "customer/<str:order_id>/",
        views.get_customer_order,
        name="get-customer-order",
    ),
    # Dealer/Employee updates
    path(
        "customer/<str:order_id>/status/",
        views.update_customer_order_status,
        name="update-customer-order-status",
    ),
    path(
        "customer/<str:order_id>/payment/",
        views.update_customer_order_payment,
        name="update-customer-order-payment",
    ),
]
