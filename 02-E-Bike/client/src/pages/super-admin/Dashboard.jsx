import React from "react";
import { motion } from "framer-motion";
import { Users, Shield, Activity, AlertTriangle } from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { superAdminService } from "@/api/superAdminService";

const SuperAdminDashboard = () => {
  // Fetch admins count
  const { data: adminsData, isLoading } = useQuery({
    queryKey: ["super-admin", "admins"],
    queryFn: superAdminService.getAllAdmins,
  });

  if (isLoading) return <LoadingSpinner />;

  const stats = [
    {
      title: "Total Admins",
      value: adminsData?.admins?.length || 0,
      icon: Users,
      color: "blue",
      trend: 0,
    },
    {
      title: "System Health",
      value: "100%",
      icon: Shield,
      color: "green",
    },
    {
      title: "Active Sessions",
      value: "1",
      icon: Activity,
      color: "purple",
    },
    {
      title: "Alerts",
      value: 0,
      icon: AlertTriangle,
      color: "orange",
    },
  ];

  return (
    <div className="p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">
          Super Admin Dashboard
        </h1>
        <p className="mt-1 text-gray-500">System overview and management</p>
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

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 border border-blue-200 bg-blue-50 rounded-2xl"
      >
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="mb-2 text-lg font-bold text-blue-900">
              Super Admin Panel
            </h3>
            <p className="text-blue-800">
              You have full access to manage admins and system settings. Use the
              sidebar to navigate.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Recent Admins */}
      {adminsData?.admins && adminsData.admins.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl"
        >
          <h3 className="mb-4 text-xl font-bold">Recent Admins</h3>
          <div className="space-y-3">
            {adminsData.admins.slice(0, 5).map((admin, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div>
                  <p className="font-semibold">{admin.full_name}</p>
                  <p className="text-sm text-gray-600">{admin.email}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    admin.is_active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {admin.is_active ? "Active" : "Inactive"}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;
