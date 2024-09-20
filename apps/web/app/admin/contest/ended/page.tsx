import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/table"

const ContestDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Weekly Contest 101</h1>
        <div className="text-sm text-gray-500">
          30 August, 2024, 2:00 PM (IST) | 3 hours | 5,000 Participants
        </div>
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">Ended</span>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="problems">Problems</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-4">
            <section>
              <h2 className="text-xl font-semibold">Contest Description</h2>
              <p>Join our weekly coding contest and compete with programmers from around the world! This contest features a mix of algorithmic problems designed to challenge your coding skills.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold">Contest Rules</h2>
              <ul className="list-disc pl-5">
                <li>All submissions must be original work.</li>
                <li>Participants may use any programming language.</li>
                <li>Collaboration is not allowed during the contest.</li>
                <li>The judge's decision is final.</li>
              </ul>
            </section>
          </div>
        </TabsContent>

        <TabsContent value="problems">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(4)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>24 Two Sum</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${index === 2 ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                      {index === 2 ? 'Hard' : 'Easy'}
                    </span>
                  </TableCell>
                  <TableCell>120 pts</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="leaderboard">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Total Time</TableHead>
                <TableHead>Solved</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(10)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>5</TableCell>
                  <TableCell className="text-blue-500">@anupsingh12</TableCell>
                  <TableCell>120 pts</TableCell>
                  <TableCell>00:07:57</TableCell>
                  <TableCell>4</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-center mt-4 space-x-2">
            <button className="px-3 py-1 bg-blue-500 text-white rounded">1</button>
            <button className="px-3 py-1 bg-gray-200 rounded">2</button>
            <span>...</span>
            <button className="px-3 py-1 bg-gray-200 rounded">9</button>
            <button className="px-3 py-1 bg-gray-200 rounded">10</button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContestDashboard;