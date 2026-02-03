import React from "react";
import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EmployeeSales = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create Sale</h1>
        <p className="mt-2 text-gray-600">Generate invoices for customers</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Sales Interface
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-12 text-center">
            <p className="text-gray-500">
              Sales interface (same as dealer sales page)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeSales;
