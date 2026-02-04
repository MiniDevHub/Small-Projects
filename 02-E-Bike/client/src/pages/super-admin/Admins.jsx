import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Shield, Trash2 } from "lucide-react";
import {
  useAllAdmins,
  useCreateAdmin,
  useDeleteAdmin,
} from "@/hooks/useSuperAdmin";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/common/DataTable";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

const SuperAdminAdmins = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data, isLoading } = useAllAdmins();
  const createAdmin = useCreateAdmin();
  const deleteAdmin = useDeleteAdmin();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      await createAdmin.mutateAsync(formData);
      setIsFormOpen(false);
      reset();
    } catch {
      // Error handled by mutation hook
    }
  };

  const handleDelete = async (adminId) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      await deleteAdmin.mutateAsync(adminId);
    }
  };

  const columns = [
    {
      header: "Admin",
      accessorKey: "email",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
            {row.original.first_name?.[0] || "A"}
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
    {
      header: "Actions",
      cell: ({ row }) => (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => handleDelete(row.original.id)}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      ),
    },
  ];

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Management</h1>
          <p className="mt-1 text-gray-500">
            Create and manage system administrators
          </p>
        </div>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Admin
        </Button>
      </motion.div>

      {/* Admin Count & Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-600" />
            <p className="text-sm text-gray-600">
              Total Admins:{" "}
              <span className="font-semibold text-gray-900">
                {data?.count || 0}
              </span>
            </p>
          </div>
        </div>
        <DataTable data={data?.admins || []} columns={columns} />
      </motion.div>

      {/* Create Admin Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-600" />
              Create New Admin
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name">First Name *</Label>
                <Input
                  id="first_name"
                  placeholder="John"
                  {...register("first_name", { required: true })}
                />
                {errors.first_name && (
                  <p className="mt-1 text-sm text-red-600">Required</p>
                )}
              </div>
              <div>
                <Label htmlFor="last_name">Last Name *</Label>
                <Input
                  id="last_name"
                  placeholder="Doe"
                  {...register("last_name", { required: true })}
                />
                {errors.last_name && (
                  <p className="mt-1 text-sm text-red-600">Required</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">Required</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                placeholder="+91 9876543210"
                {...register("phone", { required: true })}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">Required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                placeholder="Min 8 characters"
                {...register("password", { required: true, minLength: 8 })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  Minimum 8 characters required
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirm_password">Confirm Password *</Label>
              <Input
                id="confirm_password"
                type="password"
                placeholder="Re-enter password"
                {...register("confirm_password", {
                  required: true,
                  validate: (value, formValues) =>
                    value === formValues.password || "Passwords must match",
                })}
              />
              {errors.confirm_password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirm_password.message || "Required"}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                disabled={createAdmin.isPending}
              >
                {createAdmin.isPending ? "Creating..." : "Create Admin"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsFormOpen(false);
                  reset();
                }}
                disabled={createAdmin.isPending}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuperAdminAdmins;
