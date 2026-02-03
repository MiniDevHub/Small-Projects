import React from "react";
import { Bike, Wrench, ShoppingCart, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/common/StatCard";
import billingService from "@/api/billingService";

const CustomerDashboard = () => {
  const { data: purchasesData } = useQuery({
    queryKey: ["customer-purchases"],
    queryFn: billingService.getCustomerPurchases,
  });

  const purchases = purchasesData?.purchases || [];

  const stats = [
    {
      title: "My Bikes",
      value: purchases.length.toString(),
      icon: Bike,
      color: "primary",
    },
    {
      title: "Active Warranties",
      value: purchases
        .filter((p) => p.warranty?.warranty_status === "active")
        .length.toString(),
      icon: Award,
      color: "green",
    },
    {
      title: "Free Services Left",
      value: purchases
        .reduce((sum, p) => sum + (p.warranty?.free_services_remaining || 0), 0)
        .toString(),
      icon: Wrench,
      color: "blue",
    },
    {
      title: "Service Requests",
      value: "0",
      icon: Wrench,
      color: "yellow",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome back! Manage your bikes and services
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} index={index} />
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              to="/customer/bikes"
              className="p-6 transition-shadow rounded-lg bg-gradient-to-br from-primary-50 to-primary-100 hover:shadow-md group"
            >
              <Bike className="w-8 h-8 mb-3 transition-transform text-primary-600 group-hover:scale-110" />
              <h3 className="font-semibold text-gray-900">My Bikes</h3>
              <p className="mt-1 text-sm text-gray-600">View purchased bikes</p>
            </Link>

            <Link
              to="/customer/services"
              className="p-6 transition-shadow rounded-lg bg-gradient-to-br from-green-50 to-green-100 hover:shadow-md group"
            >
              <Wrench className="w-8 h-8 mb-3 text-green-600 transition-transform group-hover:scale-110" />
              <h3 className="font-semibold text-gray-900">Book Service</h3>
              <p className="mt-1 text-sm text-gray-600">Schedule service</p>
            </Link>

            <Link
              to="/products"
              className="p-6 transition-shadow rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-md group"
            >
              <ShoppingCart className="w-8 h-8 mb-3 text-blue-600 transition-transform group-hover:scale-110" />
              <h3 className="font-semibold text-gray-900">Shop Bikes</h3>
              <p className="mt-1 text-sm text-gray-600">Browse catalog</p>
            </Link>

            <Link
              to="/customer/orders"
              className="p-6 transition-shadow rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-md group"
            >
              <ShoppingCart className="w-8 h-8 mb-3 text-purple-600 transition-transform group-hover:scale-110" />
              <h3 className="font-semibold text-gray-900">Order History</h3>
              <p className="mt-1 text-sm text-gray-600">View past orders</p>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* My Bikes Preview */}
      {purchases.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Bikes</CardTitle>
            <Link
              to="/customer/bikes"
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              View All
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {purchases.slice(0, 2).map((purchase) => (
                <div
                  key={purchase.id}
                  className="p-4 transition-shadow border rounded-lg hover:shadow-md"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {purchase.items?.[0]?.product_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Invoice: {purchase.invoice_number}
                      </p>
                    </div>
                    <Bike className="w-8 h-8 text-primary-600" />
                  </div>

                  {purchase.warranty?.is_activated && (
                    <div className="p-3 mt-3 rounded-lg bg-green-50">
                      <p className="text-xs font-medium text-green-700">
                        Warranty Active
                      </p>
                      <p className="mt-1 text-sm text-green-900">
                        {purchase.warranty.free_services_remaining} /{" "}
                        {purchase.warranty.free_services_total} free services
                        remaining
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CustomerDashboard;
