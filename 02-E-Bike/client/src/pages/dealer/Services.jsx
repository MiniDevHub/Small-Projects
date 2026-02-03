import React, { useState } from "react";
import { motion } from "framer-motion";
import { Wrench, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceService } from "@/api/serviceService";
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
import toast from "react-hot-toast";

const DealerServices = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [servicemanId, setServicemanId] = useState("");

  const queryClient = useQueryClient();

  const { data: services, isLoading } = useQuery({
    queryKey: ["services", "dealer"],
    queryFn: serviceService.getDealerServices,
  });

  const { data: servicemen } = useQuery({
    queryKey: ["dealer", "servicemen"],
    queryFn: () => serviceService.getServicemen(),
  });

  const assignServiceMutation = useMutation({
    mutationFn: ({ serviceId, servicemanId }) =>
      serviceService.assignService(serviceId, { serviceman_id: servicemanId }),
    onSuccess: () => {
      queryClient.invalidateQueries(["services"]);
      toast.success("Service assigned successfully");
      setSelectedService(null);
      setServicemanId("");
    },
    onError: () => {
      toast.error("Failed to assign service");
    },
  });

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    assigned: "bg-blue-100 text-blue-800",
    in_progress: "bg-purple-100 text-purple-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const columns = [
    {
      header: "Request #",
      accessorKey: "request_number",
      cell: ({ row }) => (
        <div>
          <p className="font-semibold">{row.original.request_number}</p>
          <p className="text-xs text-gray-500">
            {new Date(row.original.created_at).toLocaleDateString()}
          </p>
        </div>
      ),
    },
    {
      header: "Customer",
      accessorKey: "customer_name",
      cell: ({ row }) => (
        <div>
          <p className="font-semibold">{row.original.customer_name}</p>
          <p className="text-xs text-gray-500">{row.original.customer_phone}</p>
        </div>
      ),
    },
    {
      header: "Bike",
      accessorKey: "product_name",
    },
    {
      header: "Issue",
      accessorKey: "issue_type",
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.original.issue_type}
        </Badge>
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
      header: "Assigned To",
      accessorKey: "serviceman_name",
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.serviceman_name || "Unassigned"}
        </span>
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) =>
        row.original.status === "pending" && (
          <Button
            size="sm"
            onClick={() => setSelectedService(row.original)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Assign
          </Button>
        ),
    },
  ];

  if (isLoading) return <LoadingSpinner />;

  const summary = {
    total: services?.results?.length || 0,
    pending:
      services?.results?.filter((s) => s.status === "pending").length || 0,
    in_progress:
      services?.results?.filter((s) => s.status === "in_progress").length || 0,
    completed:
      services?.results?.filter((s) => s.status === "completed").length || 0,
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Service Management</h1>
        <p className="mt-1 text-gray-500">Assign and track service requests</p>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          {
            label: "Total Requests",
            value: summary.total,
            icon: Wrench,
            color: "blue",
          },
          {
            label: "Pending",
            value: summary.pending,
            icon: AlertCircle,
            color: "yellow",
          },
          {
            label: "In Progress",
            value: summary.in_progress,
            icon: Clock,
            color: "purple",
          },
          {
            label: "Completed",
            value: summary.completed,
            icon: CheckCircle,
            color: "green",
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

      {/* Services Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <DataTable data={services?.results || []} columns={columns} />
      </motion.div>

      {/* Assign Service Modal */}
      <Dialog
        open={!!selectedService}
        onOpenChange={() => setSelectedService(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Service</DialogTitle>
          </DialogHeader>
          {selectedService && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">Request Number</p>
                <p className="font-semibold">
                  {selectedService.request_number}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">Customer</p>
                <p className="font-semibold">{selectedService.customer_name}</p>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Select Serviceman
                </label>
                <select
                  value={servicemanId}
                  onChange={(e) => setServicemanId(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Choose serviceman...</option>
                  {servicemen?.results?.map((serviceman) => (
                    <option key={serviceman.id} value={serviceman.id}>
                      {serviceman.full_name || serviceman.first_name}
                    </option>
                  ))}
                </select>
              </div>
              <Button
                onClick={() =>
                  assignServiceMutation.mutate({
                    serviceId: selectedService.id,
                    servicemanId,
                  })
                }
                disabled={!servicemanId || assignServiceMutation.isPending}
                className="w-full"
              >
                {assignServiceMutation.isPending
                  ? "Assigning..."
                  : "Assign Service"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DealerServices;
