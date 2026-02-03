"""
Analytics views - Business intelligence and reporting.
Provides insights on sales, inventory, services, and dealer performance.
"""

from rest_framework import status
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from datetime import datetime, timedelta, date
from collections import defaultdict

from apps.users.models import User
from apps.users.backends import MongoEngineJWTAuthentication
from apps.billing.models import Sale
from apps.orders.models import DealerOrder, CustomerOrder
from apps.inventory.models import DealerInventory
from apps.service.models import ServiceRequest
from apps.products.models import Product


# ============================================
# ADMIN ANALYTICS (Global Overview)
# ============================================


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def get_admin_dashboard(request):
    """
    Get admin dashboard with global metrics (Admin only).

    GET /api/analytics/admin/dashboard/
    """
    try:
        user = request.user

        if user.role != User.ROLE_ADMIN:
            return Response(
                {"success": False, "message": "Admin access required"},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Date ranges
        today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
        month_start = today.replace(day=1)
        year_start = today.replace(month=1, day=1)

        # Total counts
        total_dealers = User.objects(role=User.ROLE_DEALER).count()
        total_customers = User.objects(role=User.ROLE_CUSTOMER).count()
        total_products = Product.objects.count()

        # Sales metrics
        all_sales = Sale.objects.all()
        total_revenue = sum([sale.grand_total for sale in all_sales])
        total_sales = all_sales.count()

        today_sales = Sale.objects(sale_date__gte=today)
        today_revenue = sum([sale.grand_total for sale in today_sales])
        today_sales_count = today_sales.count()

        month_sales = Sale.objects(sale_date__gte=month_start)
        month_revenue = sum([sale.grand_total for sale in month_sales])
        month_sales_count = month_sales.count()

        # Orders metrics
        pending_dealer_orders = DealerOrder.objects(
            status=DealerOrder.STATUS_PENDING
        ).count()

        # Service metrics
        pending_services = ServiceRequest.objects(
            status=ServiceRequest.STATUS_PENDING
        ).count()
        active_services = ServiceRequest.objects(
            status=ServiceRequest.STATUS_IN_PROGRESS
        ).count()

        # Top dealers by sales
        dealer_sales = defaultdict(float)
        dealer_counts = defaultdict(int)
        for sale in all_sales:
            dealer_sales[sale.dealer_id] += sale.grand_total
            dealer_counts[sale.dealer_id] += 1

        top_dealers = []
        for dealer_id in sorted(dealer_sales, key=dealer_sales.get, reverse=True)[:5]:
            try:
                dealer = User.objects.get(id=dealer_id)
                top_dealers.append(
                    {
                        "dealer_id": dealer_id,
                        "dealer_name": dealer.dealership_name or dealer.get_full_name(),
                        "total_sales": dealer_counts[dealer_id],
                        "total_revenue": round(dealer_sales[dealer_id], 2),
                    }
                )
            except:
                continue

        # Top products
        product_sales = defaultdict(int)
        for sale in all_sales:
            for item in sale.items:
                product_sales[item.product_id] += item.quantity

        top_products = []
        for product_id in sorted(product_sales, key=product_sales.get, reverse=True)[
            :5
        ]:
            try:
                product = Product.objects.get(id=product_id)
                top_products.append(
                    {
                        "product_id": product_id,
                        "product_name": product.name,
                        "units_sold": product_sales[product_id],
                    }
                )
            except:
                continue

        return Response(
            {
                "success": True,
                "overview": {
                    "total_dealers": total_dealers,
                    "total_customers": total_customers,
                    "total_products": total_products,
                    "total_revenue": round(total_revenue, 2),
                    "total_sales": total_sales,
                },
                "today": {
                    "sales_count": today_sales_count,
                    "revenue": round(today_revenue, 2),
                },
                "this_month": {
                    "sales_count": month_sales_count,
                    "revenue": round(month_revenue, 2),
                },
                "pending": {
                    "dealer_orders": pending_dealer_orders,
                    "services": pending_services,
                    "active_services": active_services,
                },
                "top_dealers": top_dealers,
                "top_products": top_products,
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve admin dashboard",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def get_sales_analytics(request):
    """
    Get sales analytics with trends (Admin/Dealer).

    GET /api/analytics/sales/
    Query params: period (7days, 30days, 12months), dealer_id
    """
    try:
        user = request.user

        if user.role not in [User.ROLE_ADMIN, User.ROLE_DEALER]:
            return Response(
                {"success": False, "message": "Access denied"},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Get filters
        period = request.GET.get("period", "30days")
        dealer_id = request.GET.get("dealer_id", "")

        # Filter sales
        if user.role == User.ROLE_ADMIN:
            if dealer_id:
                sales = Sale.objects(dealer_id=dealer_id)
            else:
                sales = Sale.objects.all()
        else:  # Dealer
            sales = Sale.objects(dealer_id=str(user.id))

        # Calculate date range
        today = datetime.now()
        if period == "7days":
            start_date = today - timedelta(days=7)
            sales = sales.filter(sale_date__gte=start_date)
        elif period == "30days":
            start_date = today - timedelta(days=30)
            sales = sales.filter(sale_date__gte=start_date)
        elif period == "12months":
            start_date = today - timedelta(days=365)
            sales = sales.filter(sale_date__gte=start_date)

        # Calculate trends
        if period == "12months":
            # Group by month
            monthly_data = defaultdict(lambda: {"count": 0, "revenue": 0})
            for sale in sales:
                month_key = sale.sale_date.strftime("%Y-%m")
                monthly_data[month_key]["count"] += 1
                monthly_data[month_key]["revenue"] += sale.grand_total

            trend_data = [
                {
                    "period": month,
                    "sales": data["count"],
                    "revenue": round(data["revenue"], 2),
                }
                for month, data in sorted(monthly_data.items())
            ]
        else:
            # Group by day
            daily_data = defaultdict(lambda: {"count": 0, "revenue": 0})
            for sale in sales:
                day_key = sale.sale_date.strftime("%Y-%m-%d")
                daily_data[day_key]["count"] += 1
                daily_data[day_key]["revenue"] += sale.grand_total

            trend_data = [
                {
                    "period": day,
                    "sales": data["count"],
                    "revenue": round(data["revenue"], 2),
                }
                for day, data in sorted(daily_data.items())
            ]

        # Payment method breakdown
        payment_methods = defaultdict(int)
        for sale in sales:
            payment_methods[sale.payment_method] += 1

        return Response(
            {
                "success": True,
                "period": period,
                "total_sales": sales.count(),
                "total_revenue": round(sum([sale.grand_total for sale in sales]), 2),
                "trend": trend_data,
                "payment_methods": dict(payment_methods),
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve sales analytics",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


# ============================================
# DEALER ANALYTICS
# ============================================


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def get_dealer_dashboard(request):
    """
    Get dealer dashboard metrics (Dealer only).

    GET /api/analytics/dealer/dashboard/
    """
    try:
        user = request.user

        if user.role != User.ROLE_DEALER:
            return Response(
                {"success": False, "message": "Dealer access required"},
                status=status.HTTP_403_FORBIDDEN,
            )

        dealer_id = str(user.id)
        today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
        month_start = today.replace(day=1)

        # Staff count
        employees = User.objects(dealer_id=dealer_id, role=User.ROLE_EMPLOYEE).count()
        servicemen = User.objects(
            dealer_id=dealer_id, role=User.ROLE_SERVICEMAN
        ).count()

        # Sales metrics
        all_sales = Sale.objects(dealer_id=dealer_id)
        total_revenue = sum([sale.grand_total for sale in all_sales])
        total_sales = all_sales.count()

        today_sales = Sale.objects(dealer_id=dealer_id, sale_date__gte=today)
        today_revenue = sum([sale.grand_total for sale in today_sales])

        month_sales = Sale.objects(dealer_id=dealer_id, sale_date__gte=month_start)
        month_revenue = sum([sale.grand_total for sale in month_sales])

        # Inventory
        inventory = DealerInventory.objects(dealer_id=dealer_id)
        total_inventory_value = 0
        low_stock_items = 0

        for item in inventory:
            try:
                product = Product.objects.get(id=item.product_id)
                total_inventory_value += item.quantity * product.dealer_price
                if item.low_stock_alert:
                    low_stock_items += 1
            except:
                continue

        # Services
        pending_services = ServiceRequest.objects(
            dealer_id=dealer_id, status=ServiceRequest.STATUS_PENDING
        ).count()
        active_services = ServiceRequest.objects(
            dealer_id=dealer_id, status=ServiceRequest.STATUS_IN_PROGRESS
        ).count()

        # Pending deliveries
        pending_deliveries = Sale.objects(
            dealer_id=dealer_id, delivery_status=Sale.DELIVERY_PENDING
        ).count()

        # Top selling products
        product_sales = defaultdict(int)
        for sale in all_sales:
            for item in sale.items:
                product_sales[item.product_id] += item.quantity

        top_products = []
        for product_id in sorted(product_sales, key=product_sales.get, reverse=True)[
            :5
        ]:
            try:
                product = Product.objects.get(id=product_id)
                top_products.append(
                    {
                        "product_name": product.name,
                        "units_sold": product_sales[product_id],
                    }
                )
            except:
                continue

        return Response(
            {
                "success": True,
                "staff": {
                    "employees": employees,
                    "servicemen": servicemen,
                },
                "sales": {
                    "total": total_sales,
                    "total_revenue": round(total_revenue, 2),
                    "today_sales": today_sales.count(),
                    "today_revenue": round(today_revenue, 2),
                    "month_sales": month_sales.count(),
                    "month_revenue": round(month_revenue, 2),
                },
                "inventory": {
                    "total_value": round(total_inventory_value, 2),
                    "low_stock_items": low_stock_items,
                    "total_products": inventory.count(),
                },
                "services": {
                    "pending": pending_services,
                    "active": active_services,
                },
                "pending_deliveries": pending_deliveries,
                "top_products": top_products,
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve dealer dashboard",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([MongoEngineJWTAuthentication])
def get_inventory_analytics(request):
    """
    Get inventory analytics (Dealer only).

    GET /api/analytics/inventory/
    """
    try:
        user = request.user

        if user.role != User.ROLE_DEALER:
            return Response(
                {"success": False, "message": "Dealer access required"},
                status=status.HTTP_403_FORBIDDEN,
            )

        dealer_id = str(user.id)
        inventory = DealerInventory.objects(dealer_id=dealer_id)

        total_items = inventory.count()
        total_quantity = sum([item.quantity for item in inventory])
        low_stock_count = inventory.filter(low_stock_alert=True).count()
        out_of_stock = inventory.filter(quantity=0).count()

        # Calculate inventory value
        total_value = 0
        product_breakdown = []

        for item in inventory:
            try:
                product = Product.objects.get(id=item.product_id)
                item_value = item.quantity * product.dealer_price
                total_value += item_value

                product_breakdown.append(
                    {
                        "product_name": product.name,
                        "quantity": item.quantity,
                        "value": round(item_value, 2),
                        "low_stock": item.low_stock_alert,
                    }
                )
            except:
                continue

        # Sort by value
        product_breakdown.sort(key=lambda x: x["value"], reverse=True)

        return Response(
            {
                "success": True,
                "summary": {
                    "total_products": total_items,
                    "total_quantity": total_quantity,
                    "total_value": round(total_value, 2),
                    "low_stock_items": low_stock_count,
                    "out_of_stock": out_of_stock,
                },
                "products": product_breakdown[:10],  # Top 10
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve inventory analytics",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
