"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/table";
import { Badge } from "@repo/ui/badge";
import { CheckCircle, Clock, Trash2 } from "lucide-react";
import PaginationComponent from "../Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/select";
import { Input } from "@repo/ui/input";

const BookmarksTable = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const bookmarksData = [
    {
      name: "24. Two Sum",
      difficulty: "Easy",
      points: "120 pts",
      status: "completed",
    },
    {
      name: "24. Two Sum",
      difficulty: "Medium",
      points: "120 pts",
      status: "not-started",
    },
    {
      name: "24. Two Sum",
      difficulty: "Hard",
      points: "120 pts",
      status: "in-progress",
    },
    {
      name: "24. Two Sum",
      difficulty: "Medium",
      points: "120 pts",
      status: "completed",
    },
    {
      name: "24. Two Sum",
      difficulty: "Hard",
      points: "120 pts",
      status: "not-started",
    },
    {
      name: "24. Two Sum",
      difficulty: "Medium",
      points: "120 pts",
      status: "completed",
    },
    {
      name: "24. Two Sum",
      difficulty: "Easy",
      points: "120 pts",
      status: "not-started",
    },
    // { name: "24. Two Sum", difficulty: "Hard", points: "120 pts", status: "in-progress" },
    // { name: "24. Two Sum", difficulty: "Easy", points: "120 pts", status: "completed" },
    // { name: "24. Two Sum", difficulty: "Hard", points: "120 pts", status: "not-started" },
  ];

  const totalPages = Math.ceil(bookmarksData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBookmarksData = bookmarksData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-500";
      case "medium":
        return "bg-orange-100 text-orange-600";
      case "hard":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <span className="h-5 w-5">-</span>;
    }
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto py-8 px-4 mb-6 dark:text-white text-black">
      <div className="flex space-x-4 mb-6">
        <Select>
          <SelectTrigger className="w-[150px] text-gray-500 border-gray-800">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[150px] text-gray-500 border-gray-800">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="not-started">Not Started</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[150px] text-gray-500 border-gray-800">
            <SelectValue placeholder="Topics" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="arrays">Arrays</SelectItem>
            <SelectItem value="strings">Strings</SelectItem>
            <SelectItem value="dynamic-programming">
              Dynamic Programming
            </SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="search"
          placeholder="Search.."
          className="flex-grow border-gray-800"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-800">
            <TableHead className="text-gray-500">Name</TableHead>
            <TableHead className="text-gray-500">Difficulty</TableHead>
            <TableHead className="text-gray-500">Points</TableHead>
            <TableHead className="text-gray-500">Status</TableHead>
            <TableHead className="text-gray-500">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentBookmarksData.map((bookmark, index) => (
            <TableRow key={index} className="border-b border-gray-800">
              <TableCell className="font-medium">{bookmark.name}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={`${getDifficultyColor(bookmark.difficulty)}`}
                >
                  {bookmark.difficulty}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={"secondary"} className="text-gray-500">
                  {bookmark.points}
                </Badge>
              </TableCell>
              <TableCell>{getStatusIcon(bookmark.status)}</TableCell>
              <TableCell>
                <Trash2 className="h-5 w-5 text-red-500 cursor-pointer" />
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
    </div>
  );
};

export default BookmarksTable;
