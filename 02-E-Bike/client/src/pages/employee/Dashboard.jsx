import React from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Calendar,
  Clock,
  Award,
} from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import { useQuery } from "@tanstack/react-query";
import { billingService } from "@/api/billingService";
import { attendanceService } from "@/api/attendanceService";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { formatCurrency } from "@/utils/formatters";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const EmployeeDashboard = () => {
  const { data: salesData, isLoading: salesLoading } = useQuery({
    queryKey: ["employee", "sales"],
    queryFn: billingService.getEmployeeSales,
  });

  const { data: attendanceData, isLoading: attendanceLoading } = useQuery({
    queryKey: ["employee", "attendance", "today"],
    queryFn: attendanceService.getTodayAttendance,
  });

  if (salesLoading || attendanceLoading) return <LoadingSpinner />;

  const stats = [
    {
      title: "Today's Sales",
      value: salesData?.today?.count || 0,
      icon: ShoppingBag,
      color: "blue",
      trend: 12,
    },
    {
      title: "Today's Revenue",
      value: formatCurrency(salesData?.today?.revenue || 0),
      icon: DollarSign,
      color: "green",
      trend: 18,
    },
    {
      title: "This Month",
      value: salesData?.month?.count || 0,
      icon: TrendingUp,
      color: "purple",
      trend: 23,
    },
    {
      title: "Attendance",
      value: attendanceData?.status === "present" ? "Present" : "Not Marked",
      icon: Calendar,
      color: attendanceData?.status === "present" ? "green" : "orange",
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
          <h1 className="text-3xl font-bold text-gray-900">
            Employee Dashboard
          </h1>
          <p className="mt-1 text-gray-500">Track your performance and sales</p>
        </div>
        <Link to="/employee/sales">
          <Button className="bg-gradient-to-r from-green-600 to-emerald-600">
            <ShoppingBag className="w-4 h-4 mr-2" />
            New Sale
          </Button>
        </Link>
      </motion.div>

      {/* Attendance Status Banner */}
      {!attendanceData?.clock_in && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="font-bold text-orange-900">
                  You haven't clocked in today
                </p>
                <p className="text-sm text-orange-700">
                  Mark your attendance to start working
                </p>
              </div>
            </div>
            <Link to="/employee/attendance">
              <Button className="bg-orange-600 hover:bg-orange-700">
                Clock In Now
              </Button>
            </Link>
          </div>
        </motion.div>
      )}

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

      {/* Performance Summary */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Monthly Performance */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 border border-blue-100 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl"
        >
          <h3 className="flex items-center gap-2 mb-4 text-xl font-bold">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            This Month's Performance
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-xl">
              <div>
                <p className="text-sm text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold text-blue-600">
                  {salesData?.month?.count || 0}
                </p>
              </div>
              <ShoppingBag className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex items-center justify-between p-4 bg-white rounded-xl">
              <div>
                <p className="text-sm text-gray-600">Revenue Generated</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(salesData?.month?.revenue || 0)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <div className="flex items-center justify-between p-4 bg-white rounded-xl">
              <div>
                <p className="text-sm text-gray-600">Avg. Order Value</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(
                    salesData?.month?.count > 0
                      ? salesData?.month?.revenue / salesData?.month?.count
                      : 0,
                  )}
                </p>
              </div>
              <Award className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </motion.div>

        {/* Recent Sales */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl"
        >
          <h3 className="flex items-center gap-2 mb-4 text-xl font-bold">
            <ShoppingBag className="w-5 h-5 text-green-600" />
            Recent Sales
          </h3>
          <div className="space-y-3">
            {salesData?.recent?.slice(0, 5).map((sale, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 transition-colors bg-gray-50 rounded-xl hover:bg-gray-100"
              >
                <div>
                  <p className="text-sm font-semibold">
                    {sale.customer_name || "Walk-in"}
                  </p>
                  <p className="text-xs text-gray-600">
                    {new Date(sale.created_at).toLocaleString()}
                  </p>
                </div>
                <span className="font-bold text-green-600">
                  {formatCurrency(sale.grand_total)}
                </span>
              </div>
            ))}
            {(!salesData?.recent || salesData.recent.length === 0) && (
              <div className="py-8 text-center text-gray-400">
                <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No sales yet</p>
                <p className="text-sm">Start selling to see your performance</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl"
      >
        <h3 className="mb-4 text-xl font-bold">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Link to="/employee/sales" className="block">
            <div className="p-4 transition-colors cursor-pointer bg-green-50 hover:bg-green-100 rounded-xl">
              <ShoppingBag className="w-8 h-8 mb-2 text-green-600" />
              <p className="font-semibold">Create New Sale</p>
              <p className="text-sm text-gray-600">
                Generate invoice for customer
              </p>
            </div>
          </Link>
          <Link to="/employee/attendance" className="block">
            <div className="p-4 transition-colors cursor-pointer bg-blue-50 hover:bg-blue-100 rounded-xl">
              <Calendar className="w-8 h-8 mb-2 text-blue-600" />
              <p className="font-semibold">View Attendance</p>
              <p className="text-sm text-gray-600">
                Check your attendance record
              </p>
            </div>
          </Link>
          <Link to="/employee/profile" className="block">
            <div className="p-4 transition-colors cursor-pointer bg-purple-50 hover:bg-purple-100 rounded-xl">
              <Award className="w-8 h-8 mb-2 text-purple-600" />
              <p className="font-semibold">My Profile</p>
              <p className="text-sm text-gray-600">Update your information</p>
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default EmployeeDashboard;
