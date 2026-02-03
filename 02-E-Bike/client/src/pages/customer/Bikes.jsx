import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Bike, Wrench, Award, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import EmptyState from "@/components/common/EmptyState";
import billingService from "@/api/billingService";
import { formatCurrency, formatDate } from "@/utils/formatters";

const CustomerBikes = () => {
  const { data: purchasesData, isLoading } = useQuery({
    queryKey: ["customer-purchases"],
    queryFn: billingService.getCustomerPurchases,
  });

  const purchases = purchasesData?.purchases || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Bikes</h1>
        <p className="mt-2 text-gray-600">
          View your purchased bikes and warranty information
        </p>
      </div>

      {purchases.length === 0 ? (
        <Card>
          <CardContent className="p-12">
            <EmptyState
              icon={Bike}
              title="No bikes yet"
              description="You haven't purchased any bikes yet. Browse our catalog to find your perfect electric bike!"
              action={() => (window.location.href = "/products")}
              actionLabel="Browse Bikes"
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {purchases.map((purchase) => (
            <Card
              key={purchase.id}
              className="transition-shadow hover:shadow-lg"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary-100">
                      <Bike className="w-8 h-8 text-primary-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {purchase.items?.[0]?.product_name}
                      </CardTitle>
                      <p className="mt-1 text-sm text-gray-500">
                        Purchased on {formatDate(purchase.sale_date)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Invoice Info */}
                <div className="p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <p className="text-sm font-medium text-gray-700">
                      Invoice Details
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-600">Invoice #</p>
                      <p className="font-semibold">{purchase.invoice_number}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Amount Paid</p>
                      <p className="font-semibold">
                        {formatCurrency(purchase.grand_total)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Warranty Info */}
                {purchase.warranty?.is_activated ? (
                  <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-5 h-5 text-green-600" />
                      <p className="font-semibold text-green-900">
                        Warranty Active
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-green-700">
                          Total Free Services
                        </p>
                        <p className="text-2xl font-bold text-green-900">
                          {purchase.warranty.free_services_total}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-green-700">Remaining</p>
                        <p className="text-2xl font-bold text-green-900">
                          {purchase.warranty.free_services_remaining}
                        </p>
                      </div>
                    </div>

                    <div className="text-xs text-green-700">
                      <p>
                        Services Used: {purchase.warranty.free_services_used}
                      </p>
                      <p className="mt-1">
                        Activated:{" "}
                        {formatDate(purchase.warranty.activation_date)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center rounded-lg bg-gray-50">
                    <p className="text-sm text-gray-600">
                      No warranty information
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Link to="/customer/services" className="flex-1">
                    <Button className="w-full" size="sm">
                      <Wrench className="w-4 h-4 mr-2" />
                      Book Service
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Invoice
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerBikes;
