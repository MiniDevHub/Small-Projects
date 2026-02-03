import React from "react";
import { motion } from "framer-motion";
import { FileText, User, Clock, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SuperAdminLogs = () => {
  const logs = [
    {
      id: 1,
      action: "Product Created",
      user: "Admin 1",
      role: "admin",
      timestamp: "2026-02-04 12:30:00",
      status: "success",
      details: "Created new product: Lightning Bike",
    },
    {
      id: 2,
      action: "Order Approved",
      user: "Admin 2",
      role: "admin",
      timestamp: "2026-02-04 11:45:00",
      status: "success",
      details: "Approved dealer order #ORD-123",
    },
    {
      id: 3,
      action: "Login Failed",
      user: "dealer@test.com",
      role: "dealer",
      timestamp: "2026-02-04 10:20:00",
      status: "error",
      details: "Invalid password attempt",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Activity Logs</h1>
          <p className="mt-1 text-gray-500">Monitor all system activities</p>
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </motion.div>

      {/* Logs List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-gray-100 shadow-lg rounded-2xl"
      >
        <div className="p-6 space-y-4">
          {logs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 transition-colors bg-gray-50 rounded-xl hover:bg-gray-100"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  log.status === "success"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                <FileText className="w-6 h-6" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{log.action}</h4>
                  <Badge
                    className={
                      log.status === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {log.status}
                  </Badge>
                </div>

                <p className="mb-2 text-sm text-gray-600">{log.details}</p>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {log.user}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {log.timestamp}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {log.role}
                  </Badge>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SuperAdminLogs;
