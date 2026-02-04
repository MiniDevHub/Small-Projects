import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Search, Eye, Download, Package } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { orderService } from "@/api/orderService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DataTable from "@/components/common/DataTable";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/formatters";
import { Link } from "react-router-dom";

const CustomerOrders = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["customer", "orders"],
    queryFn: orderService.getMyOrders,
  });

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    processing: "bg-purple-100 text-purple-800",
    shipped: "bg-indigo-100 text-indigo-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
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
          <p className="font-medium">{row.original.items?.[0]?.product_name}</p>
          <p className="text-xs text-gray-500">
            {row.original.items?.length > 1 &&
              `+${row.original.items.length - 1} more`}
          </p>
        </div>
      ),
    },
    {
      header: "Total Amount",
      accessorKey: "grand_total",
      cell: ({ row }) => (
        <p className="font-bold text-green-600">
          {formatCurrency(row.original.grand_total)}
        </p>
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
        <div className="flex items-center gap-2">
          <Link to={`/customer/orders/${row.original.id}`}>
            <Button size="sm" variant="ghost">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
          <Button size="sm" variant="ghost">
            <Download className="w-4 h-4" />
          </Button>
        </div>
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
          <p className="mt-1 text-gray-500">Track and manage your orders</p>
        </div>
        <Link to="/products">
          <Button className="bg-gradient-to-r from-green-600 to-emerald-600">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Shop More
          </Button>
        </Link>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          {
            label: "Total Orders",
            value: data?.results?.length || 0,
            color: "blue",
          },
          {
            label: "Pending",
            value:
              data?.results?.filter((o) => o.status === "pending").length || 0,
            color: "yellow",
          },
          {
            label: "Delivered",
            value:
              data?.results?.filter((o) => o.status === "delivered").length ||
              0,
            color: "green",
          },
          {
            label: "Total Spent",
            value: formatCurrency(
              data?.results?.reduce(
                (sum, order) => sum + order.grand_total,
                0,
              ) || 0,
            ),
            color: "purple",
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
            placeholder="Search by order number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* Orders Table */}
      {data?.results && data.results.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <DataTable
            data={data.results}
            columns={columns}
            searchValue={search}
            onSearchChange={setSearch}
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-20 text-center"
        >
          <Package className="w-20 h-20 mx-auto mb-4 text-gray-300" />
          <h3 className="mb-2 text-2xl font-bold text-gray-600">
            No Orders Yet
          </h3>
          <p className="mb-6 text-gray-500">
            Start shopping to see your orders here
          </p>
          <Link to="/products">
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Browse Products
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default CustomerOrders;
