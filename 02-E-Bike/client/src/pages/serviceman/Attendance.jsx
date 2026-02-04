import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle, LogIn, LogOut } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { attendanceService } from "@/api/attendanceService";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import DataTable from "@/components/common/DataTable";
import toast from "react-hot-toast";

const ServicemanAttendance = () => {
  const queryClient = useQueryClient();

  const { data: todayAttendance, isLoading: todayLoading } = useQuery({
    queryKey: ["attendance", "today"],
    queryFn: attendanceService.getTodayAttendance,
  });

  const { data: monthlyAttendance, isLoading: monthlyLoading } = useQuery({
    queryKey: ["attendance", "monthly"],
    queryFn: () =>
      attendanceService.getMyAttendance({
        month: new Date().toISOString().slice(0, 7),
      }),
  });

  const clockInMutation = useMutation({
    mutationFn: attendanceService.clockIn,
    onSuccess: () => {
      queryClient.invalidateQueries(["attendance"]);
      toast.success("Clocked in successfully");
    },
    onError: () => {
      toast.error("Failed to clock in");
    },
  });

  const clockOutMutation = useMutation({
    mutationFn: attendanceService.clockOut,
    onSuccess: () => {
      queryClient.invalidateQueries(["attendance"]);
      toast.success("Clocked out successfully");
    },
    onError: () => {
      toast.error("Failed to clock out");
    },
  });

  const statusColors = {
    present: "bg-green-100 text-green-800",
    absent: "bg-red-100 text-red-800",
    half_day: "bg-yellow-100 text-yellow-800",
    leave: "bg-blue-100 text-blue-800",
  };

  const columns = [
    {
      header: "Date",
      accessorKey: "date",
      cell: ({ row }) => (
        <span className="font-semibold">
          {new Date(row.original.date).toLocaleDateString("en-IN", {
            weekday: "short",
            day: "2-digit",
            month: "short",
          })}
        </span>
      ),
    },
    {
      header: "Clock In",
      accessorKey: "clock_in",
      cell: ({ row }) => (
        <span className="font-mono text-sm">
          {row.original.clock_in
            ? new Date(row.original.clock_in).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "-"}
        </span>
      ),
    },
    {
      header: "Clock Out",
      accessorKey: "clock_out",
      cell: ({ row }) => (
        <span className="font-mono text-sm">
          {row.original.clock_out
            ? new Date(row.original.clock_out).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "-"}
        </span>
      ),
    },
    {
      header: "Hours",
      cell: ({ row }) => {
        if (!row.original.clock_in || !row.original.clock_out) return "-";
        const hours =
          Math.abs(
            new Date(row.original.clock_out) - new Date(row.original.clock_in),
          ) / 36e5;
        return <span className="font-semibold">{hours.toFixed(1)}h</span>;
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <Badge className={statusColors[row.original.status]}>
          {row.original.status?.toUpperCase().replace("_", " ")}
        </Badge>
      ),
    },
  ];

  if (todayLoading || monthlyLoading) return <LoadingSpinner />;

  const summary = {
    total: monthlyAttendance?.results?.length || 0,
    present:
      monthlyAttendance?.results?.filter((r) => r.status === "present")
        .length || 0,
    absent:
      monthlyAttendance?.results?.filter((r) => r.status === "absent").length ||
      0,
    leaves:
      monthlyAttendance?.results?.filter((r) => r.status === "leave").length ||
      0,
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">My Attendance</h1>
        <p className="mt-1 text-gray-500">
          Track your attendance and working hours
        </p>
      </motion.div>

      {/* Today's Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 border border-yellow-100 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl"
      >
        <h3 className="mb-4 text-xl font-bold">Today's Status</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="p-4 bg-white rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    todayAttendance?.clock_in
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <LogIn className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Clock In</p>
                  <p className="text-xl font-bold">
                    {todayAttendance?.clock_in
                      ? new Date(todayAttendance.clock_in).toLocaleTimeString(
                          "en-IN",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )
                      : "Not marked"}
                  </p>
                </div>
              </div>
              {!todayAttendance?.clock_in && (
                <Button
                  onClick={() => clockInMutation.mutate()}
                  disabled={clockInMutation.isPending}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Clock In
                </Button>
              )}
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    todayAttendance?.clock_out
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <LogOut className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Clock Out</p>
                  <p className="text-xl font-bold">
                    {todayAttendance?.clock_out
                      ? new Date(todayAttendance.clock_out).toLocaleTimeString(
                          "en-IN",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )
                      : "Not marked"}
                  </p>
                </div>
              </div>
              {todayAttendance?.clock_in && !todayAttendance?.clock_out && (
                <Button
                  onClick={() => clockOutMutation.mutate()}
                  disabled={clockOutMutation.isPending}
                  variant="destructive"
                >
                  Clock Out
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Monthly Summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          {
            label: "Total Days",
            value: summary.total,
            icon: Calendar,
            color: "blue",
          },
          {
            label: "Present",
            value: summary.present,
            icon: CheckCircle,
            color: "green",
          },
          { label: "Absent", value: summary.absent, icon: Clock, color: "red" },
          {
            label: "Leaves",
            value: summary.leaves,
            icon: Calendar,
            color: "yellow",
          },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`bg-${stat.color}-50 rounded-xl p-4 border border-${stat.color}-100`}
          >
            <div className="flex items-center gap-3">
              <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
              <div>
                <p className={`text-sm text-${stat.color}-600`}>{stat.label}</p>
                <p className={`text-3xl font-bold text-${stat.color}-600`}>
                  {stat.value}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Attendance History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="mb-4 text-xl font-bold">This Month's Record</h3>
        <DataTable data={monthlyAttendance?.results || []} columns={columns} />
      </motion.div>
    </div>
  );
};

export default ServicemanAttendance;
