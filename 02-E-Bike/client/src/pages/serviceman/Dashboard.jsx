import React from "react";
import { Wrench, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/common/StatCard";
import StatusBadge from "@/components/common/StatusBadge";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import serviceService from "@/api/serviceService";
import { formatDate } from "@/utils/formatters";
import { motion } from "framer-motion";

const ServicemanDashboard = () => {
  const { data: servicesData, isLoading } = useQuery({
    queryKey: ["serviceman-services"],
    queryFn: () => serviceService.getServiceRequests({ assigned_to_me: true }),
  });

  const services = servicesData?.results || servicesData || [];
  const pendingServices = services.filter(
    (s) => s.status === "assigned" || s.status === "in_progress",
  );
  const completedToday = services.filter((s) => {
    if (s.status !== "completed") return false;
    const today = new Date().toDateString();
    return new Date(s.completed_at).toDateString() === today;
  });

  const stats = [
    {
      title: "Assigned Services",
      value: pendingServices.length.toString(),
      icon: Wrench,
      color: "primary",
    },
    {
      title: "Completed Today",
      value: completedToday.length.toString(),
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "In Progress",
      value: services
        .filter((s) => s.status === "in_progress")
        .length.toString(),
      icon: Clock,
      color: "yellow",
    },
    {
      title: "Total Assigned",
      value: services.length.toString(),
      icon: Wrench,
      color: "blue",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Serviceman Dashboard
        </h1>
        <p className="mt-2 text-gray-600">
          Manage your assigned service requests
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} index={index} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Pending Services */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pending Services</CardTitle>
            <Link
              to="/serviceman/services"
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              View All
            </Link>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : pendingServices.length === 0 ? (
              <p className="py-8 text-center text-gray-500">
                No pending services
              </p>
            ) : (
              <div className="space-y-4">
                {pendingServices.slice(0, 5).map((service) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-4 transition-colors rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    onClick={() =>
                      (window.location.href = "/serviceman/services")
                    }
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">
                        {service.request_number}
                      </p>
                      <p className="text-sm text-gray-600">
                        {service.customer?.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {formatDate(
                          service.scheduled_date || service.created_at,
                        )}
                      </p>
                    </div>
                    <div className="text-right">
                      <StatusBadge status={service.status} />
                      <p className="mt-2 text-xs text-gray-500 capitalize">
                        {service.issue_type}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : services.length === 0 ? (
              <p className="py-8 text-center text-gray-500">No activity yet</p>
            ) : (
              <div className="space-y-4">
                {services.slice(0, 5).map((service) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        service.status === "completed"
                          ? "bg-green-100"
                          : service.status === "in_progress"
                            ? "bg-yellow-100"
                            : "bg-blue-100"
                      }`}
                    >
                      <Wrench
                        className={`h-4 w-4 ${
                          service.status === "completed"
                            ? "text-green-600"
                            : service.status === "in_progress"
                              ? "text-yellow-600"
                              : "text-blue-600"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {service.request_number}
                      </p>
                      <p className="text-xs text-gray-600">
                        Status updated to:{" "}
                        <StatusBadge status={service.status} className="ml-1" />
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {formatDate(service.updated_at)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              to="/serviceman/services"
              className="p-6 transition-shadow rounded-lg bg-gradient-to-br from-primary-50 to-primary-100 hover:shadow-md group"
            >
              <Wrench className="w-8 h-8 mb-3 transition-transform text-primary-600 group-hover:scale-110" />
              <h3 className="font-semibold text-gray-900">My Services</h3>
              <p className="mt-1 text-sm text-gray-600">
                View and update service requests
              </p>
            </Link>

            <Link
              to="/serviceman/attendance"
              className="p-6 transition-shadow rounded-lg bg-gradient-to-br from-green-50 to-green-100 hover:shadow-md group"
            >
              <Clock className="w-8 h-8 mb-3 text-green-600 transition-transform group-hover:scale-110" />
              <h3 className="font-semibold text-gray-900">My Attendance</h3>
              <p className="mt-1 text-sm text-gray-600">
                Clock in/out and view records
              </p>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicemanDashboard;
