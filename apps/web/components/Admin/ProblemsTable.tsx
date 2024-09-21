import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/table";
import { Badge } from "@repo/ui/badge";
import { Button } from "@repo/ui/button";
import { Trash2 } from "lucide-react";

interface ProblemsTableProps {
  problems: {
    name: string;
    difficulty: string;
    points: string;
    submissions: number;
  }[];
  currentPage: number;
  itemsPerPage: number;
}

const ProblemsTable: React.FC<ProblemsTableProps> = ({
  problems,
  currentPage,
  itemsPerPage,
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-[rgba(34,197,94,0.1)] text-green-600";
      case "Medium":
        return "bg-[rgba(234,88,12,0.1)] text-orange-500";
      case "Hard":
        return "bg-[rgba(239,68,68,0.1)] text-red-500";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <Table className="border rounded-md">
      <TableHeader className="bg-slate-800">
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Difficulty</TableHead>
          <TableHead>Points</TableHead>
          <TableHead>Submissions</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {problems.slice(startIndex, endIndex).map((problem, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{problem.name}</TableCell>
            <TableCell>
              <Badge
                variant={"outline"}
                className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(problem.difficulty)}`}
              >
                {problem.difficulty}
              </Badge>
            </TableCell>
            <TableCell>{problem.points}</TableCell>
            <TableCell>{problem.submissions}</TableCell>
            <TableCell>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" color="#DD503F" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProblemsTable;
