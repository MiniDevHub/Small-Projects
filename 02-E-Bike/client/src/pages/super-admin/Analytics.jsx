import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Package, DollarSign } from "lucide-react";
import { useSuperAdminDashboard } from "@/hooks/useSuperAdmin";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import StatsCard from "@/components/admin/StatsCard";
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
} from "recharts";

const SuperAdminAnalytics = () => {
  const { data, isLoading } = useSuperAdminDashboard();

  if (isLoading) return <LoadingSpinner />;

  // Mock data for charts
  const revenueData = [
    { month: "Jan", revenue: 450000 },
    { month: "Feb", revenue: 520000 },
    { month: "Mar", revenue: 680000 },
    { month: "Apr", revenue: 750000 },
    { month: "May", revenue: 890000 },
    { month: "Jun", revenue: 1050000 },
  ];

  const stats = [
    {
      title: "Platform Revenue",
      value: formatCurrency(data?.overview?.total_revenue || 0),
      icon: DollarSign,
      color: "green",
      trend: 23,
    },
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
      title: "Growth Rate",
      value: "23%",
      icon: TrendingUp,
      color: "orange",
      trend: 8,
    },
  ];

  return (
    <div className="p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Platform Analytics</h1>
        <p className="mt-1 text-gray-500">Business intelligence and insights</p>
      </motion.div>

      {/* Stats */}
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

      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl"
      >
        <h3 className="mb-6 text-xl font-bold">Revenue Growth</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: "#3b82f6", r: 6 }}
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default SuperAdminAnalytics;
