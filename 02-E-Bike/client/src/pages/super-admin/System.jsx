import React from "react";
import { motion } from "framer-motion";
import {
  Database,
  Server,
  Cpu,
  HardDrive,
  Globe,
  Shield,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";

const SuperAdminSystem = () => {
  const handleClearCache = () => {
    toast.success("Cache cleared successfully");
  };

  const handleTestEmail = () => {
    toast.success("Test email sent");
  };

  const systemStats = [
    { label: "MongoDB", value: "Connected", status: "success", icon: Database },
    { label: "Redis", value: "Connected", status: "success", icon: Server },
    { label: "API", value: "Running", status: "success", icon: Globe },
    {
      label: "Storage",
      value: "2.4 GB / 10 GB",
      status: "warning",
      icon: HardDrive,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
        <p className="mt-1 text-gray-500">
          Monitor and manage system resources
        </p>
      </motion.div>

      {/* System Health */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {systemStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-2xl border ${
                stat.status === "success"
                  ? "bg-green-50 border-green-200"
                  : "bg-yellow-50 border-yellow-200"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon
                  className={`w-8 h-8 ${
                    stat.status === "success"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                />
                <span
                  className={`w-3 h-3 rounded-full ${
                    stat.status === "success" ? "bg-green-500" : "bg-yellow-500"
                  } animate-pulse`}
                />
              </div>
              <p className="mb-1 text-sm text-gray-600">{stat.label}</p>
              <p
                className={`text-xl font-bold ${
                  stat.status === "success"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {stat.value}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Resource Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            Server Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">CPU Usage</span>
              <span className="text-sm font-bold">23%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full">
              <div
                className="h-3 transition-all bg-blue-600 rounded-full"
                style={{ width: "23%" }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Memory</span>
              <span className="text-sm font-bold">45%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full">
              <div
                className="h-3 transition-all bg-green-600 rounded-full"
                style={{ width: "45%" }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Disk Space</span>
              <span className="text-sm font-bold">24%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full">
              <div
                className="h-3 transition-all bg-purple-600 rounded-full"
                style={{ width: "24%" }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            System Maintenance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="justify-start w-full"
            onClick={handleClearCache}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Clear Cache
          </Button>
          <Button
            variant="outline"
            className="justify-start w-full"
            onClick={handleTestEmail}
          >
            <Globe className="w-4 h-4 mr-2" />
            Test Email Configuration
          </Button>
          <Button
            variant="outline"
            className="justify-start w-full text-red-600 hover:text-red-700"
          >
            <Database className="w-4 h-4 mr-2" />
            Backup Database
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminSystem;
