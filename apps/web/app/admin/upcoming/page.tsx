"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/tabs";
import { CalendarIcon, ClockIcon, UsersIcon, PencilIcon } from "lucide-react";

const ContestPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto p-4 bg-gray-950 text-white min-h-screen">
      <div className="text-sm breadcrumbs mb-4">
        <ul className="text-blue-400">
          <li><a href="#">Contest</a></li>
          <li>Weekly Contest 101</li>
        </ul>
      </div>
      
      <Card className="bg-gray-900 border-gray-800 mb-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Weekly Contest 101</h1>
              <div className="flex items-center text-gray-400 space-x-4">
                <span className="flex items-center"><CalendarIcon className="mr-1" size={16} /> 30 August, 2024, 2:00 PM (IST)</span>
                <span className="flex items-center"><ClockIcon className="mr-1" size={16} /> 3 hours</span>
                <span className="flex items-center"><UsersIcon className="mr-1" size={16} /> 5,000 Participants</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="secondary" size="sm" className="bg-blue-600 text-white">
                Upcoming
              </Button>
              <Button variant="outline" size="sm" className="border-gray-700">
                <PencilIcon className="mr-1" size={16} /> Edit Contest
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-gray-900 border-gray-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="problems">Problems</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Contest Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Contest Description</h3>
                <p className="text-gray-400">Join our weekly coding contest and compete with programmers from around the world! This contest features a mix of algorithmic problems designed to challenge your coding skills.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Contest Rules</h3>
                <ul className="list-disc pl-5 text-gray-400 space-y-1">
                  <li>All submissions must be original work.</li>
                  <li>Participants may use any programming language.</li>
                  <li>Collaboration is not allowed during the contest.</li>
                  <li>The judge's decision is final.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="problems">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Contest Problems</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Two Sum", difficulty: "Easy", points: 120 },
                    { name: "Two Sum", difficulty: "Easy", points: 120 },
                    { name: "Two Sum", difficulty: "Hard", points: 120 },
                    { name: "Two Sum", difficulty: "Easy", points: 120 },
                  ].map((problem, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{problem.name}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          problem.difficulty === "Easy" ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"
                        }`}>
                          {problem.difficulty}
                        </span>
                      </TableCell>
                      <TableCell>{problem.points} pts</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <h3 className="text-xl font-semibold mb-2">This contest is not live yet</h3>
              <p className="text-gray-400 mb-4">Contest not live yet, explore other active contests.</p>
              <Button variant="outline" className="border-blue-600 text-blue-400">
                Go to contest page
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContestPage;