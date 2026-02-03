import React from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Package,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Clock,
} from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import { useSalesDashboard } from "@/hooks/useAnalytics";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { formatCurrency } from "@/utils/formatters";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DealerDashboard = () => {
  const { data, isLoading } = useSalesDashboard();

  if (isLoading) return <LoadingSpinner />;

  const stats = [
    {
      title: "Today's Sales",
      value: data?.today?.sales_count || 0,
      icon: ShoppingBag,
      color: "blue",
      trend: 12,
    },
    {
      title: "Today's Revenue",
      value: formatCurrency(data?.today?.revenue || 0),
      icon: DollarSign,
      color: "green",
      trend: 18,
    },
    {
      title: "Low Stock Items",
      value: data?.low_stock_count || 0,
      icon: Package,
      color: "orange",
      trend: -5,
    },
    {
      title: "Pending Services",
      value: data?.pending_services || 0,
      icon: Clock,
      color: "purple",
      trend: 3,
    },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dealer Dashboard</h1>
          <p className="mt-1 text-gray-500">
            Welcome back! Here's your store overview
          </p>
        </div>
        <Link to="/dealer/sales">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            <ShoppingBag className="w-4 h-4 mr-2" />
            New Sale
          </Button>
        </Link>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Quick Actions & Alerts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Pending Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl"
        >
          <h3 className="flex items-center gap-2 mb-4 text-xl font-bold">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            Pending Actions
          </h3>
          <div className="space-y-3">
            <Link to="/dealer/orders">
              <div className="flex items-center justify-between p-4 cursor-pointer bg-orange-50 rounded-xl hover:bg-orange-100">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="font-semibold">Pending Orders</p>
                    <p className="text-sm text-gray-600">
                      {data?.pending_orders || 0} orders in transit
                    </p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-orange-600">
                  {data?.pending_orders || 0}
                </span>
              </div>
            </Link>

            <Link to="/dealer/inventory">
              <div className="flex items-center justify-between p-4 cursor-pointer bg-red-50 rounded-xl hover:bg-red-100">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-semibold">Low Stock Alert</p>
                    <p className="text-sm text-gray-600">
                      {data?.low_stock_count || 0} items need restock
                    </p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-red-600">
                  {data?.low_stock_count || 0}
                </span>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Recent Sales */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl"
        >
          <h3 className="flex items-center gap-2 mb-4 text-xl font-bold">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Recent Sales
          </h3>
          <div className="space-y-3">
            {data?.recent_sales?.slice(0, 3).map((sale, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
              >
                <div>
                  <p className="font-semibold">{sale.customer_name}</p>
                  <p className="text-sm text-gray-600">{sale.product_name}</p>
                </div>
                <span className="font-bold text-green-600">
                  {formatCurrency(sale.amount)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Monthly Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 border border-blue-100 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl"
      >
        <h3 className="mb-4 text-xl font-bold">This Month's Performance</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="text-center">
            <p className="mb-2 text-sm text-gray-600">Total Sales</p>
            <p className="text-3xl font-bold text-blue-600">
              {data?.month?.sales_count || 0}
            </p>
          </div>
          <div className="text-center">
            <p className="mb-2 text-sm text-gray-600">Revenue</p>
            <p className="text-3xl font-bold text-green-600">
              {formatCurrency(data?.month?.revenue || 0)}
            </p>
          </div>
          <div className="text-center">
            <p className="mb-2 text-sm text-gray-600">Avg. Order Value</p>
            <p className="text-3xl font-bold text-purple-600">
              {formatCurrency(
                (data?.month?.revenue || 0) / (data?.month?.sales_count || 1),
              )}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DealerDashboard;
