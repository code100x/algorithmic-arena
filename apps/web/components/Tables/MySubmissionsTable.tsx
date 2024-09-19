"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/select";
import { Input } from "@repo/ui/input";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import PaginationComponent from "../Pagination";

const MySubmissionsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const submissionData = [
    {
      problemName: "Two Sum",
      status: "Accepted",
      submittedAt: "21 August, 2024 10:22 AM",
      language: "cpp",
      runtime: "14ms",
      memory: "12mb",
    },
    {
      problemName: "Two Sum",
      status: "Incorrect",
      submittedAt: "21 August, 2024 10:22 AM",
      language: "cpp",
      runtime: "N/A",
      memory: "N/A",
    },
    {
      problemName: "Two Sum",
      status: "Accepted",
      submittedAt: "21 August, 2024 10:22 AM",
      language: "cpp",
      runtime: "14ms",
      memory: "12mb",
    },
    {
      problemName: "Two Sum",
      status: "Incorrect",
      submittedAt: "21 August, 2024 10:22 AM",
      language: "cpp",
      runtime: "N/A",
      memory: "N/A",
    },
    {
      problemName: "Two Sum",
      status: "Accepted",
      submittedAt: "21 August, 2024 10:22 AM",
      language: "cpp",
      runtime: "14ms",
      memory: "12mb",
    },
    {
      problemName: "Two Sum",
      status: "Incorrect",
      submittedAt: "21 August, 2024 10:22 AM",
      language: "cpp",
      runtime: "N/A",
      memory: "N/A",
    },
    {
      problemName: "Two Sum",
      status: "Accepted",
      submittedAt: "21 August, 2024 10:22 AM",
      language: "cpp",
      runtime: "14ms",
      memory: "12mb",
    },
    {
      problemName: "Two Sum",
      status: "Incorrect",
      submittedAt: "21 August, 2024 10:22 AM",
      language: "cpp",
      runtime: "N/A",
      memory: "N/A",
    },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="dark:bg-slate-900 bg-slate-100 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex flex-row items-center">
              <Clock className="h-4 w-4 text-muted-foreground mr-2" />
              Total Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">400</div>
          </CardContent>
        </Card>

        <Card className="dark:bg-slate-900 bg-slate-100 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-500 flex flex-row items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Accepted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50</div>
          </CardContent>
        </Card>

        <Card className="dark:bg-slate-900 bg-slate-100 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex flex-row items-center text-red-500">
              <XCircle className="h-4 w-4 text-red-500 mr-2" />
              Incorrect
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters Section */}
      <div className="flex space-x-4 mb-6">
        <Select>
          <SelectTrigger className="w-[180px] text-gray-500 border-gray-800">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cpp">C++</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px] text-gray-500 border-gray-800">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="incorrect">Incorrect</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="search"
          placeholder="Search..."
          className="flex-grow border-gray-800"
        />
      </div>

      {/* Submissions Table */}
      <Table>
        <TableHeader>
          <TableRow className="border-b bg-[#1e293b] border-gray-800">
            <TableHead className="text-gray-400">Problem Name</TableHead>
            <TableHead className="text-gray-400">Status</TableHead>
            <TableHead className="text-gray-400">Language</TableHead>
            <TableHead className="text-gray-400">Runtime</TableHead>
            <TableHead className="text-gray-400">Memory</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissionData.map((submission, index) => (
            <TableRow key={index} className="border-b border-gray-800">
              <TableCell className="font-medium text-gray-500">
                {submission.problemName}
              </TableCell>
              <TableCell
                className={`${
                  submission.status === "Accepted"
                    ? "text-green-500"
                    : submission.status === "Incorrect"
                      ? "text-red-500"
                      : "text-red-500"
                }`}
              >
                {submission.status}
                <span className="text-gray-500 text-xs ml-2">
                  Submitted at {submission.submittedAt}
                </span>
              </TableCell>
              <TableCell className="text-gray-500">{submission.language}</TableCell>
              <TableCell className="text-gray-500">{submission.runtime}</TableCell>
              <TableCell className="text-gray-500">{submission.memory}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default MySubmissionsTable;
