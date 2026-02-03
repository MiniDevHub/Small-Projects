import React from "react";
import { motion } from "framer-motion";
import { Package, AlertTriangle, TrendingDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { inventoryService } from "@/api/inventoryService";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import DataTable from "@/components/common/DataTable";
import { Badge } from "@/components/ui/badge";

const DealerInventory = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["inventory"],
    queryFn: inventoryService.getDealerInventory,
  });

  const columns = [
    {
      header: "Product",
      accessorKey: "product_name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Package className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-semibold">{row.original.product_name}</p>
            <p className="text-xs text-gray-500">
              {row.original.product_model}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Current Stock",
      accessorKey: "current_stock",
      cell: ({ row }) => (
        <Badge
          className={
            row.original.current_stock > 10
              ? "bg-green-100 text-green-800"
              : row.original.current_stock > 5
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }
        >
          {row.original.current_stock} units
        </Badge>
      ),
    },
    {
      header: "Min. Stock",
      accessorKey: "min_stock_level",
      cell: ({ row }) => <span>{row.original.min_stock_level} units</span>,
    },
    {
      header: "Status",
      cell: ({ row }) => {
        const isLow =
          row.original.current_stock <= row.original.min_stock_level;
        return isLow ? (
          <Badge className="text-red-800 bg-red-100">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Low Stock
          </Badge>
        ) : (
          <Badge className="text-green-800 bg-green-100">In Stock</Badge>
        );
      },
    },
  ];

  if (isLoading) return <LoadingSpinner />;

  const lowStockItems =
    data?.results?.filter(
      (item) => item.current_stock <= item.min_stock_level,
    ) || [];

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
        <p className="mt-1 text-gray-500">Monitor your stock levels</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 border border-blue-100 bg-blue-50 rounded-xl"
        >
          <Package className="w-8 h-8 mb-3 text-blue-600" />
          <p className="mb-1 text-sm text-blue-600">Total Items</p>
          <p className="text-3xl font-bold text-blue-600">
            {data?.results?.length || 0}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 border border-red-100 bg-red-50 rounded-xl"
        >
          <AlertTriangle className="w-8 h-8 mb-3 text-red-600" />
          <p className="mb-1 text-sm text-red-600">Low Stock</p>
          <p className="text-3xl font-bold text-red-600">
            {lowStockItems.length}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 border border-green-100 bg-green-50 rounded-xl"
        >
          <TrendingDown className="w-8 h-8 mb-3 text-green-600" />
          <p className="mb-1 text-sm text-green-600">Total Stock Value</p>
          <p className="text-3xl font-bold text-green-600">
            ₹
            {(
              data?.results?.reduce(
                (sum, item) => sum + item.current_stock * 40000,
                0,
              ) || 0
            ).toLocaleString()}
          </p>
        </motion.div>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 border border-red-200 bg-red-50 rounded-xl"
        >
          <div className="flex items-center gap-2 mb-2 font-semibold text-red-800">
            <AlertTriangle className="w-5 h-5" />
            Low Stock Alert
          </div>
          <p className="text-sm text-red-700">
            {lowStockItems.length} items are running low. Consider placing an
            order.
          </p>
        </motion.div>
      )}

      {/* Inventory Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <DataTable data={data?.results || []} columns={columns} />
      </motion.div>
    </div>
  );
};

export default DealerInventory;
