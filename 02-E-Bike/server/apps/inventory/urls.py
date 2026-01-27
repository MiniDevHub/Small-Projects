from django.urls import path
from . import views

app_name = "inventory"

urlpatterns = [
    path("", views.get_dealer_inventory, name="dealer_inventory"),
    path("low-stock/", views.get_low_stock_items, name="low_stock"),
]
