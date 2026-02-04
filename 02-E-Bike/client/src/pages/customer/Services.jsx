import React, { useState } from "react";
import { motion } from "framer-motion";
import { Wrench, Plus, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { serviceService } from "@/api/serviceService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DataTable from "@/components/common/DataTable";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const CustomerServices = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["customer", "services"],
    queryFn: serviceService.getMyServices,
  });

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    assigned: "bg-blue-100 text-blue-800",
    in_progress: "bg-purple-100 text-purple-800",
    waiting_parts: "bg-orange-100 text-orange-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const columns = [
    {
      header: "Request #",
      accessorKey: "request_number",
      cell: ({ row }) => (
        <div>
          <p className="font-semibold">{row.original.request_number}</p>
          <p className="text-xs text-gray-500">
            {new Date(row.original.created_at).toLocaleDateString()}
          </p>
        </div>
      ),
    },
    {
      header: "Bike",
      accessorKey: "product_name",
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.product_name}</p>
          <p className="text-xs text-gray-500">{row.original.product_model}</p>
        </div>
      ),
    },
    {
      header: "Issue Type",
      accessorKey: "issue_type",
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.original.issue_type}
        </Badge>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <Badge className={statusColors[row.original.status]}>
          {row.original.status?.toUpperCase().replace("_", " ")}
        </Badge>
      ),
    },
    {
      header: "Serviceman",
      accessorKey: "serviceman_name",
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.serviceman_name || "Not assigned"}
        </span>
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
          <h1 className="text-3xl font-bold text-gray-900">My Services</h1>
          <p className="mt-1 text-gray-500">Track your service requests</p>
        </div>
        <Link to="/customer/services/book">
          <Button className="bg-gradient-to-r from-orange-600 to-red-600">
            <Plus className="w-4 h-4 mr-2" />
            Book Service
          </Button>
        </Link>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          {
            label: "Total Requests",
            value: data?.results?.length || 0,
            color: "blue",
          },
          {
            label: "Pending",
            value:
              data?.results?.filter((s) => s.status === "pending").length || 0,
            color: "yellow",
          },
          {
            label: "In Progress",
            value:
              data?.results?.filter((s) => s.status === "in_progress").length ||
              0,
            color: "purple",
          },
          {
            label: "Completed",
            value:
              data?.results?.filter((s) => s.status === "completed").length ||
              0,
            color: "green",
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
            placeholder="Search by request number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* Services Table */}
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
          <Wrench className="w-20 h-20 mx-auto mb-4 text-gray-300" />
          <h3 className="mb-2 text-2xl font-bold text-gray-600">
            No Service Requests
          </h3>
          <p className="mb-6 text-gray-500">Book a service for your bike</p>
          <Link to="/customer/services/book">
            <Button className="bg-gradient-to-r from-orange-600 to-red-600">
              <Plus className="w-4 h-4 mr-2" />
              Book Service
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default CustomerServices;
