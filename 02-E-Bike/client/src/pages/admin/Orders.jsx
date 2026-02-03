import React, { useState } from "react";
import { motion } from "framer-motion";
import { Package, Filter, CheckCircle, XCircle } from "lucide-react";
import { useAllOrders } from "@/hooks/useAdminStats";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/api/adminService";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/common/DataTable";
import OrderDetailsModal from "@/components/admin/OrderDetailsModal";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/formatters";
import toast from "react-hot-toast";

const AdminOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");

  const { data, isLoading } = useAllOrders({ status: statusFilter });
  const queryClient = useQueryClient();

  const approveMutation = useMutation({
    mutationFn: (orderId) =>
      adminService.approveOrder(orderId, {
        admin_notes: "Order approved and will be processed",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin", "orders"]);
      toast.success("Order approved successfully");
      setSelectedOrder(null);
    },
    onError: () => {
      toast.error("Failed to approve order");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (orderId) =>
      adminService.rejectOrder(orderId, {
        rejection_reason: "Insufficient stock",
        admin_notes: "Order rejected",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin", "orders"]);
      toast.success("Order rejected");
      setSelectedOrder(null);
    },
    onError: () => {
      toast.error("Failed to reject order");
    },
  });

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    shipped: "bg-blue-100 text-blue-800",
    delivered: "bg-purple-100 text-purple-800",
  };

  const columns = [
    {
      header: "Order Number",
      accessorKey: "order_number",
      cell: ({ row }) => (
        <div>
          <p className="font-semibold">{row.original.order_number}</p>
          <p className="text-xs text-gray-500">
            {new Date(row.original.created_at).toLocaleDateString()}
          </p>
        </div>
      ),
    },
    {
      header: "Dealer",
      accessorKey: "dealer_id",
      cell: ({ row }) => (
        <div>
          <p className="text-sm">{row.original.dealer_id}</p>
        </div>
      ),
    },
    {
      header: "Items",
      accessorKey: "items",
      cell: ({ row }) => (
        <div>
          <p className="font-semibold">
            {row.original.items?.length || 0} items
          </p>
          <p className="text-xs text-gray-500">
            {row.original.items?.[0]?.product_name}
            {row.original.items?.length > 1 && " +more"}
          </p>
        </div>
      ),
    },
    {
      header: "Total",
      accessorKey: "grand_total",
      cell: ({ row }) => (
        <p className="font-bold">{formatCurrency(row.original.grand_total)}</p>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <Badge className={statusColors[row.original.status]}>
          {row.original.status?.toUpperCase()}
        </Badge>
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => setSelectedOrder(row.original)}
        >
          View Details
        </Button>
      ),
    },
  ];

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dealer Orders</h1>
          <p className="mt-1 text-gray-500">Review and approve dealer orders</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          { label: "Total Orders", value: data?.count || 0, color: "blue" },
          {
            label: "Pending",
            value:
              data?.results?.filter((o) => o.status === "pending").length || 0,
            color: "yellow",
          },
          {
            label: "Approved",
            value:
              data?.results?.filter((o) => o.status === "approved").length || 0,
            color: "green",
          },
          {
            label: "Rejected",
            value:
              data?.results?.filter((o) => o.status === "rejected").length || 0,
            color: "red",
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

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 bg-white border border-gray-100 shadow-lg rounded-xl"
      >
        <div className="flex items-center gap-4">
          <Button
            variant={statusFilter === "" ? "default" : "outline"}
            onClick={() => setStatusFilter("")}
            size="sm"
          >
            All
          </Button>
          <Button
            variant={statusFilter === "pending" ? "default" : "outline"}
            onClick={() => setStatusFilter("pending")}
            size="sm"
          >
            Pending
          </Button>
          <Button
            variant={statusFilter === "approved" ? "default" : "outline"}
            onClick={() => setStatusFilter("approved")}
            size="sm"
          >
            Approved
          </Button>
          <Button
            variant={statusFilter === "rejected" ? "default" : "outline"}
            onClick={() => setStatusFilter("rejected")}
            size="sm"
          >
            Rejected
          </Button>
        </div>
      </motion.div>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <DataTable data={data?.results || []} columns={columns} />
      </motion.div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onApprove={(orderId) => approveMutation.mutate(orderId)}
        onReject={(orderId) => rejectMutation.mutate(orderId)}
      />
    </div>
  );
};

export default AdminOrders;
