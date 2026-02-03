import React from "react";
import { Wrench, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CustomerServices = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Service Booking</h1>
        <p className="mt-2 text-gray-600">Book service for your bikes</p>
      </div>

      {/* Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="w-5 h-5" />
            Service Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-12 text-center">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="mb-4 text-gray-500">Service booking module</p>
            <p className="mb-6 text-sm text-gray-400">
              Select a bike, choose service type, and schedule your appointment
            </p>
            <Button>
              <Wrench className="w-5 h-5 mr-2" />
              Book Service
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerServices;
