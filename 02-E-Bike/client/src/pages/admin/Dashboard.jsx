import React from "react";
import { motion } from "framer-motion";
import {
  Package,
  Users,
  ShoppingBag,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Clock,
  CheckCircle,
} from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import { useAdminDashboard } from "@/hooks/useAnalytics";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { formatCurrency } from "@/utils/formatters";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const { data, isLoading, error } = useAdminDashboard();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading dashboard</div>;

  const stats = [
    {
      title: "Total Dealers",
      value: data?.overview?.total_dealers || 0,
      icon: Users,
      color: "blue",
      trend: 12,
    },
    {
      title: "Total Products",
      value: data?.overview?.total_products || 0,
      icon: Package,
      color: "purple",
      trend: 5,
    },
    {
      title: "Total Sales",
      value: data?.overview?.total_sales || 0,
      icon: ShoppingBag,
      color: "orange",
      trend: 23,
    },
    {
      title: "Total Revenue",
      value: formatCurrency(data?.overview?.total_revenue || 0),
      icon: DollarSign,
      color: "green",
      trend: 18,
    },
  ];

  const todayStats = [
    {
      label: "Today Sales",
      value: data?.today?.sales_count || 0,
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Today Revenue",
      value: formatCurrency(data?.today?.revenue || 0),
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-100",
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
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-1 text-gray-500">
            Welcome back! Here's your overview
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            <TrendingUp className="w-4 h-4 mr-2" />
            View Reports
          </Button>
        </motion.div>
      </motion.div>

      {/* Main Stats Grid */}
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

      {/* Today's Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl"
      >
        <h3 className="flex items-center gap-2 mb-6 text-xl font-bold">
          <Clock className="w-5 h-5 text-blue-600" />
          Today's Performance
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {todayStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
            >
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions & Recent Activity */}
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
            <Link to="/admin/orders">
              <motion.div
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center justify-between p-4 cursor-pointer bg-orange-50 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full">
                    <ShoppingBag className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Pending Orders
                    </p>
                    <p className="text-sm text-gray-600">
                      {data?.pending?.dealer_orders || 0} orders awaiting
                      approval
                    </p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-orange-600">
                  {data?.pending?.dealer_orders || 0}
                </span>
              </motion.div>
            </Link>

            <motion.div
              whileHover={{ scale: 1.02, x: 5 }}
              className="flex items-center justify-between p-4 bg-blue-50 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Active Services</p>
                  <p className="text-sm text-gray-600">
                    {data?.pending?.active_services || 0} services in progress
                  </p>
                </div>
              </div>
              <span className="text-2xl font-bold text-blue-600">
                {data?.pending?.active_services || 0}
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Top Dealers */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl"
        >
          <h3 className="flex items-center gap-2 mb-4 text-xl font-bold">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Top Performing Dealers
          </h3>
          <div className="space-y-3">
            {data?.top_dealers?.slice(0, 5).map((dealer, index) => (
              <motion.div
                key={dealer.dealer_id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {dealer.dealer_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {dealer.total_sales} sales
                    </p>
                  </div>
                </div>
                <span className="font-bold text-green-600">
                  {formatCurrency(dealer.total_revenue)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Products */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl"
      >
        <h3 className="flex items-center gap-2 mb-4 text-xl font-bold">
          <Package className="w-5 h-5 text-purple-600" />
          Top Selling Products
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          {data?.top_products?.map((product, index) => (
            <motion.div
              key={product.product_id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              className="p-4 border border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <Package className="w-8 h-8 text-purple-600" />
                <span className="px-2 py-1 text-xs font-bold text-purple-600 bg-purple-100 rounded-full">
                  #{index + 1}
                </span>
              </div>
              <p className="mb-1 font-semibold text-gray-900 truncate">
                {product.product_name}
              </p>
              <p className="text-2xl font-bold text-purple-600">
                {product.units_sold}
              </p>
              <p className="text-xs text-gray-600">units sold</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
