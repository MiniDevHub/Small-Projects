import React from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Bike,
  Wrench,
  Package,
  Clock,
  CheckCircle,
  Plus,
} from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import { useQuery } from "@tanstack/react-query";
import { orderService } from "@/api/orderService";
import { serviceService } from "@/api/serviceService";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/formatters";

const CustomerDashboard = () => {
  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: ["customer", "orders"],
    queryFn: orderService.getMyOrders,
  });

  const { data: bikesData, isLoading: bikesLoading } = useQuery({
    queryKey: ["customer", "bikes"],
    queryFn: () => orderService.getMyBikes(),
  });

  const { data: servicesData, isLoading: servicesLoading } = useQuery({
    queryKey: ["customer", "services"],
    queryFn: serviceService.getMyServices,
  });

  if (ordersLoading || bikesLoading || servicesLoading)
    return <LoadingSpinner />;

  const stats = [
    {
      title: "My Bikes",
      value: bikesData?.results?.length || 0,
      icon: Bike,
      color: "blue",
    },
    {
      title: "Total Orders",
      value: ordersData?.results?.length || 0,
      icon: ShoppingBag,
      color: "green",
    },
    {
      title: "Active Services",
      value:
        servicesData?.results?.filter(
          (s) => !["completed", "cancelled"].includes(s.status),
        ).length || 0,
      icon: Wrench,
      color: "orange",
    },
    {
      title: "Completed Services",
      value:
        servicesData?.results?.filter((s) => s.status === "completed").length ||
        0,
      icon: CheckCircle,
      color: "purple",
    },
  ];

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const serviceStatusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    assigned: "bg-blue-100 text-blue-800",
    in_progress: "bg-purple-100 text-purple-800",
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
            Customer Dashboard
          </h1>
          <p className="mt-1 text-gray-500">
            Welcome back! Manage your bikes and orders
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/products">
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Shop Bikes
            </Button>
          </Link>
          <Link to="/customer/services/book">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Wrench className="w-4 h-4 mr-2" />
              Book Service
            </Button>
          </Link>
        </div>
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

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 border border-blue-100 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl"
      >
        <h3 className="mb-4 text-xl font-bold">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Link to="/products" className="block">
            <div className="p-4 transition-colors bg-white cursor-pointer hover:bg-gray-50 rounded-xl">
              <Plus className="w-8 h-8 mb-2 text-green-600" />
              <p className="font-semibold">Buy New Bike</p>
              <p className="text-sm text-gray-600">Browse our collection</p>
            </div>
          </Link>
          <Link to="/customer/bikes" className="block">
            <div className="p-4 transition-colors bg-white cursor-pointer hover:bg-gray-50 rounded-xl">
              <Bike className="w-8 h-8 mb-2 text-blue-600" />
              <p className="font-semibold">My Bikes</p>
              <p className="text-sm text-gray-600">View your bikes</p>
            </div>
          </Link>
          <Link to="/customer/services/book" className="block">
            <div className="p-4 transition-colors bg-white cursor-pointer hover:bg-gray-50 rounded-xl">
              <Wrench className="w-8 h-8 mb-2 text-orange-600" />
              <p className="font-semibold">Book Service</p>
              <p className="text-sm text-gray-600">Schedule maintenance</p>
            </div>
          </Link>
          <Link to="/customer/orders" className="block">
            <div className="p-4 transition-colors bg-white cursor-pointer hover:bg-gray-50 rounded-xl">
              <Package className="w-8 h-8 mb-2 text-purple-600" />
              <p className="font-semibold">Order History</p>
              <p className="text-sm text-gray-600">Track your orders</p>
            </div>
          </Link>
        </div>
      </motion.div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="flex items-center gap-2 text-xl font-bold">
              <ShoppingBag className="w-5 h-5 text-green-600" />
              Recent Orders
            </h3>
            <Link to="/customer/orders">
              <Button size="sm" variant="ghost">
                View All
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {ordersData?.results?.slice(0, 3).map((order, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 transition-colors bg-gray-50 rounded-xl hover:bg-gray-100"
              >
                <div>
                  <p className="font-semibold">{order.order_number}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <Badge className={statusColors[order.status]}>
                    {order.status?.toUpperCase()}
                  </Badge>
                  <p className="mt-1 text-sm font-bold text-gray-900">
                    {formatCurrency(order.grand_total)}
                  </p>
                </div>
              </div>
            )) || (
              <div className="py-8 text-center text-gray-400">
                <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No orders yet</p>
                <Link to="/products">
                  <Button className="mt-3" size="sm">
                    Browse Products
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </motion.div>

        {/* Active Services */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="flex items-center gap-2 text-xl font-bold">
              <Wrench className="w-5 h-5 text-orange-600" />
              Active Services
            </h3>
            <Link to="/customer/services">
              <Button size="sm" variant="ghost">
                View All
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {servicesData?.results
              ?.filter((s) => !["completed", "cancelled"].includes(s.status))
              .slice(0, 3)
              .map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 transition-colors bg-gray-50 rounded-xl hover:bg-gray-100"
                >
                  <div>
                    <p className="font-semibold">{service.request_number}</p>
                    <p className="text-sm text-gray-600">
                      {service.product_name}
                    </p>
                  </div>
                  <Badge className={serviceStatusColors[service.status]}>
                    {service.status?.toUpperCase().replace("_", " ")}
                  </Badge>
                </div>
              )) || (
              <div className="py-8 text-center text-gray-400">
                <Wrench className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No active services</p>
                <Link to="/customer/services/book">
                  <Button className="mt-3" size="sm">
                    Book Service
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* My Bikes Section */}
      {bikesData?.results && bikesData.results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="flex items-center gap-2 text-xl font-bold">
              <Bike className="w-5 h-5 text-blue-600" />
              My Bikes
            </h3>
            <Link to="/customer/bikes">
              <Button size="sm" variant="ghost">
                View All
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {bikesData.results.slice(0, 3).map((bike, index) => (
              <div
                key={index}
                className="p-4 border border-blue-100 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl"
              >
                <Bike className="w-10 h-10 mb-3 text-blue-600" />
                <p className="text-lg font-semibold">{bike.product_name}</p>
                <p className="mb-2 text-sm text-gray-600">
                  {bike.product_model}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Purchased:{" "}
                    {new Date(bike.purchase_date).toLocaleDateString()}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {bike.warranty_status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CustomerDashboard;
