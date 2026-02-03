import React from "react";
import { motion } from "framer-motion";
import { Users, Shield, Database, Activity, TrendingUp } from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import { useSuperAdminDashboard } from "@/hooks/useSuperAdmin";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

const SuperAdminDashboard = () => {
  const { data, isLoading } = useSuperAdminDashboard();

  if (isLoading) return <LoadingSpinner />;

  const stats = [
    {
      title: "Total Admins",
      value: data?.total_admins || 0,
      icon: Shield,
      color: "purple",
      trend: 5,
    },
    {
      title: "Total Dealers",
      value: data?.overview?.total_dealers || 0,
      icon: Users,
      color: "blue",
      trend: 12,
    },
    {
      title: "System Health",
      value: "99.9%",
      icon: Activity,
      color: "green",
      trend: 0.5,
    },
    {
      title: "Database Size",
      value: "2.4 GB",
      icon: Database,
      color: "orange",
      trend: 8,
    },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">
          Super Admin Dashboard
        </h1>
        <p className="mt-1 text-gray-500">System-wide overview and control</p>
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

      {/* Admin Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl"
      >
        <h3 className="mb-4 text-xl font-bold">Recent Admin Activity</h3>
        <div className="space-y-3">
          {[
            {
              admin: "Admin 1",
              action: "Created new product",
              time: "5 min ago",
            },
            {
              admin: "Admin 2",
              action: "Approved dealer order",
              time: "15 min ago",
            },
            {
              admin: "Admin 3",
              action: "Updated user settings",
              time: "1 hour ago",
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                  {activity.admin[0]}
                </div>
                <div>
                  <p className="font-semibold">{activity.admin}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* System Overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 border border-blue-100 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl"
        >
          <h3 className="flex items-center gap-2 mb-4 text-xl font-bold">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Platform Growth
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Revenue</span>
              <span className="text-2xl font-bold text-blue-600">
                ₹{(data?.overview?.total_revenue || 0).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Sales</span>
              <span className="text-2xl font-bold text-purple-600">
                {data?.overview?.total_sales || 0}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 border border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl"
        >
          <h3 className="flex items-center gap-2 mb-4 text-xl font-bold">
            <Database className="w-5 h-5 text-green-600" />
            System Resources
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">CPU Usage</span>
                <span className="text-sm font-semibold">23%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-green-600 rounded-full"
                  style={{ width: "23%" }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Memory</span>
                <span className="text-sm font-semibold">45%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-blue-600 rounded-full"
                  style={{ width: "45%" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
