from django.urls import path
from . import views

app_name = "products"

urlpatterns = [
    # Public endpoints
    path("", views.list_products, name="list_products"),
    path("<str:product_id>/", views.get_product, name="get_product"),
    path("slug/<str:slug>/", views.get_product_by_slug, name="get_product_by_slug"),
    # Admin endpoints
    path("admin/create/", views.create_product, name="create_product"),
    path("admin/<str:product_id>/update/", views.update_product, name="update_product"),
    path("admin/<str:product_id>/delete/", views.delete_product, name="delete_product"),
    path("admin/stock/overview/", views.get_stock_overview, name="stock_overview"),
]
