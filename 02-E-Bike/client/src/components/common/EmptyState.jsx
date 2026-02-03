import React from "react";
import { Package, FileX, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmptyState = ({
  icon: Icon = Inbox,
  title = "No data found",
  description = "Get started by creating a new item.",
  action,
  actionLabel = "Create New",
}) => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
      <div className="p-6 mb-4 bg-gray-100 rounded-full">
        <Icon className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="max-w-md mb-6 text-sm text-gray-500">{description}</p>
      {action && <Button onClick={action}>{actionLabel}</Button>}
    </div>
  );
};

export default EmptyState;
