"""
E-Bike Point ERP - Main URL Configuration
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse


def api_root(request):
    """API root endpoint with documentation"""
    return JsonResponse(
        {
            "message": "🚴 E-Bike Point ERP API",
            "version": "1.0.0",
            "status": "running",
            "documentation": {
                "admin_panel": "/admin/",
                "api_endpoints": "/api/",
            },
            "endpoints": {
                "authentication": {
                    "register": "POST /api/auth/register/",
                    "login": "POST /api/auth/login/",
                    "refresh": "POST /api/auth/token/refresh/",
                    "profile": "GET /api/auth/profile/",
                    "update_profile": "PATCH /api/auth/profile/update/",
                },
                "products": {
                    "list": "GET /api/products/",
                    "create": "POST /api/products/create/",
                    "details": "GET /api/products/<slug>/",
                    "update": "PATCH /api/products/<id>/update/",
                    "delete": "DELETE /api/products/<id>/delete/",
                },
                "orders": {
                    "dealer_orders": "GET /api/orders/dealer/",
                    "create_dealer_order": "POST /api/orders/dealer/create/",
                    "approve_dealer_order": "POST /api/orders/dealer/<id>/approve/",
                    "customer_orders": "GET /api/orders/customer/",
                    "create_customer_order": "POST /api/orders/customer/create/",
                },
                "billing": {
                    "sales": "GET /api/billing/sales/",
                    "create_sale": "POST /api/billing/sales/create/",
                    "customer_purchases": "GET /api/billing/customer/purchases/",
                    "dashboard": "GET /api/billing/sales/dashboard/",
                },
                "inventory": {
                    "inventory": "GET /api/inventory/",
                    "low_stock": "GET /api/inventory/low-stock/",
                    "adjust": "PATCH /api/inventory/<id>/adjust/",
                    "admin_all": "GET /api/inventory/admin/all/",
                },
                "attendance": {
                    "clock_in": "POST /api/attendance/clock-in/",
                    "clock_out": "POST /api/attendance/clock-out/",
                    "my_attendance": "GET /api/attendance/my/",
                    "staff_attendance": "GET /api/attendance/",
                    "edit": "PATCH /api/attendance/<id>/edit/",
                },
                "service": {
                    "create_request": "POST /api/service/request/create/",
                    "list_requests": "GET /api/service/requests/",
                    "assign": "POST /api/service/requests/<id>/assign/",
                    "update_status": "PATCH /api/service/requests/<id>/status/",
                    "warranty": "GET /api/service/warranty/<invoice_id>/",
                },
                "notifications": {
                    "my_notifications": "GET /api/notifications/my/",
                    "create": "POST /api/notifications/create/",
                    "mark_read": "POST /api/notifications/<id>/read/",
                    "unread_count": "GET /api/notifications/unread-count/",
                },
                "analytics": {
                    "admin_dashboard": "GET /api/analytics/admin/dashboard/",
                    "dealer_dashboard": "GET /api/analytics/dealer/dashboard/",
                    "sales_analytics": "GET /api/analytics/sales/",
                    "inventory_analytics": "GET /api/analytics/inventory/",
                },
            },
        },
        json_dumps_params={"indent": 2},
    )


urlpatterns = [
    # Root endpoint
    path("", api_root, name="api-root"),
    path("api/", api_root, name="api-root-v2"),
    # Django Admin
    path("admin/", admin.site.urls),
    # API endpoints
    path("api/auth/", include("apps.users.urls")),
    path("api/products/", include("apps.products.urls")),
    path("api/orders/", include("apps.orders.urls")),
    path("api/billing/", include("apps.billing.urls")),
    path("api/inventory/", include("apps.inventory.urls")),
    path("api/attendance/", include("apps.attendance.urls")),
    path("api/service/", include("apps.service.urls")),
    path("api/notifications/", include("apps.notifications.urls")),
    path("api/analytics/", include("apps.analytics.urls")),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Custom admin site headers
admin.site.site_header = "E-Bike Point ERP Administration"
admin.site.site_title = "E-Bike Point Admin"
admin.site.index_title = "Welcome to E-Bike Point ERP"
