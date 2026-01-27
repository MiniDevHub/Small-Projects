from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
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
from .serializers import ProductSerializer, ProductCreateUpdateSerializer
from apps.users.models import User


class ProductPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 100


def is_admin(user_id):
    """Check if user is admin"""
    try:
        user = User.objects.get(id=user_id)
        return user.is_admin
    except:
        return False


@api_view(["GET"])
@permission_classes([AllowAny])
def list_products(request):
    """List all products (public)"""
    try:
        # Get query parameters
        search = request.GET.get("search", "")
        category = request.GET.get("category", "")
        is_featured = request.GET.get("featured", "")
        is_available = request.GET.get("available", "true")

        # Build query
        query = {}
        if search:
            query["name__icontains"] = search
        if category:
            query["category"] = category
        if is_featured:
            query["is_featured"] = is_featured.lower() == "true"
        if is_available:
            query["is_available"] = is_available.lower() == "true"

        products = Product.objects(**query).order_by("-created_at")

        # Pagination
        paginator = ProductPagination()
        paginated_products = paginator.paginate_queryset(products, request)

        serializer = ProductSerializer(paginated_products, many=True)
        return paginator.get_paginated_response(serializer.data)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
@permission_classes([AllowAny])
def get_product(request, product_id):
    """Get single product by ID"""
    try:
        product = Product.objects.get(id=product_id)
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Product.DoesNotExist:
        return Response(
            {"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND
        )


@api_view(["GET"])
@permission_classes([AllowAny])
def get_product_by_slug(request, slug):
    """Get single product by slug"""
    try:
        product = Product.objects.get(slug=slug)
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Product.DoesNotExist:
        return Response(
            {"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_product(request):
    """Create new product (Admin only)"""
    user_id = str(request.user.id) if hasattr(request.user, "id") else str(request.user)

    if not is_admin(user_id):
        return Response(
            {"error": "Only admins can create products"},
            status=status.HTTP_403_FORBIDDEN,
        )

    serializer = ProductCreateUpdateSerializer(data=request.data)

    if serializer.is_valid():
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
            created_by=user_id,
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
                "message": "Product created successfully",
                "product": response_serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_product(request, product_id):
    """Update product (Admin only)"""
    user_id = str(request.user.id) if hasattr(request.user, "id") else str(request.user)

    if not is_admin(user_id):
        return Response(
            {"error": "Only admins can update products"},
            status=status.HTTP_403_FORBIDDEN,
        )

    try:
        product = Product.objects.get(id=product_id)

        serializer = ProductCreateUpdateSerializer(
            data=request.data, partial=True, context={"instance": product}
        )

        if serializer.is_valid():
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
                    "message": "Product updated successfully",
                    "product": response_serializer.data,
                },
                status=status.HTTP_200_OK,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Product.DoesNotExist:
        return Response(
            {"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND
        )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_product(request, product_id):
    """Delete product (Admin only)"""
    user_id = str(request.user.id) if hasattr(request.user, "id") else str(request.user)

    if not is_admin(user_id):
        return Response(
            {"error": "Only admins can delete products"},
            status=status.HTTP_403_FORBIDDEN,
        )

    try:
        product = Product.objects.get(id=product_id)
        product.delete()

        return Response(
            {"message": "Product deleted successfully"}, status=status.HTTP_200_OK
        )

    except Product.DoesNotExist:
        return Response(
            {"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_stock_overview(request):
    """Get stock overview (Admin only)"""
    user_id = str(request.user.id) if hasattr(request.user, "id") else str(request.user)

    if not is_admin(user_id):
        return Response(
            {"error": "Only admins can view stock overview"},
            status=status.HTTP_403_FORBIDDEN,
        )

    try:
        products = Product.objects.all()

        total_products = products.count()
        total_stock = sum([p.total_stock for p in products])
        low_stock_products = [p for p in products if p.is_low_stock]
        out_of_stock = [p for p in products if p.total_stock == 0]

        return Response(
            {
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
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
