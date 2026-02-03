from django.urls import path
from . import views

app_name = "inventory"

urlpatterns = [
    # ============================================
    # DEALER/EMPLOYEE ENDPOINTS (View Inventory)
    # ============================================
    path("", views.get_dealer_inventory, name="dealer-inventory"),
    path("low-stock/", views.get_low_stock_items, name="low-stock"),
    path("<str:inventory_id>/", views.get_inventory_item, name="inventory-item"),
    path(
        "<str:inventory_id>/transactions/",
        views.get_inventory_transactions,
        name="inventory-transactions",
    ),
    # ============================================
    # DEALER ENDPOINTS (Manage Inventory)
    # ============================================
    path(
        "<str:inventory_id>/adjust/",
        views.adjust_inventory,
        name="adjust-inventory",
    ),
    # ============================================
    # ADMIN ENDPOINTS (View All Inventories)
    # ============================================
    path("admin/all/", views.get_all_dealer_inventories, name="all-inventories"),
    path(
        "admin/dealer/<str:dealer_id>/",
        views.get_dealer_inventory_by_admin,
        name="dealer-inventory-by-admin",
    ),
]
