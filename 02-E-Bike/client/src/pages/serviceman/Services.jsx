import React, { useState } from "react";
import { motion } from "framer-motion";
import { Wrench, Search, Eye } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceService } from "@/api/serviceService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DataTable from "@/components/common/DataTable";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

const ServicemanServices = () => {
  const [search, setSearch] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [updateData, setUpdateData] = useState({
    status: "",
    serviceman_notes: "",
  });

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["serviceman", "services"],
    queryFn: serviceService.getMyServices,
  });

  const updateServiceMutation = useMutation({
    mutationFn: ({ serviceId, ...data }) =>
      serviceService.updateServiceStatus(serviceId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["serviceman", "services"]);
      toast.success("Service updated successfully");
      setSelectedService(null);
      setUpdateData({ status: "", serviceman_notes: "" });
    },
    onError: () => {
      toast.error("Failed to update service");
    },
  });

  const statusColors = {
    assigned: "bg-yellow-100 text-yellow-800",
    in_progress: "bg-blue-100 text-blue-800",
    waiting_parts: "bg-purple-100 text-purple-800",
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
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.product_name}</p>
          <p className="text-xs text-gray-500">{row.original.product_model}</p>
        </div>
      ),
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
      header: "Actions",
      cell: ({ row }) => (
        <Button
          size="sm"
          onClick={() => setSelectedService(row.original)}
          disabled={row.original.status === "completed"}
        >
          <Eye className="w-4 h-4 mr-1" />
          Update
        </Button>
      ),
    },
  ];

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">My Services</h1>
        <p className="mt-1 text-gray-500">
          Manage and update assigned services
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          {
            label: "Total Services",
            value: data?.results?.length || 0,
            color: "blue",
          },
          {
            label: "Pending",
            value:
              data?.results?.filter((s) => s.status === "assigned").length || 0,
            color: "yellow",
          },
          {
            label: "In Progress",
            value:
              data?.results?.filter((s) => s.status === "in_progress").length ||
              0,
            color: "blue",
          },
          {
            label: "Completed",
            value:
              data?.results?.filter((s) => s.status === "completed").length ||
              0,
            color: "green",
          },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`bg-${stat.color}-50 rounded-xl p-4 border border-${stat.color}-100`}
          >
            <p className={`text-sm text-${stat.color}-600 mb-1`}>
              {stat.label}
            </p>
            <p className={`text-3xl font-bold text-${stat.color}-600`}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 bg-white border border-gray-100 shadow-lg rounded-xl"
      >
        <div className="relative">
          <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
          <Input
            placeholder="Search by request number or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* Services Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <DataTable
          data={data?.results || []}
          columns={columns}
          searchValue={search}
          onSearchChange={setSearch}
        />
      </motion.div>

      {/* Update Service Modal */}
      <Dialog
        open={!!selectedService}
        onOpenChange={() => setSelectedService(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              Update Service Status
            </DialogTitle>
          </DialogHeader>
          {selectedService && (
            <div className="space-y-4">
              {/* Service Details */}
              <div className="p-4 space-y-2 bg-gray-50 rounded-xl">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Request Number:</span>
                  <span className="font-semibold">
                    {selectedService.request_number}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Customer:</span>
                  <span className="font-semibold">
                    {selectedService.customer_name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Bike:</span>
                  <span className="font-semibold">
                    {selectedService.product_name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Issue:</span>
                  <Badge variant="outline" className="capitalize">
                    {selectedService.issue_type}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Current Status:</span>
                  <Badge className={statusColors[selectedService.status]}>
                    {selectedService.status?.toUpperCase().replace("_", " ")}
                  </Badge>
                </div>
              </div>

              {/* Customer Description */}
              {selectedService.description && (
                <div className="p-4 bg-blue-50 rounded-xl">
                  <p className="mb-1 text-sm font-medium text-blue-900">
                    Customer Notes:
                  </p>
                  <p className="text-sm text-blue-800">
                    {selectedService.description}
                  </p>
                </div>
              )}

              {/* Update Form */}
              <div className="space-y-4">
                <div>
                  <Label>Update Status *</Label>
                  <select
                    value={updateData.status}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, status: e.target.value })
                    }
                    className="w-full p-2 mt-1 border rounded-lg"
                  >
                    <option value="">Select status...</option>
                    <option value="in_progress">
                      Start Work (In Progress)
                    </option>
                    <option value="waiting_parts">Waiting for Parts</option>
                    <option value="completed">Mark as Completed</option>
                  </select>
                </div>

                <div>
                  <Label>Service Notes</Label>
                  <textarea
                    value={updateData.serviceman_notes}
                    onChange={(e) =>
                      setUpdateData({
                        ...updateData,
                        serviceman_notes: e.target.value,
                      })
                    }
                    placeholder="Add any notes about the service..."
                    className="w-full p-2 border rounded-lg mt-1 min-h-[100px]"
                  />
                </div>

                <Button
                  onClick={() =>
                    updateServiceMutation.mutate({
                      serviceId: selectedService.id,
                      ...updateData,
                    })
                  }
                  disabled={
                    !updateData.status || updateServiceMutation.isPending
                  }
                  className="w-full"
                >
                  {updateServiceMutation.isPending
                    ? "Updating..."
                    : "Update Service"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicemanServices;
