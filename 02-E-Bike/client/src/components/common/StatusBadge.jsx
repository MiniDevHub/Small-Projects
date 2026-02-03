import React from "react";
import { cn } from "@/utils/cn";
import { getStatusColor } from "@/utils/formatters";

const StatusBadge = ({ status, className }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        getStatusColor(status),
        className,
      )}
    >
      {status.replace(/_/g, " ").toUpperCase()}
    </span>
  );
};

export default StatusBadge;
