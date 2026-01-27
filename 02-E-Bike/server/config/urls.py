"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse


def api_root(request):
    return JsonResponse(
        {
            "message": "🚴 E-Bike Point ERP API",
            "version": "1.0.0",
            "status": "running",
            "endpoints": {
                "admin": "/admin/",
                "auth": "/api/auth/",
                "products": "/api/products/",
                "orders": "/api/orders/",
                "billing": "/api/billing/",
                "inventory": "/api/inventory/",
                "attendance": "/api/attendance/",
                "service": "/api/service/",
                "notifications": "/api/notifications/",
                "analytics": "/api/analytics/",
            },
        }
    )


urlpatterns = [
    path("", api_root, name="api-root"),
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
