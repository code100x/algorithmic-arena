"use client";

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
import { Search, ChevronDown, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu";

interface Contest {
  name: string;
  status: string;
  startDate: string;
  totalTime: string;
  duration: string;
  participants: number;
  featured: boolean;
}

const AdminContestsTable: React.FC<{ contests: Contest[] }> = ({
  contests,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState<"Newest" | "Oldest">("Newest");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
  };

  const handleSortOrder = () => {
    setSortOrder(sortOrder === "Newest" ? "Oldest" : "Newest");
  };

  // Filter and sort contests by search term and status
  const filteredContests = contests
    .filter((contest) => {
      const matchesSearchTerm = contest.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        selectedStatus === "All" || contest.status === selectedStatus;
      return matchesSearchTerm && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOrder === "Newest") {
        return (
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
      } else {
        return (
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
      }
    });

  return (
    <div>
      {/* Search and Filter Section */}
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
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="flex space-x-2 items-center">
          {/* Status Dropdown using shadcn */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-gray-900 text-white flex items-center"
              >
                Status: {selectedStatus}{" "}
                <ChevronDown className="ml-2" size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleStatusFilter("All")}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilter("Upcoming")}>
                Upcoming
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilter("Active")}>
                Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilter("Ended")}>
                Ended
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort Button */}
          <Button
            variant="outline"
            className="bg-gray-900 text-white flex items-center"
            onClick={handleSortOrder}
          >
            {sortOrder} <ChevronDown className="ml-2" size={16} />
          </Button>
        </div>
      </div>

      {/* Contests Table */}
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
          {filteredContests.map((contest, index) => (
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
    </div>
  );
};

export default AdminContestsTable;
