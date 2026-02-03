import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  Calendar,
  Download,
} from "lucide-react";
import { useSalesAnalytics, useAdminDashboard } from "@/hooks/useAnalytics";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/formatters";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminAnalytics = () => {
  const [period, setPeriod] = useState("30days");
  const { data: adminData, isLoading: adminLoading } = useAdminDashboard();
  const { data: salesData, isLoading: salesLoading } = useSalesAnalytics({
    period,
  });

  if (adminLoading || salesLoading) return <LoadingSpinner />;

  const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

  // Transform payment methods data for pie chart
  const paymentMethodsData = Object.entries(
    salesData?.payment_methods || {},
  ).map(([method, count]) => ({
    name: method.toUpperCase(),
    value: count,
  }));

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>
          <p className="mt-1 text-gray-500">Comprehensive business insights</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Period Selector */}
          <div className="flex items-center gap-2 p-1 bg-white border border-gray-100 shadow-lg rounded-xl">
            {[
              { value: "7days", label: "7 Days" },
              { value: "30days", label: "30 Days" },
              { value: "12months", label: "12 Months" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setPeriod(option.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  period === option.value
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <Button className="bg-gradient-to-r from-green-600 to-emerald-600">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {[
          {
            label: "Total Revenue",
            value: formatCurrency(salesData?.total_revenue || 0),
            icon: DollarSign,
            color: "from-green-500 to-emerald-500",
            bg: "from-green-50 to-emerald-50",
          },
          {
            label: "Total Sales",
            value: salesData?.total_sales || 0,
            icon: ShoppingBag,
            color: "from-blue-500 to-cyan-500",
            bg: "from-blue-50 to-cyan-50",
          },
          {
            label: "Total Dealers",
            value: adminData?.overview?.total_dealers || 0,
            icon: Users,
            color: "from-purple-500 to-pink-500",
            bg: "from-purple-50 to-pink-50",
          },
          {
            label: "Avg Order Value",
            value: formatCurrency(
              salesData?.total_sales > 0
                ? salesData?.total_revenue / salesData?.total_sales
                : 0,
            ),
            icon: TrendingUp,
            color: "from-orange-500 to-red-500",
            bg: "from-orange-50 to-red-50",
          },
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative overflow-hidden bg-gradient-to-br ${metric.bg} rounded-2xl p-6 border border-gray-100`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="mb-1 text-sm text-gray-600">{metric.label}</p>
                <p className="text-3xl font-bold text-gray-900">
                  {metric.value}
                </p>
              </div>
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${metric.color} text-white`}
              >
                <metric.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sales Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Sales Trend</h3>
            <p className="text-sm text-gray-500">
              Revenue and sales count over time
            </p>
          </div>
          <Calendar className="w-5 h-5 text-gray-400" />
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={salesData?.trend || []}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="period"
              stroke="#9ca3af"
              style={{ fontSize: "12px" }}
            />
            <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "12px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: "#3b82f6", r: 6 }}
              activeDot={{ r: 8 }}
              name="Revenue"
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ fill: "#8b5cf6", r: 6 }}
              activeDot={{ r: 8 }}
              name="Sales Count"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Top Dealers Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl"
        >
          <h3 className="mb-6 text-xl font-bold text-gray-900">
            Top Dealers Revenue
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={adminData?.top_dealers || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="dealer_name"
                stroke="#9ca3af"
                style={{ fontSize: "12px" }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "12px",
                }}
                formatter={(value) => formatCurrency(value)}
              />
              <Bar
                dataKey="total_revenue"
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Payment Methods Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl"
        >
          <h3 className="mb-6 text-xl font-bold text-gray-900">
            Payment Methods
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentMethodsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {paymentMethodsData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Top Products */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl"
      >
        <h3 className="mb-6 text-xl font-bold text-gray-900">
          Top Selling Products
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          {adminData?.top_products?.map((product, index) => (
            <motion.div
              key={product.product_id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-4 border border-blue-100 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-gray-400">
                  #{index + 1}
                </span>
                <span className="px-3 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
                  {product.units_sold} sold
                </span>
              </div>
              <p className="font-semibold text-gray-900 truncate">
                {product.product_name}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminAnalytics;
