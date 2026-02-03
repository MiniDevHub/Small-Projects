import React from "react";
import { FileText, Clock, TrendingUp, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/common/StatCard";

const EmployeeDashboard = () => {
  const stats = [
    {
      title: "Today's Sales",
      value: "0",
      icon: FileText,
      color: "primary",
    },
    {
      title: "Hours Worked",
      value: "0h",
      icon: Clock,
      color: "green",
    },
    {
      title: "This Month",
      value: "0",
      icon: TrendingUp,
      color: "blue",
    },
    {
      title: "Status",
      value: "Active",
      icon: CheckCircle,
      color: "green",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Your daily activities and performance
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              to="/employee/sales"
              className="p-6 transition-shadow rounded-lg bg-gradient-to-br from-primary-50 to-primary-100 hover:shadow-md group"
            >
              <FileText className="w-8 h-8 mb-3 transition-transform text-primary-600 group-hover:scale-110" />
              <h3 className="font-semibold text-gray-900">Create Sale</h3>
              <p className="mt-1 text-sm text-gray-600">Generate new invoice</p>
            </Link>

            <Link
              to="/employee/attendance"
              className="p-6 transition-shadow rounded-lg bg-gradient-to-br from-green-50 to-green-100 hover:shadow-md group"
            >
              <Clock className="w-8 h-8 mb-3 text-green-600 transition-transform group-hover:scale-110" />
              <h3 className="font-semibold text-gray-900">My Attendance</h3>
              <p className="mt-1 text-sm text-gray-600">
                View attendance records
              </p>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeDashboard;
