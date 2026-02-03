import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Users, Wrench, Search } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/api/authService";
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
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const DealerEmployees = () => {
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [employeeType, setEmployeeType] = useState("employee"); // 'employee' or 'serviceman'

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["dealer", "staff"],
    queryFn: () => authService.getDealerStaff(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const createStaffMutation = useMutation({
    mutationFn: (data) =>
      authService.createStaff({ ...data, role: employeeType }),
    onSuccess: () => {
      queryClient.invalidateQueries(["dealer", "staff"]);
      toast.success(
        `${employeeType === "employee" ? "Employee" : "Serviceman"} added successfully`,
      );
      setIsFormOpen(false);
      reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to add staff");
    },
  });

  const roleColors = {
    employee: "bg-green-100 text-green-800",
    serviceman: "bg-yellow-100 text-yellow-800",
  };

  const columns = [
    {
      header: "Staff",
      accessorKey: "full_name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full ${
              row.original.role === "employee"
                ? "bg-gradient-to-br from-green-500 to-emerald-500"
                : "bg-gradient-to-br from-yellow-500 to-orange-500"
            } flex items-center justify-center text-white font-bold`}
          >
            {row.original.first_name?.[0] || "S"}
          </div>
          <div>
            <p className="font-semibold">
              {row.original.full_name || row.original.first_name}
            </p>
            <p className="text-sm text-gray-500">{row.original.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Role",
      accessorKey: "role",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.role === "employee" ? (
            <Users className="w-4 h-4 text-green-600" />
          ) : (
            <Wrench className="w-4 h-4 text-yellow-600" />
          )}
          <Badge className={roleColors[row.original.role]}>
            {row.original.role === "employee" ? "Employee" : "Serviceman"}
          </Badge>
        </div>
      ),
    },
    {
      header: "Phone",
      accessorKey: "phone",
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

  const employees = data?.results?.filter((s) => s.role === "employee") || [];
  const servicemen =
    data?.results?.filter((s) => s.role === "serviceman") || [];

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Employees & Servicemen
          </h1>
          <p className="mt-1 text-gray-500">Manage your dealership staff</p>
        </div>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="bg-gradient-to-r from-green-600 to-emerald-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Staff
        </Button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 border border-green-100 bg-green-50 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-green-600">Employees</p>
              <p className="text-3xl font-bold text-green-600">
                {employees.length}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Handle sales and customer service
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 border border-yellow-100 bg-yellow-50 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-3">
            <Wrench className="w-8 h-8 text-yellow-600" />
            <div>
              <p className="text-sm text-yellow-600">Servicemen</p>
              <p className="text-3xl font-bold text-yellow-600">
                {servicemen.length}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600">Handle service and repairs</p>
        </motion.div>
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
            placeholder="Search staff by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* Staff Table */}
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

      {/* Add Staff Form */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Staff Member</DialogTitle>
          </DialogHeader>

          {/* Role Selection */}
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setEmployeeType("employee")}
              className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                employeeType === "employee"
                  ? "border-green-600 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Users
                className={`w-8 h-8 mx-auto mb-2 ${
                  employeeType === "employee"
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              />
              <p className="font-semibold">Employee</p>
              <p className="text-xs text-gray-600">Sales & Customer Service</p>
            </button>

            <button
              onClick={() => setEmployeeType("serviceman")}
              className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                employeeType === "serviceman"
                  ? "border-yellow-600 bg-yellow-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Wrench
                className={`w-8 h-8 mx-auto mb-2 ${
                  employeeType === "serviceman"
                    ? "text-yellow-600"
                    : "text-gray-400"
                }`}
              />
              <p className="font-semibold">Serviceman</p>
              <p className="text-xs text-gray-600">Service & Repairs</p>
            </button>
          </div>

          <form
            onSubmit={handleSubmit((data) => createStaffMutation.mutate(data))}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name *</Label>
                <Input {...register("first_name", { required: true })} />
                {errors.first_name && (
                  <p className="text-sm text-red-600">Required</p>
                )}
              </div>
              <div>
                <Label>Last Name *</Label>
                <Input {...register("last_name", { required: true })} />
                {errors.last_name && (
                  <p className="text-sm text-red-600">Required</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Email *</Label>
                <Input
                  type="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">Required</p>
                )}
              </div>
              <div>
                <Label>Phone *</Label>
                <Input {...register("phone", { required: true })} />
                {errors.phone && (
                  <p className="text-sm text-red-600">Required</p>
                )}
              </div>
            </div>

            <div>
              <Label>Password *</Label>
              <Input
                type="password"
                {...register("password", { required: true, minLength: 8 })}
              />
              {errors.password && (
                <p className="text-sm text-red-600">Min 8 characters</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={createStaffMutation.isPending}
            >
              {createStaffMutation.isPending
                ? "Adding..."
                : `Add ${employeeType === "employee" ? "Employee" : "Serviceman"}`}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DealerEmployees;
