import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DataTable from "@/components/common/DataTable";
import StatusBadge from "@/components/common/StatusBadge";
import serviceService from "@/api/serviceService";
import { formatDate } from "@/utils/formatters";
import toast from "react-hot-toast";

const ServicemanServices = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [updateDialog, setUpdateDialog] = useState({
    open: false,
    service: null,
  });
  const [newStatus, setNewStatus] = useState("");
  const [notes, setNotes] = useState("");

  const queryClient = useQueryClient();

  const { data: servicesData, isLoading } = useQuery({
    queryKey: ["serviceman-services"],
    queryFn: () => serviceService.getServiceRequests(),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, data }) => serviceService.updateServiceStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["serviceman-services"]);
      toast.success("Service status updated successfully!");
      setUpdateDialog({ open: false, service: null });
      setNotes("");
    },
  });

  const services = servicesData?.results || servicesData || [];

  const handleUpdateStatus = async () => {
    if (!newStatus) {
      toast.error("Please select a status");
      return;
    }

    await updateStatusMutation.mutateAsync({
      id: updateDialog.service.id,
      data: { status: newStatus, notes },
    });
  };

  const columns = [
    {
      key: "request_number",
      label: "Request #",
      render: (service) => (
        <div>
          <p className="font-semibold text-primary-600">
            {service.request_number}
          </p>
          <p className="text-xs text-gray-500">
            {formatDate(service.created_at)}
          </p>
        </div>
      ),
    },
    {
      key: "customer",
      label: "Customer",
      render: (service) => (
        <div>
          <p className="font-semibold">{service.customer?.name}</p>
          <p className="text-xs text-gray-500">{service.customer?.phone}</p>
        </div>
      ),
    },
    {
      key: "issue_type",
      label: "Service Type",
      render: (service) => (
        <div>
          <p className="font-medium capitalize">{service.issue_type}</p>
          <p className="text-xs text-gray-500">{service.display_label}</p>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (service) => <StatusBadge status={service.status} />,
    },
    {
      key: "scheduled_date",
      label: "Scheduled",
      render: (service) => formatDate(service.scheduled_date),
    },
    {
      key: "actions",
      label: "Actions",
      render: (service) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedService(service);
            }}
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </Button>
          {service.status !== "completed" && service.status !== "cancelled" && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setUpdateDialog({ open: true, service });
                setNewStatus(service.status);
              }}
              className="text-green-600 hover:text-green-700"
              title="Update Status"
            >
              <CheckCircle className="w-4 h-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  const stats = [
    {
      label: "Total",
      value: services.length,
      color: "bg-primary-100 text-primary-700",
    },
    {
      label: "Assigned",
      value: services.filter((s) => s.status === "assigned").length,
      color: "bg-blue-100 text-blue-700",
    },
    {
      label: "In Progress",
      value: services.filter((s) => s.status === "in_progress").length,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      label: "Completed",
      value: services.filter((s) => s.status === "completed").length,
      color: "bg-green-100 text-green-700",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          My Service Requests
        </h1>
        <p className="mt-2 text-gray-600">
          View and update assigned service requests
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <p className="mb-1 text-sm text-gray-600">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Services Table */}
      <Card>
        <CardHeader>
          <CardTitle>Assigned Services</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={services}
            isLoading={isLoading}
            emptyMessage="No services assigned yet"
          />
        </CardContent>
      </Card>

      {/* Service Details Dialog */}
      <Dialog
        open={!!selectedService}
        onOpenChange={() => setSelectedService(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Service Request - {selectedService?.request_number}
            </DialogTitle>
          </DialogHeader>

          {selectedService && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-gray-50">
                <div>
                  <p className="text-sm text-gray-600">Customer</p>
                  <p className="font-semibold">
                    {selectedService.customer?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedService.customer?.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <StatusBadge status={selectedService.status} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Service Type</p>
                  <p className="font-semibold capitalize">
                    {selectedService.issue_type}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Service Label</p>
                  <p className="font-semibold">
                    {selectedService.display_label}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm text-gray-600">Issue Description</p>
                <p className="p-3 text-sm rounded bg-gray-50">
                  {selectedService.issue_description}
                </p>
              </div>

              {selectedService.service_notes && (
                <div>
                  <p className="mb-2 text-sm text-gray-600">Service Notes</p>
                  <p className="p-3 text-sm rounded bg-blue-50">
                    {selectedService.service_notes}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Scheduled Date</p>
                  <p className="font-semibold">
                    {formatDate(selectedService.scheduled_date)}
                  </p>
                </div>
                {selectedService.completed_at && (
                  <div>
                    <p className="text-sm text-gray-600">Completed Date</p>
                    <p className="font-semibold">
                      {formatDate(selectedService.completed_at)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog
        open={updateDialog.open}
        onOpenChange={(open) =>
          !open && setUpdateDialog({ open: false, service: null })
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Service Status</DialogTitle>
            <DialogDescription>
              Update the status of service request{" "}
              {updateDialog.service?.request_number}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium">
                New Status *
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md"
              >
                <option value="assigned">Assigned</option>
                <option value="in_progress">In Progress</option>
                <option value="waiting_parts">Waiting for Parts</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md"
                placeholder="Add notes about the service..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setUpdateDialog({ open: false, service: null });
                setNotes("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateStatus}
              disabled={updateStatusMutation.isPending}
            >
              {updateStatusMutation.isPending ? "Updating..." : "Update Status"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicemanServices;
