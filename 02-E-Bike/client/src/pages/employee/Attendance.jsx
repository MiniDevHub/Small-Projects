import React from "react";
import { Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EmployeeAttendance = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Attendance</h1>
        <p className="mt-2 text-gray-600">
          Clock in/out and view your attendance records
        </p>
      </div>

      {/* Clock In/Out Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Today's Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="mb-4 text-center">
              <p className="text-sm text-gray-600">Current Status</p>
              <p className="text-2xl font-bold text-gray-900">Not Clocked In</p>
            </div>
            <div className="flex gap-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <Clock className="w-5 h-5 mr-2" />
                Clock In
              </Button>
              <Button size="lg" variant="outline" disabled>
                <Clock className="w-5 h-5 mr-2" />
                Clock Out
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Attendance History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-12 text-center text-gray-500">
            No attendance records yet
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeAttendance;
