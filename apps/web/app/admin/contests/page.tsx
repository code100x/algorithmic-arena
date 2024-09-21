"use client";

import React, { useState } from "react";
import { Button } from "@repo/ui/button";
import PaginationComponent from "../../../components/Pagination";
import AdminContestsTable from "../../../components/Admin/AdminContestsTable";
import Link from "next/link";
import { PlusCircleIcon, PlusIcon } from "lucide-react";

const ContestsAdminPage = () => {
  const itemsPerPage = 8;
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
  const currentContests = contests.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="px-28 py-8 pb-6 min-h-screen">
      <div className="flex mb-6 justify-between items-center">
        <div className="text-slate-50 text-[32px] font-bold leading-10">
          Contests
        </div>
        <Link href="/admin/new-contest">
          <Button className="bg-blue-600 hover:bg-blue-700 text-slate-50">
            <PlusIcon className="pr-1" />
            Create New Contest
          </Button>
        </Link>
      </div>

      <AdminContestsTable contests={currentContests} />

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
};

export default ContestsAdminPage;
