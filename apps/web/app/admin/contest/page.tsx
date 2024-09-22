import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Input } from "@repo/ui/input";
import { Textarea } from "@repo/ui/textarea";
import { Button } from "@repo/ui/button";
import { Trash2, Calendar, Clock } from "lucide-react";

const ContestEditPage = () => {
  return (
    <div className="container mx-auto p-4 bg-gray-950 text-white min-h-screen">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className=" border-gray-800">
          <CardHeader className="bg-gray-900">
            <CardTitle>Contest Details</CardTitle>
            <p className="text-sm text-gray-400">
              Enter basic details about the contest
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label
                htmlFor="contest-name"
                className="block text-sm font-medium mb-1"
              >
                Contest Name
              </label>
              <Input
                id="contest-name"
                value="Weekly Contest 101"
                className=" border-gray-700"
              />
            </div>
            <div>
              <label
                htmlFor="contest-description"
                className="block text-sm font-medium mb-1"
              >
                Contest Description
              </label>
              <Textarea id="contest-description" className=" border-gray-700" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="start-date"
                  className="block text-sm font-medium mb-1"
                >
                  Start Date
                </label>
                <div className="relative">
                  <Input
                    id="start-date"
                    value="11-10-2024"
                    className=" border-gray-700 pl-10"
                  />
                  <Calendar
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="start-time"
                  className="block text-sm font-medium mb-1"
                >
                  Start Time
                </label>
                <div className="relative">
                  <Input
                    id="start-time"
                    value="09:00 AM"
                    className=" border-gray-700 pl-10"
                  />
                  <Clock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium mb-1"
              >
                Duration (hours)
              </label>
              <div className="relative">
                <Input
                  id="duration"
                  value="3"
                  className=" border-gray-700 pl-10"
                />
                <Clock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="contest-rules"
                className="block text-sm font-medium mb-1"
              >
                Contest Rules
              </label>
              <Textarea />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800">
          <CardHeader className="bg-gray-900">
            <CardTitle>Add Problems</CardTitle>
            <p className="text-sm text-gray-400">
              Choose problems from the available list to include in the contest.
            </p>
          </CardHeader>
          <CardContent className="space-y-4 mt-4">
            {[1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-800 p-3 rounded-md"
              >
                <div>
                  <p className="font-medium">Two Sum</p>
                  <p className="text-sm text-gray-400">Easy | 100 points</p>
                </div>
                <Button variant="ghost" size="icon" className="text-red-500">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full text-blue-400 border-blue-400"
            >
              + Add more problem
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <Button variant="outline" className="border-gray-700 text-white">
          Cancel
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
      </div>
    </div>
  );
};

export default ContestEditPage;
