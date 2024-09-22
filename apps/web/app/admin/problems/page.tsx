"use client"

import React, { useState } from "react";
import Link from "next/link";
import { Button} from "@repo/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@repo/ui/dropdown-menu"
import { PlusCircle, ChevronDown, Search } from "lucide-react";
import { Input } from "@repo/ui/input";
import PaginationComponent from "../../../components/Pagination";
import ProblemsTable from "../../../components/Admin/ProblemsTable";

const ProblemManagementPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null); 
  const itemsPerPage = 10;

  const problems = [
    { name: "24 Two Sum", difficulty: "Easy", points: "120 pts", submissions: 400 },
    { name: "24 Two Sum", difficulty: "Easy", points: "120 pts", submissions: 400 },
    { name: "24 Two Sum", difficulty: "Hard", points: "120 pts", submissions: 400 },
    { name: "24 Two Sum", difficulty: "Easy", points: "120 pts", submissions: 400 },
    { name: "24 Two Sum", difficulty: "Hard", points: "120 pts", submissions: 400 },
    { name: "24 Two Sum", difficulty: "Easy", points: "120 pts", submissions: 400 },
    { name: "24 Two Sum", difficulty: "Medium", points: "120 pts", submissions: 400 },
    { name: "24 Two Sum", difficulty: "Medium", points: "120 pts", submissions: 400 },
    { name: "24 Two Sum", difficulty: "Easy", points: "120 pts", submissions: 400 },
    { name: "24 Two Sum", difficulty: "Easy", points: "120 pts", submissions: 400 },
  ];

  const filteredProblems = selectedDifficulty
    ? problems.filter((problem) => problem.difficulty === selectedDifficulty)
    : problems;

  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="px-28 pt-8 pb-14 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div className=" text-[32px] font-bold leading-10">
          All Problems
        </div>
        <Link href="/admin/new-problem">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <PlusCircle className="mr-2" size={20} />
            Add New Problem
          </Button>
        </Link>
      </div>

      <div className="mb-4 flex justify-between space-x-2">
        <div className="relative w-1/3">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <Input type="text" placeholder="Search problems..." className="pl-10 text-white" />
        </div>

        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Difficulty <ChevronDown className="ml-2" size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedDifficulty(null)}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedDifficulty('Easy')}>
                Easy
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedDifficulty('Medium')}>
                Medium
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedDifficulty('Hard')}>
                Hard
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" >
            Topic <ChevronDown className="ml-2" size={16} />
          </Button>
          <Button variant="outline">
            Type <ChevronDown className="ml-2" size={16} />
          </Button>
        </div>
      </div>

      <ProblemsTable problems={filteredProblems} currentPage={currentPage} itemsPerPage={itemsPerPage} />

      <div className="mt-4 flex justify-center">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProblemManagementPage;
