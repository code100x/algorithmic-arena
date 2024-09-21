"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Popover, PopoverTrigger, PopoverContent } from "@repo/ui/popover";
import { Input } from "@repo/ui/input";
import { Textarea } from "@repo/ui/textarea";
import { Button } from "@repo/ui/button";
import { Trash2, Calendar as CalendarIcon, Save } from "lucide-react";
import { Calendar } from "@repo/ui/calendar";
import { format } from "date-fns";

const CreateContest = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div className="grid md:grid-cols-2 gap-6 h-[696px] text-gray-300">
      <Card className="text-white">
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
            <Input id="contest-name" placeholder="Enter contest name" />
          </div>
          <div>
            <label
              htmlFor="contest-description"
              className="block text-sm font-medium mb-1"
            >
              Contest Description
            </label>
            <Textarea
              id="contest-description"
              placeholder="Describe the contest"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="start-date"
                className="block text-sm font-medium mb-1"
              >
                Start Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${
                      !date ? "text-gray-400" : ""
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(day) => setDate(day || undefined)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label
                htmlFor="start-time"
                className="block text-sm font-medium mb-1"
              >
                Start Time
              </label>
              <Input id="start-time" placeholder="--:-- AM" />
            </div>
          </div>
          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium mb-1"
            >
              Duration (hours)
            </label>
            <Input id="duration" placeholder="eg. 2 hours" />
          </div>
          <div>
            <label
              htmlFor="contest-rules"
              className="block text-sm font-medium mb-1"
            >
              Contest Rules
            </label>
            <Textarea id="contest-rules" placeholder="Enter contest rules" />
          </div>
        </CardContent>
      </Card>

      <Card className="text-white">
        <CardHeader className="bg-gray-900">
          <CardTitle>Add Problems</CardTitle>
          <p className="text-sm text-gray-400">
            Choose problems from the available list to include in the contest.
          </p>
        </CardHeader>
        <CardContent className="space-y-4 p-4">
          {[1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              className="flex items-center border-2 justify-between bg-blueGray-900 p-3 rounded-md h-20"
            >
              <div>
                <p className="font-medium">Problem Name</p>
                <p className="text-sm text-gray-400">Easy | 100 points</p>
              </div>
              <Button variant="secondary" size="icon">
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
          <Button variant="outline" className="w-48">
            + Add more problem
          </Button>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end space-x-4 col-span-2">
        <Button variant="destructive">Cancel</Button>
        <Button className="bg-blue-600 text-white">
          <Save className="mr-2" /> Create Contest
        </Button>
      </div>
    </div>
  );
};

export default CreateContest;
