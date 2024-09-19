import React from "react";
import { Card, CardContent, CardHeader } from "@repo/ui/card";
import { Button } from "@repo/ui/button";

const RecentProblems = () => {
  const items = [
    { title: "Two Sum", time: "1 hour ago" },
    { title: "Two Sum", time: "1 hour ago" },
    { title: "Two Sum", time: "1 hour ago" },
    { title: "Two Sum", time: "1 hour ago" },
    { title: "Two Sum", time: "1 hour ago" },
  ];

  return (
    <Card className="max-w-full w-[903px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h2 className="text-lg font-bold">Recent Submissions</h2>
        <Button variant="ghost" className="flex justify-end">
          <a href="#" className="text-sm text-blue-500 hover:underline">
            View all
          </a>
        </Button>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={index}
              className="border flex rounded-lg p-3 justify-between items-center"
            >
              <span>{item.title}</span>
              <span className="text-sm text-gray-400">{item.time}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecentProblems;
