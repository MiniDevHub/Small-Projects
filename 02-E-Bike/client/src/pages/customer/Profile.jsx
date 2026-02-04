import React from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Edit,
  Bike,
  ShoppingBag,
} from "lucide-react";
import useAuthStore from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { orderService } from "@/api/orderService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CustomerProfile = () => {
  const { user } = useAuthStore();

  const { data: stats } = useQuery({
    queryKey: ["customer", "stats"],
    queryFn: async () => {
      const orders = await orderService.getMyOrders();
      const bikes = await orderService.getMyBikes();
      return {
        totalOrders: orders?.results?.length || 0,
        totalBikes: bikes?.results?.length || 0,
      };
    },
  });

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="mt-1 text-gray-500">Manage your account information</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-32 h-32 mx-auto mb-4 text-5xl font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                  {user?.first_name?.[0] || "C"}
                </div>
                <h2 className="mb-1 text-2xl font-bold text-gray-900">
                  {user?.full_name || user?.first_name}
                </h2>
                <p className="mb-4 text-gray-500">{user?.email}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full">
                  Customer
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-3 bg-green-50 rounded-xl">
                    <ShoppingBag className="w-6 h-6 mx-auto mb-1 text-green-600" />
                    <p className="text-2xl font-bold text-green-600">
                      {stats?.totalOrders || 0}
                    </p>
                    <p className="text-xs text-gray-600">Orders</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <Bike className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                    <p className="text-2xl font-bold text-blue-600">
                      {stats?.totalBikes || 0}
                    </p>
                    <p className="text-xs text-gray-600">Bikes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Details Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <User className="w-5 h-5 text-gray-600" />
                    <p className="text-sm text-gray-600">Full Name</p>
                  </div>
                  <p className="font-semibold">
                    {user?.full_name || user?.first_name}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <p className="text-sm text-gray-600">Email</p>
                  </div>
                  <p className="font-semibold">{user?.email}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <p className="text-sm text-gray-600">Phone</p>
                  </div>
                  <p className="font-semibold">
                    {user?.phone || "Not provided"}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <p className="text-sm text-gray-600">Member Since</p>
                  </div>
                  <p className="font-semibold">
                    {user?.date_joined
                      ? new Date(user.date_joined).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* Address */}
              {user?.address && (
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <p className="text-sm text-gray-600">Address</p>
                  </div>
                  <p className="font-semibold">{user.address}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Security Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full md:w-auto">
              Change Password
            </Button>
            <Button variant="outline" className="w-full ml-0 md:w-auto md:ml-3">
              Update Address
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CustomerProfile;
