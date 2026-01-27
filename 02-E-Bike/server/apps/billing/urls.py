from django.urls import path
from . import views

app_name = "billing"

urlpatterns = [
    path("sales/create/", views.create_sale, name="create_sale"),
    path("sales/", views.list_sales, name="list_sales"),
    path("sales/<str:sale_id>/", views.get_sale, name="get_sale"),
    path(
        "customer/purchases/", views.get_customer_purchases, name="customer_purchases"
    ),
]
