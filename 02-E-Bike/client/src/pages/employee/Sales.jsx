import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Eye, Download } from "lucide-react";
import { useSales } from "@/hooks/useSales";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DataTable from "@/components/common/DataTable";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/formatters";
import { Link } from "react-router-dom";

const EmployeeSales = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useSales();

  const columns = [
    {
      header: "Invoice",
      accessorKey: "invoice_number",
      cell: ({ row }) => (
        <div>
          <p className="font-semibold">{row.original.invoice_number}</p>
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
          <p className="font-semibold">
            {row.original.customer_name || "Walk-in"}
          </p>
          <p className="text-xs text-gray-500">{row.original.customer_phone}</p>
        </div>
      ),
    },
    {
      header: "Items",
      accessorKey: "items",
      cell: ({ row }) => <span>{row.original.items?.length || 0} items</span>,
    },
    {
      header: "Total",
      accessorKey: "grand_total",
      cell: ({ row }) => (
        <p className="font-bold text-green-600">
          {formatCurrency(row.original.grand_total)}
        </p>
      ),
    },
    {
      header: "Payment",
      accessorKey: "payment_method",
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.original.payment_method}
        </Badge>
      ),
    },
    {
      header: "Status",
      accessorKey: "payment_status",
      cell: ({ row }) => (
        <Badge
          className={
            row.original.payment_status === "paid"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }
        >
          {row.original.payment_status}
        </Badge>
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link to={`/employee/sales/${row.original.id}`}>
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
          <h1 className="text-3xl font-bold text-gray-900">My Sales</h1>
          <p className="mt-1 text-gray-500">Track your sales performance</p>
        </div>
        <Link to="/employee/sales/create">
          <Button className="bg-gradient-to-r from-green-600 to-emerald-600">
            <Plus className="w-4 h-4 mr-2" />
            New Sale
          </Button>
        </Link>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          {
            label: "Total Sales",
            value: data?.count || 0,
            color: "blue",
          },
          {
            label: "Total Revenue",
            value: formatCurrency(
              data?.results?.reduce((sum, sale) => sum + sale.grand_total, 0) ||
                0,
            ),
            color: "green",
          },
          {
            label: "This Month",
            value:
              data?.results?.filter(
                (s) =>
                  new Date(s.created_at).getMonth() === new Date().getMonth(),
              ).length || 0,
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
            placeholder="Search by invoice, customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* Sales Table */}
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
    </div>
  );
};

export default EmployeeSales;
