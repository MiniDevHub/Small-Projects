import React from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Calendar, Shield, Edit } from "lucide-react";
import useAuthStore from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EmployeeProfile = () => {
  const { user } = useAuthStore();

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="mt-1 text-gray-500">View and manage your information</p>
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
                <div className="flex items-center justify-center w-32 h-32 mx-auto mb-4 text-5xl font-bold text-white rounded-full bg-gradient-to-br from-green-500 to-emerald-500">
                  {user?.first_name?.[0] || "E"}
                </div>
                <h2 className="mb-1 text-2xl font-bold text-gray-900">
                  {user?.full_name || user?.first_name}
                </h2>
                <p className="mb-4 text-gray-500">{user?.email}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 font-semibold text-green-800 bg-green-100 rounded-full">
                  <Shield className="w-4 h-4" />
                  Employee
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
                    <p className="text-sm text-gray-600">Joined Date</p>
                  </div>
                  <p className="font-semibold">
                    {user?.date_joined
                      ? new Date(user.date_joined).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Change Password Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline">Change Password</Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default EmployeeProfile;
