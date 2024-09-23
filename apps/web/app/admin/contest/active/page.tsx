import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@repo/ui/breadcrumb";

const ActiveContest = () => {
  return (
    <div className="container mx-auto px-28 pt-8 pb-14 h-[1024px]">
      <Breadcrumb className="text-blue-400 mb-4">
        <BreadcrumbItem>
          <BreadcrumbLink href="/admin/contest">Contest</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
  <BreadcrumbLink href="#" aria-current="page">Weekly Contest 101</BreadcrumbLink>
</BreadcrumbItem>
      </Breadcrumb>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Weekly Contest 101
            <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded">
              Active
            </span>
          </CardTitle>
          <p className="text-sm text-gray-500">
            30 August, 2024, 2:00 PM (IST) | 3 hours | 5,000 Participants
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="problems">Problems</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Contest Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">
                Contest Description
              </h3>
              <p className="mb-4">
                Join our weekly coding contest and compete with programmers from
                around the world! This contest features a mix of algorithmic
                problems designed to challenge your coding skills.
              </p>

              <h3 className="text-lg font-semibold mb-2">Contest Rules</h3>
              <ul className="list-disc pl-5">
                <li>All submissions must be original work.</li>
                <li>Participants may use any programming language.</li>
                <li>Collaboration is not allowed during the contest.</li>
                <li>The judge's decision is final.</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="problems">
          <Card>
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
                    <TableHead>Submissions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>24 Two Sum</TableCell>
                    <TableCell>
                      <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                        Easy
                      </span>
                    </TableCell>
                    <TableCell>120 pts</TableCell>
                    <TableCell>400</TableCell>
                  </TableRow>
                  {/* Add more rows as needed */}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard">
          <Card>
            <CardHeader>
              <CardTitle>Contest Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
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
                  <TableRow>
                    <TableCell>5</TableCell>
                    <TableCell className="text-blue-500">
                      @anupsingh12
                    </TableCell>
                    <TableCell>120 pts</TableCell>
                    <TableCell>00:07:57</TableCell>
                    <TableCell>4</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ActiveContest;
