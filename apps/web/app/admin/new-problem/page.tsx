"use client"
import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu";
import { ArrowLeft, ChevronDown, Check } from "lucide-react";
import { cn } from "../../../../../packages/ui/src/@/lib/utils";
import { Button } from "@repo/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { Switch } from "@repo/ui/switch";
import { Input } from "@repo/ui/input";
import ProblemConstraintsEditor from "../../../components/TextTool";

const DifficultyDropdown = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedPoints, setSelectedPoints] = useState<string | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<string | null>(null);

  const difficultyLevels = ["Easy", "Medium", "Hard"];
  const pointsLabel = ["1", "3", "5"];
  const selectedTopicsList = ["Arrays", "Strings", "Linked List", "Graphs", "Sorting"]

  return (
    <div className="flex flex-row justify-center space-y-4">
      {/* Difficulty Dropdown */}
      <div className="space-y-2">
        <label htmlFor="difficulty-dropdown" className="text-sm font-medium text-slate-50">
          Difficulty
        </label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button id="difficulty-dropdown" variant="outline" className="flex items-center space-x-2">
              <span>{selectedDifficulty ? selectedDifficulty : "Select Difficulty"}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {difficultyLevels.map((level, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => setSelectedDifficulty(level)}
                className={selectedDifficulty === level ? "text-blue-500" : ""}
              >
                {level}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Points Dropdown */}
      <div className="space-y-2">
        <label htmlFor="points-dropdown" className="text-sm font-medium text-slate-50">
          Points
        </label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button id="points-dropdown" variant="outline" className="flex items-center space-x-2">
              <span>{selectedPoints ? selectedPoints : "Select Points"}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {pointsLabel.map((point, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => setSelectedPoints(point)}
                className={selectedPoints === point ? "text-blue-500" : ""}
              >
                {point}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>


<div>
      <div className="space-y-2">
        <label htmlFor="points-dropdown" className="text-sm font-medium text-slate-50">
          Topics
        </label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button id="points-dropdown" variant="outline" className="flex items-center space-x-2">
              <span>{selectedPoints ? selectedPoints : "Select Topics"}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {selectedTopicsList.map((topic, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => setSelectedPoints(topic)}
                className={selectedPoints === topic ? "text-blue-500" : ""}
              >
                {topic}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
</div>
  );
};

// CardDemo component for Problem details
const CardDemo = ({ className, ...props }: React.ComponentProps<typeof Card>) => {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle className="font-bold">Problem details</CardTitle>
        <CardDescription className="border-b-2">
          Enter Basic Details about Problem.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="space-y-2">
          <label htmlFor="problem-name" className="text-sm font-medium text-slate-50">Problem Name</label>
          <Input
            id="problem-name"
            type="text"
            placeholder="Enter Problem Name"
            className="border-gray-700 text-white w-full"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="problem-description" className="text-sm font-medium text-slate-50">Problem Description</label>
          <Input
            id="problem-description"
            type="text"
            placeholder="Enter Problem Description"
            className="border-gray-700 text-white w-full h-24"
          />
        </div>

        {/* DifficultyDropdown */}
        <DifficultyDropdown />
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Check className="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  );
};

type Props = {}

// Main Page Component
const Page = (props: Props) => {
  return (
    <div className="px-28 pt-8 pb-14 min-h-screen">
      <div className="flex flex-col justify-start items-start mb-6 space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/problems" className="text-blue-500">
                Problems
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-400">
                Create New Problem
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Title with Arrow */}
        <div className="flex items-center text-gray-400 space-x-4">
          <ArrowLeft className="mt-1" width={16} height={16} />
          <div className="text-slate-50 text-[32px] font-bold leading-10">
            Create New Problem
          </div>
        </div>

        {/* Card Demo with Problem Details */}
        <div className="border p-4">
          <CardDemo />
          <ProblemConstraintsEditor />
          
          {/* Mark as Contest Problem Switch */}
          <div className="flex items-center space-x-4 mt-6">
            <Switch />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Mark as Contest Problem
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
