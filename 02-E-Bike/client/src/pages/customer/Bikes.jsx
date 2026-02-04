import React from "react";
import { motion } from "framer-motion";
import { Bike, Calendar, Shield, Wrench, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { orderService } from "@/api/orderService";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const CustomerBikes = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["customer", "bikes"],
    queryFn: () => orderService.getMyBikes(),
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Bikes</h1>
          <p className="mt-1 text-gray-500">Manage your electric bikes</p>
        </div>
        <Link to="/products">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Plus className="w-4 h-4 mr-2" />
            Buy New Bike
          </Button>
        </Link>
      </motion.div>

      {/* Bikes Grid */}
      {data?.results && data.results.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.results.map((bike, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="overflow-hidden transition-shadow bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-2xl"
            >
              {/* Bike Image */}
              <div className="relative flex items-center justify-center h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                <Bike className="w-20 h-20 text-blue-600" />
                {bike.warranty_active && (
                  <div className="absolute top-4 right-4">
                    <Badge className="text-green-800 bg-green-100">
                      <Shield className="w-3 h-3 mr-1" />
                      Under Warranty
                    </Badge>
                  </div>
                )}
              </div>

              {/* Bike Details */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {bike.product_name}
                  </h3>
                  <p className="text-sm text-gray-600">{bike.product_model}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <p className="text-xs text-gray-600">Purchased</p>
                    </div>
                    <p className="text-sm font-semibold">
                      {new Date(bike.purchase_date).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="w-4 h-4 text-gray-600" />
                      <p className="text-xs text-gray-600">Warranty</p>
                    </div>
                    <p className="text-sm font-semibold">
                      {bike.warranty_period || "2 Years"}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Link
                    to={`/customer/services/book?bike=${bike.id}`}
                    className="flex-1"
                  >
                    <Button className="w-full" size="sm">
                      <Wrench className="w-4 h-4 mr-2" />
                      Book Service
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-20 text-center"
        >
          <Bike className="w-20 h-20 mx-auto mb-4 text-gray-300" />
          <h3 className="mb-2 text-2xl font-bold text-gray-600">
            No Bikes Yet
          </h3>
          <p className="mb-6 text-gray-500">
            Purchase your first electric bike
          </p>
          <Link to="/products">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Plus className="w-4 h-4 mr-2" />
              Browse Bikes
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default CustomerBikes;
