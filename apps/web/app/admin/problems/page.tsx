import React from 'react';
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/table";
import { PlusCircle, Search, ChevronDown, Trash2 } from 'lucide-react';
import { Badge } from '@repo/ui/badge';
import Link from 'next/link';

const ProblemManagementDashboard = () => {
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

  const getDifficultyColor = (difficulty: any) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-500';
      case 'Medium': return 'bg-orange-200 text-orange-500';
      case 'Hard': return 'bg-red-200 text-red-500';
      default: return 'bg-gray-500 text-white';
    }
  };



  return (
    <div className="px-28 pt-8 pb-14 min-h-screen">
      <div className=" flex justify-between items-center mb-6">
        <div className="text-slate-50 text-[32px] font-bold leading-10">
          All Problems
        </div>
        <Link href="/admin/new-problem">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <PlusCircle className="mr-2" size={20} />
          Add New Problem
        </Button>
        </Link>
      </div>
      <div className="mb-4 flex justify-end space-x-2">
      <div className="relative w-1/3">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <Input type="text" placeholder="Search problems..." className="pl-10 bg-gray-900 text-white" />
        </div>
        <Button variant="outline" className="bg-gray-900 text-white">
          Difficulty <ChevronDown className="ml-2" size={16} />
        </Button>
        <Button variant="outline" className="bg-gray-900 text-white">
          Topic <ChevronDown className="ml-2" size={16} />
        </Button>
        <Button variant="outline" className="bg-gray-900 text-white">
          Type <ChevronDown className="ml-2" size={16} />
        </Button>
      </div>
      <Table className='border rounded'>
        <TableHeader className='bg-slate-800'>
          <TableRow >
            <TableHead>Name</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Points</TableHead>
            <TableHead>Submissions</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problems.map((problem, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{problem.name}</TableCell>
              <TableCell>
                <Badge variant={'secondary'} className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(problem.difficulty)}`}>
                  {problem.difficulty}
                </Badge>
              </TableCell>
              <TableCell>{problem.points}</TableCell>
              <TableCell>{problem.submissions}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" color='#DD503F' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-center">
        <Button variant="outline" className="mx-1">&lt;</Button>
        <Button variant="outline" className="mx-1 bg-blue-600 text-white">1</Button>
        <Button variant="outline" className="mx-1">2</Button>
        <Button variant="outline" className="mx-1">...</Button>
        <Button variant="outline" className="mx-1">9</Button>
        <Button variant="outline" className="mx-1">10</Button>
        <Button variant="outline" className="mx-1 ">&gt;</Button>
      </div>
    </div>
  );
};

export default ProblemManagementDashboard;