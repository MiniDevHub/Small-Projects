import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Package, Clock } from "lucide-react";
import { useAllOrders } from "@/hooks/useAdminStats";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "@/api/orderService";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/common/DataTable";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/formatters";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

const DealerOrders = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data, isLoading } = useAllOrders();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm();

  const createOrderMutation = useMutation({
    mutationFn: orderService.createDealerOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin", "orders"]);
      toast.success("Order created successfully");
      setIsFormOpen(false);
      reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create order");
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
      header: "Items",
      accessorKey: "items",
      cell: ({ row }) => (
        <div>
          <p className="font-semibold">
            {row.original.items?.length || 0} items
          </p>
          <p className="text-xs text-gray-500">
            {row.original.items?.[0]?.product_name}
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
  ];

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="mt-1 text-gray-500">Order products from admin</p>
        </div>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Order
        </Button>
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
            label: "In Transit",
            value:
              data?.results?.filter((o) => o.status === "shipped").length || 0,
            color: "blue",
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

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <DataTable data={data?.results || []} columns={columns} />
      </motion.div>

      {/* Create Order Modal */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Create New Order
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit((data) => createOrderMutation.mutate(data))}
            className="space-y-4"
          >
            <div>
              <Label>Product ID</Label>
              <Input {...register("product_id", { required: true })} />
            </div>
            <div>
              <Label>Quantity</Label>
              <Input
                type="number"
                {...register("quantity", { required: true })}
              />
            </div>
            <div>
              <Label>Notes (Optional)</Label>
              <Input {...register("dealer_notes")} />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={createOrderMutation.isPending}
            >
              {createOrderMutation.isPending ? "Creating..." : "Create Order"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DealerOrders;
