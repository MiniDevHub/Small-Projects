import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Users as UsersIcon } from "lucide-react";
import { useAllUsers } from "@/hooks/useAdminStats";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/api/adminService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DataTable from "@/components/common/DataTable";
import UserForm from "@/components/admin/UserForm";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";

const AdminUsers = () => {
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState("");

  const { data, isLoading } = useAllUsers({ role: roleFilter });
  const queryClient = useQueryClient();

  const createDealerMutation = useMutation({
    mutationFn: adminService.createDealer,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin", "users"]);
      toast.success("Dealer created successfully");
      setIsFormOpen(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create dealer");
    },
  });

  const roleColors = {
    admin: "bg-purple-100 text-purple-800",
    dealer: "bg-blue-100 text-blue-800",
    employee: "bg-green-100 text-green-800",
    serviceman: "bg-yellow-100 text-yellow-800",
    customer: "bg-gray-100 text-gray-800",
  };

  const columns = [
    {
      header: "User",
      accessorKey: "email",
      cell: ({ row }) => (
        <div>
          <p className="font-semibold">
            {row.original.full_name || row.original.first_name}
          </p>
          <p className="text-sm text-gray-500">{row.original.email}</p>
        </div>
      ),
    },
    {
      header: "Phone",
      accessorKey: "phone",
    },
    {
      header: "Role",
      accessorKey: "role",
      cell: ({ row }) => (
        <Badge className={roleColors[row.original.role]}>
          {row.original.role?.toUpperCase()}
        </Badge>
      ),
    },
    {
      header: "Dealership",
      accessorKey: "dealership_name",
      cell: ({ row }) => <span>{row.original.dealership_name || "-"}</span>,
    },
    {
      header: "Status",
      accessorKey: "is_active",
      cell: ({ row }) => (
        <Badge
          className={
            row.original.is_active
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }
        >
          {row.original.is_active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      header: "Joined",
      accessorKey: "date_joined",
      cell: ({ row }) => (
        <span className="text-sm text-gray-600">
          {new Date(row.original.date_joined).toLocaleDateString()}
        </span>
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
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="mt-1 text-gray-500">Manage system users and dealers</p>
        </div>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Dealer
        </Button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {[
          { role: "", label: "Total Users", value: data?.count || 0 },
          {
            role: "dealer",
            label: "Dealers",
            value:
              data?.results?.filter((u) => u.role === "dealer").length || 0,
          },
          {
            role: "employee",
            label: "Employees",
            value:
              data?.results?.filter((u) => u.role === "employee").length || 0,
          },
          {
            role: "serviceman",
            label: "Servicemen",
            value:
              data?.results?.filter((u) => u.role === "serviceman").length || 0,
          },
          {
            role: "customer",
            label: "Customers",
            value:
              data?.results?.filter((u) => u.role === "customer").length || 0,
          },
        ].map((stat) => (
          <motion.button
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setRoleFilter(stat.role)}
            className={`p-4 rounded-xl text-left transition-all ${
              roleFilter === stat.role
                ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white"
                : "bg-white border border-gray-100 hover:border-blue-300"
            }`}
          >
            <p
              className={`text-sm mb-1 ${roleFilter === stat.role ? "text-white" : "text-gray-600"}`}
            >
              {stat.label}
            </p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </motion.button>
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
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* Users Table */}
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

      {/* Create Dealer Form */}
      <UserForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={(data) => createDealerMutation.mutate(data)}
        isLoading={createDealerMutation.isPending}
      />
    </div>
  );
};

export default AdminUsers;
