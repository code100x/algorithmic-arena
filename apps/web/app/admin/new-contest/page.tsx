import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Input } from "@repo/ui/input";
import { Textarea } from "@repo/ui/textarea";
import { Button } from "@repo/ui/button";
import { Trash2 } from "lucide-react";

const CreateContestPage = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="text-sm breadcrumbs mb-4">
        <ul>
          <li><a href="#">Contest</a></li>
          <li>Create New Contest</li>
        </ul>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gray-900 text-white">
          <CardHeader>
            <CardTitle>Contest Details</CardTitle>
            <p className="text-sm text-gray-400">Enter basic details about the contest</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="contest-name" className="block text-sm font-medium mb-1">Contest Name</label>
              <Input id="contest-name" placeholder="Enter contest name" className="bg-gray-800" />
            </div>
            <div>
              <label htmlFor="contest-description" className="block text-sm font-medium mb-1">Contest Description</label>
              <Textarea id="contest-description" placeholder="Describe the contest" className="bg-gray-800" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="start-date" className="block text-sm font-medium mb-1">Start Date</label>
                <Input id="start-date" placeholder="dd-mm-yyyy" className="bg-gray-800" />
              </div>
              <div>
                <label htmlFor="start-time" className="block text-sm font-medium mb-1">Start Time</label>
                <Input id="start-time" placeholder="--:-- AM" className="bg-gray-800" />
              </div>
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium mb-1">Duration (hours)</label>
              <Input id="duration" placeholder="eg. 2 hours" className="bg-gray-800" />
            </div>
            <div>
              <label htmlFor="contest-rules" className="block text-sm font-medium mb-1">Contest Rules</label>
              <Textarea id="contest-rules" placeholder="Enter contest rules" className="bg-gray-800" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 text-white">
          <CardHeader>
            <CardTitle>Add Problems</CardTitle>
            <p className="text-sm text-gray-400">Choose problems from the available list to include in the contest.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-800 p-3 rounded-md">
                <div>
                  <p className="font-medium">Problem Name</p>
                  <p className="text-sm text-gray-400">Easy | 100 points</p>
                </div>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" className="w-full">+ Add more problem</Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button>Create Contest</Button>
      </div>
    </div>
  );
};

export default CreateContestPage;