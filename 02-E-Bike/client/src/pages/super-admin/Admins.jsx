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
import toast from "react-hot-toast";

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
    } catch (error) {
      // Error handled by mutation
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
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
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
          <h1 className="text-3xl font-bold text-gray-900">Admin Management</h1>
          <p className="mt-1 text-gray-500">
            Create and manage system administrators
          </p>
        </div>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Admin
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DataTable data={data?.results || []} columns={columns} />
      </motion.div>

      {/* Create Admin Form */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Create New Admin
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            <div>
              <Label>Email *</Label>
              <Input type="email" {...register("email", { required: true })} />
              {errors.email && <p className="text-sm text-red-600">Required</p>}
            </div>
            <div>
              <Label>Phone *</Label>
              <Input {...register("phone", { required: true })} />
              {errors.phone && <p className="text-sm text-red-600">Required</p>}
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
              disabled={createAdmin.isPending}
            >
              {createAdmin.isPending ? "Creating..." : "Create Admin"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuperAdminAdmins;
