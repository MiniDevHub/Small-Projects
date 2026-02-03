import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Edit, CheckCircle, XCircle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { attendanceService } from "@/api/attendanceService";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import DataTable from "@/components/common/DataTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

const DealerAttendance = () => {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7),
  );
  const [editingRecord, setEditingRecord] = useState(null);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["attendance", selectedMonth],
    queryFn: () =>
      attendanceService.getStaffAttendance({ month: selectedMonth }),
  });

  const editAttendanceMutation = useMutation({
    mutationFn: ({ id, ...data }) => attendanceService.editAttendance(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["attendance"]);
      toast.success("Attendance updated");
      setEditingRecord(null);
    },
    onError: () => {
      toast.error("Failed to update attendance");
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
      header: "Employee",
      accessorKey: "user_name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
            {row.original.user_name?.[0] || "E"}
          </div>
          <div>
            <p className="font-semibold">{row.original.user_name}</p>
            <p className="text-xs text-gray-500">{row.original.role}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: ({ row }) => (
        <span className="text-sm">
          {new Date(row.original.date).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "Clock In",
      accessorKey: "clock_in",
      cell: ({ row }) => (
        <span className="font-mono text-sm">
          {row.original.clock_in
            ? new Date(row.original.clock_in).toLocaleTimeString()
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
            ? new Date(row.original.clock_out).toLocaleTimeString()
            : "-"}
        </span>
      ),
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
    {
      header: "Actions",
      cell: ({ row }) => (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setEditingRecord(row.original)}
        >
          <Edit className="w-4 h-4" />
        </Button>
      ),
    },
  ];

  if (isLoading) return <LoadingSpinner />;

  const summary = {
    total: data?.results?.length || 0,
    present: data?.results?.filter((r) => r.status === "present").length || 0,
    absent: data?.results?.filter((r) => r.status === "absent").length || 0,
    leaves: data?.results?.filter((r) => r.status === "leave").length || 0,
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Attendance Management
          </h1>
          <p className="mt-1 text-gray-500">View and edit staff attendance</p>
        </div>
        <div className="flex items-center gap-3">
          <Input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-48"
          />
        </div>
      </motion.div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          {
            label: "Total Records",
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
          {
            label: "Absent",
            value: summary.absent,
            icon: XCircle,
            color: "red",
          },
          {
            label: "Leaves",
            value: summary.leaves,
            icon: Users,
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

      {/* Attendance Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <DataTable data={data?.results || []} columns={columns} />
      </motion.div>

      {/* Edit Attendance Modal */}
      <Dialog
        open={!!editingRecord}
        onOpenChange={() => setEditingRecord(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Attendance</DialogTitle>
          </DialogHeader>
          {editingRecord && (
            <div className="space-y-4">
              <div>
                <Label>Employee</Label>
                <p className="font-semibold">{editingRecord.user_name}</p>
              </div>
              <div>
                <Label>Date</Label>
                <p>{new Date(editingRecord.date).toLocaleDateString()}</p>
              </div>
              <div>
                <Label>Status</Label>
                <select
                  className="w-full p-2 border rounded-lg"
                  defaultValue={editingRecord.status}
                  onChange={(e) => {
                    editAttendanceMutation.mutate({
                      id: editingRecord.id,
                      status: e.target.value,
                      edit_reason: "Manually edited by dealer",
                    });
                  }}
                >
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="half_day">Half Day</option>
                  <option value="leave">Leave</option>
                </select>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DealerAttendance;
