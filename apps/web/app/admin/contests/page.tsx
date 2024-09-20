"use client"

import React, { useState } from "react";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/table";
import { Switch } from "@repo/ui/switch";
import { PlusCircle, Search, ChevronDown, Trash2 } from "lucide-react";
import PaginationComponent from "../../../components/Pagination";

const ContestsAmdin = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);



  const contests = [
    {
      name: " Contest 101",
      status: "Upcoming",
      startDate: "25-08-2024",
      totalTime: "9:05 AM",
      duration: "2 hours",
      participants: 1200,
      featured: false,
    },
    {
      name: " Contest 101",
      status: "Active",
      startDate: "25-08-2024",
      totalTime: "9:05 AM",
      duration: "2 hours",
      participants: 1200,
      featured: true,
    },
    {
      name: " Contest 101",
      status: "Upcoming",
      startDate: "25-08-2024",
      totalTime: "9:05 AM",
      duration: "2 hours",
      participants: 1200,
      featured: false,
    },
    {
      name: " Contest 101",
      status: "Upcoming",
      startDate: "25-08-2024",
      totalTime: "9:05 AM",
      duration: "2 hours",
      participants: 1200,
      featured: false,
    },
    {
      name: " Contest 101",
      status: "Upcoming",
      startDate: "25-08-2024",
      totalTime: "9:05 AM",
      duration: "2 hours",
      participants: 1200,
      featured: false,
    },
    {
      name: " Contest 101",
      status: "Upcoming",
      startDate: "25-08-2024",
      totalTime: "9:05 AM",
      duration: "2 hours",
      participants: 1200,
      featured: false,
    },
    {
      name: " Contest 101",
      status: "Upcoming",
      startDate: "25-08-2024",
      totalTime: "9:05 AM",
      duration: "2 hours",
      participants: 1200,
      featured: false,
    },
    {
      name: " Contest 101",
      status: "Ended",
      startDate: "25-08-2024",
      totalTime: "9:05 AM",
      duration: "2 hours",
      participants: 1200,
      featured: false,
    },
    {
      name: " Contest 101",
      status: "Upcoming",
      startDate: "25-08-2024",
      totalTime: "9:05 AM",
      duration: "2 hours",
      participants: 1200,
      featured: false,
    },
    {
      name: " Contest 101",
      status: "Upcoming",
      startDate: "25-08-2024",
      totalTime: "9:05 AM",
      duration: "2 hours",
      participants: 1200,
      featured: false,
    },
  ];

  const totalPages = Math.ceil(contests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBookmarksData = contests.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="px-28 py-8 pb-6  min-h-screen">

      <div className=" flex mb-6 justify-between items-center">
        <div className="text-slate-50 text-[32px] font-bold leading-10">
          Contests
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-slate-50">
          <PlusCircle className="mr-2" size={20} />
          Create New Contest
        </Button>
      </div>

      <div className="mb-5 flex justify-between space-x-2">
        <div className="relative w-1/3">
          <Search
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={20}
          />
          <Input
            type="text"
            placeholder="Search contests..."
            className="pl-10 bg-gray-900 text-white"
          />
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="bg-gray-900 text-white mr-2">
            Status <ChevronDown className="ml-2" size={16} />
          </Button>
          <Button variant="outline" className="bg-gray-900 text-white">
            Newest <ChevronDown className="ml-2" size={16} />
          </Button>
        </div>

      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Contest Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Total Time</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Participants</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contests.map((contest, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{contest.name}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    contest.status === "Active"
                      ? "bg-green-500 text-white"
                      : contest.status === "Ended"
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {contest.status}
                </span>
              </TableCell>
              <TableCell>{contest.startDate}</TableCell>
              <TableCell>{contest.totalTime}</TableCell>
              <TableCell>{contest.duration}</TableCell>
              <TableCell>{contest.participants}</TableCell>
              <TableCell>
                <Switch checked={contest.featured} />
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
};

export default ContestsAmdin;
