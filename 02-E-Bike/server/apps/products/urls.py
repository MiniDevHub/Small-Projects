from django.urls import path
from . import views

app_name = "products"

urlpatterns = [
    # ============================================
    # PUBLIC ENDPOINTS (View Products)
    # ============================================
    path("", views.list_products, name="list-products"),
    path("<str:product_id>/", views.get_product, name="get-product"),
    path("slug/<str:slug>/", views.get_product_by_slug, name="get-product-by-slug"),
    # ============================================
    # ADMIN ENDPOINTS (Manage Products ✅)
    # ============================================
    # Product CRUD
    path("admin/create/", views.create_product, name="create-product"),
    path("admin/<str:product_id>/update/", views.update_product, name="update-product"),
    path("admin/<str:product_id>/delete/", views.delete_product, name="delete-product"),
    # Stock Management
    path("admin/stock/overview/", views.get_stock_overview, name="stock-overview"),
    # Image Management
    path("admin/upload-images/", views.upload_product_images, name="upload-images"),
    path(
        "admin/<str:product_id>/upload-images/",
        views.upload_product_images,
        name="upload-images-to-product",
    ),
    path(
        "admin/create-with-images/",
        views.create_product_with_images,
        name="create-product-with-images",
    ),
    path(
        "admin/<str:product_id>/images/<int:image_index>/delete/",
        views.delete_product_image,
        name="delete-product-image",
    ),
]
