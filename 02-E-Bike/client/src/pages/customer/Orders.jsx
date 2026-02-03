import React from "react";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CustomerOrders = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
        <p className="mt-2 text-gray-600">View your past purchases</p>
      </div>

      {/* Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Purchase History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-12 text-center text-gray-500">
            This will show the same data as "My Bikes" but in a table format
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerOrders;
