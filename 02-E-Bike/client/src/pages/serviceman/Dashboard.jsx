import React from "react";
import { motion } from "framer-motion";
import {
  Wrench,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  TrendingUp,
} from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import { useQuery } from "@tanstack/react-query";
import { serviceService } from "@/api/serviceService";
import { attendanceService } from "@/api/attendanceService";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ServicemanDashboard = () => {
  const { data: servicesData, isLoading: servicesLoading } = useQuery({
    queryKey: ["serviceman", "services"],
    queryFn: serviceService.getMyServices,
  });

  const { data: attendanceData, isLoading: attendanceLoading } = useQuery({
    queryKey: ["serviceman", "attendance", "today"],
    queryFn: attendanceService.getTodayAttendance,
  });

  if (servicesLoading || attendanceLoading) return <LoadingSpinner />;

  const stats = [
    {
      title: "Pending Services",
      value:
        servicesData?.results?.filter((s) => s.status === "assigned").length ||
        0,
      icon: Clock,
      color: "yellow",
    },
    {
      title: "In Progress",
      value:
        servicesData?.results?.filter((s) => s.status === "in_progress")
          .length || 0,
      icon: Wrench,
      color: "blue",
      trend: 12,
    },
    {
      title: "Completed Today",
      value: servicesData?.today_completed || 0,
      icon: CheckCircle,
      color: "green",
      trend: 8,
    },
    {
      title: "Attendance",
      value: attendanceData?.status === "present" ? "Present" : "Not Marked",
      icon: Calendar,
      color: attendanceData?.status === "present" ? "green" : "orange",
    },
  ];

  const statusColors = {
    assigned: "bg-yellow-100 text-yellow-800",
    in_progress: "bg-blue-100 text-blue-800",
    waiting_parts: "bg-purple-100 text-purple-800",
    completed: "bg-green-100 text-green-800",
  };

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
            Serviceman Dashboard
          </h1>
          <p className="mt-1 text-gray-500">Manage your assigned services</p>
        </div>
        <Link to="/serviceman/services">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Wrench className="w-4 h-4 mr-2" />
            View All Services
          </Button>
        </Link>
      </motion.div>

      {/* Attendance Alert */}
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
            <Link to="/serviceman/attendance">
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

      {/* Urgent Services Alert */}
      {servicesData?.results?.filter((s) => s.priority === "urgent").length >
        0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 border border-red-200 bg-red-50 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h3 className="text-lg font-bold text-red-900">Urgent Services</h3>
          </div>
          <div className="space-y-3">
            {servicesData.results
              .filter((s) => s.priority === "urgent")
              .slice(0, 3)
              .map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white rounded-xl"
                >
                  <div>
                    <p className="font-semibold">{service.request_number}</p>
                    <p className="text-sm text-gray-600">
                      {service.customer_name}
                    </p>
                  </div>
                  <Link to={`/serviceman/services/${service.id}`}>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      View Details
                    </Button>
                  </Link>
                </div>
              ))}
          </div>
        </motion.div>
      )}

      {/* Active Services & Recent Work */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Active Services */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl"
        >
          <h3 className="flex items-center gap-2 mb-4 text-xl font-bold">
            <Wrench className="w-5 h-5 text-blue-600" />
            Active Services
          </h3>
          <div className="space-y-3">
            {servicesData?.results
              ?.filter((s) => ["assigned", "in_progress"].includes(s.status))
              .slice(0, 5)
              .map((service, index) => (
                <Link key={index} to={`/serviceman/services/${service.id}`}>
                  <div className="flex items-center justify-between p-4 transition-colors cursor-pointer bg-gray-50 rounded-xl hover:bg-gray-100">
                    <div>
                      <p className="font-semibold">{service.request_number}</p>
                      <p className="text-sm text-gray-600">
                        {service.customer_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {service.issue_type}
                      </p>
                    </div>
                    <Badge className={statusColors[service.status]}>
                      {service.status?.toUpperCase().replace("_", " ")}
                    </Badge>
                  </div>
                </Link>
              )) || (
              <div className="py-8 text-center text-gray-400">
                <Wrench className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No active services</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Performance Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 border border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl"
        >
          <h3 className="flex items-center gap-2 mb-4 text-xl font-bold">
            <TrendingUp className="w-5 h-5 text-green-600" />
            This Month's Performance
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-xl">
              <div>
                <p className="text-sm text-gray-600">Total Services</p>
                <p className="text-3xl font-bold text-blue-600">
                  {servicesData?.month_total || 0}
                </p>
              </div>
              <Wrench className="w-10 h-10 text-blue-600" />
            </div>
            <div className="flex items-center justify-between p-4 bg-white rounded-xl">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-green-600">
                  {servicesData?.month_completed || 0}
                </p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <div className="flex items-center justify-between p-4 bg-white rounded-xl">
              <div>
                <p className="text-sm text-gray-600">Avg. Resolution Time</p>
                <p className="text-3xl font-bold text-purple-600">
                  {servicesData?.avg_resolution_time || "2.5"}h
                </p>
              </div>
              <Clock className="w-10 h-10 text-purple-600" />
            </div>
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
          <Link to="/serviceman/services" className="block">
            <div className="p-4 transition-colors cursor-pointer bg-blue-50 hover:bg-blue-100 rounded-xl">
              <Wrench className="w-8 h-8 mb-2 text-blue-600" />
              <p className="font-semibold">View Services</p>
              <p className="text-sm text-gray-600">Manage assigned services</p>
            </div>
          </Link>
          <Link to="/serviceman/attendance" className="block">
            <div className="p-4 transition-colors cursor-pointer bg-green-50 hover:bg-green-100 rounded-xl">
              <Calendar className="w-8 h-8 mb-2 text-green-600" />
              <p className="font-semibold">View Attendance</p>
              <p className="text-sm text-gray-600">Check your attendance</p>
            </div>
          </Link>
          <Link to="/serviceman/profile" className="block">
            <div className="p-4 transition-colors cursor-pointer bg-purple-50 hover:bg-purple-100 rounded-xl">
              <TrendingUp className="w-8 h-8 mb-2 text-purple-600" />
              <p className="font-semibold">My Profile</p>
              <p className="text-sm text-gray-600">Update information</p>
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ServicemanDashboard;
