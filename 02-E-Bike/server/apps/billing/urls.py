from django.urls import path
from . import views

app_name = "billing"

urlpatterns = [
    # ============================================
    # DEALER/EMPLOYEE ENDPOINTS (Create Sales ✅)
    # ============================================
    path("sales/create/", views.create_sale, name="create-sale"),
    # ============================================
    # COMMON ENDPOINTS (View Sales)
    # ============================================
    path("sales/", views.list_sales, name="list-sales"),
    path("sales/<str:sale_id>/", views.get_sale, name="get-sale"),
    # ============================================
    # DEALER/EMPLOYEE ENDPOINTS (Update)
    # ============================================
    path(
        "sales/<str:sale_id>/delivery/",
        views.update_delivery_status,
        name="update-delivery-status",
    ),
    # ============================================
    # CUSTOMER ENDPOINTS
    # ============================================
    path(
        "customer/purchases/",
        views.get_customer_purchases,
        name="customer-purchases",
    ),
    # ============================================
    # ADMIN/DEALER ENDPOINTS (Dashboard)
    # ============================================
    path("sales/dashboard/", views.get_sales_dashboard, name="sales-dashboard"),
]
