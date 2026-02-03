import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, Edit, Trash2, Eye } from "lucide-react";
import { useProducts, useDeleteProduct } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DataTable from "@/components/common/DataTable";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/formatters";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const AdminProducts = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});

  const { data, isLoading, error } = useProducts(filters);
  const deleteProduct = useDeleteProduct();

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct.mutateAsync(productId);
        toast.success("Product deleted successfully");
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

  const columns = [
    {
      header: "Product",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img
            src={row.original.images?.[0]?.url || "/placeholder-bike.jpg"}
            alt={row.original.name}
            className="object-cover w-12 h-12 rounded-lg"
          />
          <div>
            <p className="font-semibold">{row.original.name}</p>
            <p className="text-sm text-gray-500">{row.original.model}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.original.category}
        </Badge>
      ),
    },
    {
      header: "Price",
      accessorKey: "base_price",
      cell: ({ row }) => (
        <div>
          <p className="font-semibold">
            {formatCurrency(row.original.base_price)}
          </p>
          <p className="text-xs text-gray-500">
            MRP: {formatCurrency(row.original.mrp)}
          </p>
        </div>
      ),
    },
    {
      header: "Stock",
      accessorKey: "total_stock",
      cell: ({ row }) => (
        <Badge
          className={
            row.original.total_stock > 50
              ? "bg-green-100 text-green-800"
              : row.original.total_stock > 0
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }
        >
          {row.original.total_stock} units
        </Badge>
      ),
    },
    {
      header: "Status",
      accessorKey: "is_available",
      cell: ({ row }) => (
        <Badge
          className={
            row.original.is_available
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }
        >
          {row.original.is_available ? "Available" : "Unavailable"}
        </Badge>
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link to={`/products/${row.original.slug}`}>
            <Button size="sm" variant="ghost">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
          <Link to={`/admin/products/${row.original.id}/edit`}>
            <Button size="sm" variant="ghost">
              <Edit className="w-4 h-4" />
            </Button>
          </Link>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleDelete(row.original.id)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading products</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="mt-1 text-gray-500">Manage your product catalog</p>
        </div>
        <Link to="/admin/products/create">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 bg-white border border-gray-100 shadow-lg rounded-xl"
      >
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </motion.div>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <DataTable
          data={data?.results || data || []}
          columns={columns}
          searchValue={search}
          onSearchChange={setSearch}
        />
      </motion.div>
    </div>
  );
};

export default AdminProducts;
