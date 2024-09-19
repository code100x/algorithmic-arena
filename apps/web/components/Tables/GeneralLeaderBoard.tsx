// GeneralLeaderboard.tsx
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
import PaginationComponent from "../Pagination";

const GeneralLeaderboard: React.FC = () => {
  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);

  const generalLeaderboardData = Array.from({ length: 100 }, (_, index) => ({
    rank: index + 1,
    username: `@anupsingh${index + 1}`,
    score: "120 pts",
    problemsSolved: 20,
    totalSubmissions: 256,
  }));

  const totalPages = Math.ceil(generalLeaderboardData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentGeneralData = generalLeaderboardData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-auto md:h-[1028px] w-full overflow-x-auto">
      <Table className="min-w-[640px]">
        <TableHeader>
          <TableRow className="bg-[#1e293b] border-b border-blueGray-900">
            <TableHead className="w-24 text-gray-300">Rank</TableHead>
            <TableHead className="w-24 hidden sm:table-cell text-gray-300">
              Username
            </TableHead>
            <TableHead className="w-24 hidden md:table-cell text-gray-300">
              Overall Score
            </TableHead>
            <TableHead className="w-24 hidden lg:table-cell text-gray-300">
              Problems Solved
            </TableHead>
            <TableHead className="w-24 hidden xl:table-cell text-gray-300">
              Total Submissions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentGeneralData.map((entry) => (
            <TableRow key={entry.rank} className="border-b border-gray-700">
              <TableCell className="text-blueGray-400">{entry.rank}</TableCell>
              <TableCell className="text-blue-400 hidden sm:table-cell">
                {entry.username}
              </TableCell>
              <TableCell className="text-blueGray-400 hidden md:table-cell">
                {entry.score}
              </TableCell>
              <TableCell className="text-blueGray-400 hidden lg:table-cell">
                {entry.problemsSolved}
              </TableCell>
              <TableCell className="text-blueGray-400 hidden xl:table-cell">
                {entry.totalSubmissions}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-start mt-2">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default GeneralLeaderboard;
