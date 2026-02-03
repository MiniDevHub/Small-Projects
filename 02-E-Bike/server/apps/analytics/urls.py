from django.urls import path
from . import views

app_name = "analytics"

urlpatterns = [
    # Admin analytics
    path("admin/dashboard/", views.get_admin_dashboard, name="admin-dashboard"),
    path("sales/", views.get_sales_analytics, name="sales-analytics"),
    # Dealer analytics
    path("dealer/dashboard/", views.get_dealer_dashboard, name="dealer-dashboard"),
    path("inventory/", views.get_inventory_analytics, name="inventory-analytics"),
]
