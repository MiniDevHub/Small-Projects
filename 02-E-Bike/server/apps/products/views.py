import os
from django.conf import settings
from rest_framework import status
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from .models import (
    Product,
    ProductSpecifications,
    ServiceCharges,
    Warranty,
    ProductImage,
)
from apps.users.models import User
from apps.users.backends import MongoEngineJWTAuthentication
from .serializers import (
    ProductSerializer,
    ProductCreateUpdateSerializer,
    ProductImageUploadSerializer,
)


class ProductPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 100


# ============================================
# PUBLIC ENDPOINTS (View Products)
# ============================================


@api_view(["GET"])
@permission_classes([AllowAny])
@authentication_classes([])
def list_products(request):
    """
    List all products (public endpoint).

    GET /api/products/
    Query params: search, category, featured, available, limit
    """
    try:
        # Get query parameters
        search = request.GET.get("search", "")
        category = request.GET.get("category", "")
        is_featured = request.GET.get("featured", "")
        is_available = request.GET.get("available", "true")
        limit = request.GET.get("limit", None)

        # Build query
        query = {}
        if search:
            query["name__icontains"] = search
        if category:
            query["model"] = category
        if is_featured:
            query["is_featured"] = is_featured.lower() == "true"
        if is_available:
            query["is_available"] = is_available.lower() == "true"

        products = Product.objects(**query).order_by("-created_at")

        # Apply limit if specified
        if limit:
            try:
                limit_int = int(limit)
                products = products[:limit_int]
                serializer = ProductSerializer(products, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except ValueError:
                pass

        # Pagination
        paginator = ProductPagination()
        paginated_products = paginator.paginate_queryset(products, request)

        serializer = ProductSerializer(paginated_products, many=True)
        return paginator.get_paginated_response(serializer.data)

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve products",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([AllowAny])
@authentication_classes([])
def get_product(request, product_id):
    """
    Get single product by ID (public).

    GET /api/products/<product_id>/
    """
    try:
        product = Product.objects.get(id=product_id)
        serializer = ProductSerializer(product)
        return Response(
            {"success": True, "product": serializer.data},
            status=status.HTTP_200_OK,
        )
    except Product.DoesNotExist:
        return Response(
            {"success": False, "message": "Product not found"},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve product",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([AllowAny])
@authentication_classes([])
def get_product_by_slug(request, slug):
    """
    Get single product by slug (public).

    GET /api/products/slug/<slug>/
    """
    try:
        product = Product.objects.get(slug=slug)
        serializer = ProductSerializer(product)
        return Response(
            {"success": True, "product": serializer.data},
            status=status.HTTP_200_OK,
        )
    except Product.DoesNotExist:
        return Response(
            {"success": False, "message": "Product not found"},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve product",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


# ============================================
# ADMIN ENDPOINTS (Manage Products ✅)
# ============================================


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def create_product(request):
    """
    Create new product (Admin only).

    POST /api/products/admin/create/
    """
    try:
        # Check if user is Admin
        if request.user.role != User.ROLE_ADMIN:
            return Response(
                {
                    "success": False,
                    "message": "Only Admins can create products",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = ProductCreateUpdateSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "message": "Validation failed",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        data = serializer.validated_data

        # Create product
        product = Product(
            name=data["name"],
            slug=data["slug"],
            model=data["model"],
            description=data.get("description", ""),
            base_price=data["base_price"],
            dealer_price=data["dealer_price"],
            mrp=data["mrp"],
            tax_rate=data.get("tax_rate", 18.0),
            total_stock=data.get("total_stock", 0),
            low_stock_threshold=data.get("low_stock_threshold", 10),
            is_available=data.get("is_available", True),
            is_featured=data.get("is_featured", False),
            category=data.get("category", ""),
            meta_title=data.get("meta_title", ""),
            meta_description=data.get("meta_description", ""),
            created_by=str(request.user.id),
        )

        # Add specifications
        if "specifications" in data:
            spec_data = data["specifications"]
            product.specifications = ProductSpecifications(**spec_data)

        # Add service charges
        if "service_charges" in data:
            product.service_charges = ServiceCharges(**data["service_charges"])

        # Add warranty
        if "warranty" in data:
            product.warranty = Warranty(**data["warranty"])

        # Add images
        if "images" in data:
            product.images = [ProductImage(**img) for img in data["images"]]

        # Add videos
        if "videos" in data:
            product.videos = data["videos"]

        product.save()

        response_serializer = ProductSerializer(product)
        return Response(
            {
                "success": True,
                "message": "Product created successfully",
                "product": response_serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Product creation failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["PUT", "PATCH"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def update_product(request, product_id):
    """
    Update product (Admin only).

    PUT/PATCH /api/products/admin/<product_id>/update/
    """
    try:
        # Check if user is Admin
        if request.user.role != User.ROLE_ADMIN:
            return Response(
                {
                    "success": False,
                    "message": "Only Admins can update products",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        product = Product.objects.get(id=product_id)

        serializer = ProductCreateUpdateSerializer(
            data=request.data, partial=True, context={"instance": product}
        )

        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "message": "Validation failed",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        data = serializer.validated_data

        # Update basic fields
        for field in [
            "name",
            "slug",
            "model",
            "description",
            "base_price",
            "dealer_price",
            "mrp",
            "tax_rate",
            "total_stock",
            "low_stock_threshold",
            "is_available",
            "is_featured",
            "category",
            "meta_title",
            "meta_description",
        ]:
            if field in data:
                setattr(product, field, data[field])

        # Update specifications
        if "specifications" in data:
            spec_data = data["specifications"]
            product.specifications = ProductSpecifications(**spec_data)

        # Update service charges
        if "service_charges" in data:
            product.service_charges = ServiceCharges(**data["service_charges"])

        # Update warranty
        if "warranty" in data:
            product.warranty = Warranty(**data["warranty"])

        # Update images
        if "images" in data:
            product.images = [ProductImage(**img) for img in data["images"]]

        # Update videos
        if "videos" in data:
            product.videos = data["videos"]

        product.save()

        response_serializer = ProductSerializer(product)
        return Response(
            {
                "success": True,
                "message": "Product updated successfully",
                "product": response_serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    except Product.DoesNotExist:
        return Response(
            {"success": False, "message": "Product not found"},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Product update failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def delete_product(request, product_id):
    """
    Delete product (Admin only).

    DELETE /api/products/admin/<product_id>/delete/
    """
    try:
        # Check if user is Admin
        if request.user.role != User.ROLE_ADMIN:
            return Response(
                {
                    "success": False,
                    "message": "Only Admins can delete products",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        product = Product.objects.get(id=product_id)
        product_name = product.name

        # Delete product images from filesystem
        for image in product.images:
            try:
                filepath = os.path.join(
                    settings.MEDIA_ROOT, image.url.lstrip("/media/")
                )
                if os.path.exists(filepath):
                    os.remove(filepath)
            except Exception as e:
                print(f"Failed to delete image file: {e}")

        product.delete()

        return Response(
            {
                "success": True,
                "message": f"Product '{product_name}' deleted successfully",
            },
            status=status.HTTP_200_OK,
        )

    except Product.DoesNotExist:
        return Response(
            {"success": False, "message": "Product not found"},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Product deletion failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def get_stock_overview(request):
    """
    Get stock overview (Admin only).

    GET /api/products/admin/stock/overview/
    """
    try:
        # Check if user is Admin
        if request.user.role != User.ROLE_ADMIN:
            return Response(
                {
                    "success": False,
                    "message": "Only Admins can view stock overview",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        products = Product.objects.all()

        total_products = products.count()
        total_stock = sum([p.total_stock for p in products])
        low_stock_products = [p for p in products if p.is_low_stock]
        out_of_stock = [p for p in products if p.total_stock == 0]

        return Response(
            {
                "success": True,
                "total_products": total_products,
                "total_stock": total_stock,
                "low_stock_count": len(low_stock_products),
                "out_of_stock_count": len(out_of_stock),
                "low_stock_products": ProductSerializer(
                    low_stock_products, many=True
                ).data,
                "out_of_stock_products": ProductSerializer(
                    out_of_stock, many=True
                ).data,
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve stock overview",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


# ============================================
# IMAGE MANAGEMENT (Admin only)
# ============================================


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def upload_product_images(request, product_id=None):
    """
    Upload single or multiple product images (Admin only).

    POST /api/products/admin/upload-images/
    POST /api/products/admin/<product_id>/upload-images/
    """
    try:
        # Check if user is Admin
        if request.user.role != User.ROLE_ADMIN:
            return Response(
                {
                    "success": False,
                    "message": "Only Admins can upload product images",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        # Get product if updating existing
        product = None
        if product_id:
            try:
                product = Product.objects.get(id=product_id)
            except Product.DoesNotExist:
                return Response(
                    {"success": False, "message": "Product not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )

        # Handle multiple images
        images = request.FILES.getlist("images")
        if not images:
            return Response(
                {
                    "success": False,
                    "message": 'No images provided. Use "images" as the field name',
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        uploaded_images = []
        errors = []

        for idx, image_file in enumerate(images):
            serializer = ProductImageUploadSerializer(
                data={
                    "image": image_file,
                    "alt": request.data.get(f"alt_{idx}", request.data.get("alt", "")),
                    "is_primary": idx == 0,  # First image is primary by default
                }
            )

            if serializer.is_valid():
                try:
                    image_data = serializer.save()
                    uploaded_images.append(image_data)
                except Exception as e:
                    errors.append({"file": image_file.name, "error": str(e)})
            else:
                errors.append({"file": image_file.name, "errors": serializer.errors})

        # Update product if provided
        if product:
            for img_data in uploaded_images:
                product.images.append(ProductImage(**img_data))
            product.save()

            return Response(
                {
                    "success": True,
                    "message": f"Uploaded {len(uploaded_images)} image(s) to product",
                    "product": ProductSerializer(product).data,
                    "errors": errors if errors else None,
                },
                status=status.HTTP_200_OK,
            )

        # Return uploaded images for later use
        return Response(
            {
                "success": True,
                "uploaded": len(uploaded_images),
                "images": uploaded_images,
                "errors": errors if errors else None,
            },
            status=status.HTTP_201_CREATED,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Image upload failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def create_product_with_images(request):
    """
    Create product with images in one request (Admin only).

    POST /api/products/admin/create-with-images/
    """
    try:
        # Check if user is Admin
        if request.user.role != User.ROLE_ADMIN:
            return Response(
                {
                    "success": False,
                    "message": "Only Admins can create products",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        # Upload images first
        images = request.FILES.getlist("images")
        uploaded_images = []

        if images:
            for idx, image_file in enumerate(images):
                serializer = ProductImageUploadSerializer(
                    data={
                        "image": image_file,
                        "alt": request.data.get(f"image_alt_{idx}", ""),
                        "is_primary": idx == 0,
                    }
                )

                if serializer.is_valid():
                    try:
                        uploaded_images.append(serializer.save())
                    except Exception as e:
                        return Response(
                            {
                                "success": False,
                                "message": f"Failed to upload image: {str(e)}",
                            },
                            status=status.HTTP_400_BAD_REQUEST,
                        )

        # Prepare product data
        product_data = {
            "name": request.data.get("name"),
            "slug": request.data.get("slug"),
            "model": request.data.get("model"),
            "description": request.data.get("description", ""),
            "base_price": float(request.data.get("base_price", 0)),
            "dealer_price": float(request.data.get("dealer_price", 0)),
            "mrp": float(request.data.get("mrp", 0)),
            "tax_rate": float(request.data.get("tax_rate", 18.0)),
            "total_stock": int(request.data.get("total_stock", 0)),
            "low_stock_threshold": int(request.data.get("low_stock_threshold", 10)),
            "is_available": request.data.get("is_available", "true").lower() == "true",
            "is_featured": request.data.get("is_featured", "false").lower() == "true",
            "category": request.data.get("category", ""),
            "meta_title": request.data.get("meta_title", ""),
            "meta_description": request.data.get("meta_description", ""),
            "images": uploaded_images,
        }

        # Validate and create product
        serializer = ProductCreateUpdateSerializer(data=product_data)

        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "message": "Validation failed",
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        data = serializer.validated_data

        # Create product
        product = Product(
            name=data["name"],
            slug=data["slug"],
            model=data["model"],
            description=data.get("description", ""),
            base_price=data["base_price"],
            dealer_price=data["dealer_price"],
            mrp=data["mrp"],
            tax_rate=data.get("tax_rate", 18.0),
            total_stock=data.get("total_stock", 0),
            low_stock_threshold=data.get("low_stock_threshold", 10),
            is_available=data.get("is_available", True),
            is_featured=data.get("is_featured", False),
            category=data.get("category", ""),
            meta_title=data.get("meta_title", ""),
            meta_description=data.get("meta_description", ""),
            created_by=str(request.user.id),
        )

        # Add images
        if "images" in data and data["images"]:
            product.images = [ProductImage(**img) for img in data["images"]]

        product.save()

        return Response(
            {
                "success": True,
                "message": "Product created successfully with images",
                "product": ProductSerializer(product).data,
            },
            status=status.HTTP_201_CREATED,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Product creation failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def delete_product_image(request, product_id, image_index):
    """
    Delete a specific image from product (Admin only).

    DELETE /api/products/admin/<product_id>/images/<image_index>/delete/
    """
    try:
        # Check if user is Admin
        if request.user.role != User.ROLE_ADMIN:
            return Response(
                {
                    "success": False,
                    "message": "Only Admins can delete product images",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        product = Product.objects.get(id=product_id)

        if 0 <= image_index < len(product.images):
            # Get image URL before removing
            image_url = product.images[image_index].url

            # Remove from database
            product.images.pop(image_index)
            product.save()

            # Try to delete physical file
            try:
                filepath = os.path.join(
                    settings.MEDIA_ROOT, image_url.lstrip("/media/")
                )
                if os.path.exists(filepath):
                    os.remove(filepath)
            except Exception as e:
                print(f"Failed to delete file: {e}")

            return Response(
                {
                    "success": True,
                    "message": "Image deleted successfully",
                    "product": ProductSerializer(product).data,
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"success": False, "message": "Invalid image index"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    except Product.DoesNotExist:
        return Response(
            {"success": False, "message": "Product not found"},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Image deletion failed",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
