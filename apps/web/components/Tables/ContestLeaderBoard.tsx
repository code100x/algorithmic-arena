// ContestLeaderboard.tsx
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
import { TrophyIcon } from "lucide-react";
import PaginationComponent from "../Pagination";

const ContestLeaderboard: React.FC = () => {
  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);

  const contestLeaderboardData = Array.from({ length: 100 }, (_, index) => ({
    rank: index + 1,
    username: `@user${index + 1}`,
    totalScore: Math.floor(Math.random() * 1000) + 500,
    contestsParticipated: Math.floor(Math.random() * 20) + 1,
    problemsSolved: Math.floor(Math.random() * 100) + 50,
  }));

  const totalPages = Math.ceil(contestLeaderboardData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentContestData = contestLeaderboardData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-end w-full mb-4">
        <TrophyIcon width={20} height={20} className="mr-2" />
        <p className="text-grey-300">Total Contests: 20</p>
      </div>
      <div className="h-auto md:h-[1028px] w-full overflow-x-auto">
        <Table className="min-w-[640px]">
          <TableHeader>
            <TableRow className="bg-[#1e293b] border-b border-blueGray-900">
              <TableHead className="w-24 text-gray-300">Rank</TableHead>
              <TableHead className="w-24 hidden sm:table-cell text-blue-400">
                Username
              </TableHead>
              <TableHead className="w-24 hidden md:table-cell text-gray-300">
                Total Score
              </TableHead>
              <TableHead className="w-24 hidden lg:table-cell text-gray-300">
                Contests Participated
              </TableHead>
              <TableHead className="w-24 hidden xl:table-cell text-gray-300">
                Problems Solved
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentContestData.map((entry) => (
              <TableRow key={entry.rank} className="border-b border-gray-700">
                <TableCell className="text-blueGray-400">
                  {entry.rank}
                </TableCell>
                <TableCell className="text-blue-400 hidden sm:table-cell">
                  {entry.username}
                </TableCell>
                <TableCell className="text-blueGray-400 hidden md:table-cell">
                  {entry.totalScore}
                </TableCell>
                <TableCell className="text-blueGray-400 hidden lg:table-cell">
                  {entry.contestsParticipated}
                </TableCell>
                <TableCell className="text-blueGray-400 hidden xl:table-cell">
                  {entry.problemsSolved}
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
    </div>
  );
};

export default ContestLeaderboard;
