import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, FileCode, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@repo/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@repo/ui/table";
import { Badge } from "@repo/ui/badge";

const ExtendedAdminDashboard: React.FC = () => {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,000</div>
            <p className="text-xs text-green-600">+5.25% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contests Held</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">152</div>
            <p className="text-xs text-green-600">+10.18% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Problems
            </CardTitle>
            <FileCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">560</div>
            <p className="text-xs text-green-600">
              25 problems added in the last 30 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Problems Solved
            </CardTitle>
            <FileCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">523,423</div>
            <p className="text-xs text-green-600">+2.74% from last month</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {/* Trending Problems (Left) */}
        <Card className="col-span-2 h-[620px]">
          <CardHeader className="bg-primary-foreground">
            <CardTitle>Trending Problems</CardTitle>
            <CardDescription>
              Most solved problems in the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table className="border-separate border-spacing-0">
              <TableBody>
                {[...Array(5)].map((_, index) => (
                  <TableRow
                    key={index}
                    className="h-20 flex justify-between border rounded-md m-2 items-center px-4 py-3"
                  >
                    {/* Left side: Problem Name and Submissions */}
                    <TableCell className="flex flex-col">
                      <span className="font-medium text-slate-50">
                        Problem Name
                      </span>
                      <span className="text-slate-400">250 Submissions</span>
                    </TableCell>

                    {/* Right side: Difficulty Level Badge */}
                    <TableCell className="flex justify-end">
                      <Badge
                        variant="secondary"
                        className="bg-[rgba(234,88,12,0.1)] text-orange-400 px-3 py-1 rounded-[999px]"
                      >
                        Medium
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-4 text-sm flex justify-center text-muted-foreground">
              <Link href="/admin/problems" className="flex items-center">
                View All Problems
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Right section with Upcoming Contests and Quick Links */}
        <div className="col-span-2 flex flex-col gap-4">
          {/* Upcoming Contests */}
          <Card className="h-[344px]">
            <CardHeader className="bg-primary-foreground">
              <CardTitle>Upcoming Contests</CardTitle>
              <CardDescription>Recently added contests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 gap-y-2 mt-4">
                {[...Array(2)].map((_, index) => (
                  <div
                    key={index}
                    className="flex justify-between border rounded-md p-4 items-center h-20"
                  >
                    <div>
                      <div className="font-medium gap-2">Weekly Contest 0</div>
                      <div className="text-sm text-muted-foreground">
                        August 25, 2024
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      5,000 Participants
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm flex justify-center text-muted-foreground">
                <Link href="/admin/contests" className="flex items-center">
                  View All Contests
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="h-[258px]">
            <CardHeader className="bg-primary-foreground">
              <CardTitle>Quick Links</CardTitle>
              <CardDescription>Frequently accessed pages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2  p-4 gap-y-2 py-6">
                <Link
                  href="/admin/problems"
                  className="flex items-center justify-between p-2 border rounded-md"
                >
                  <div className="flex items-center ">
                    <FileCode className="mr-2 h-4 w-4" />
                    All Problems
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/admin/contests"
                  className="flex items-center justify-between p-2 border rounded-md"
                >
                  <div className="flex items-center ">
                    <Users className="mr-2 h-4 w-4" />
                    All Contests
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExtendedAdminDashboard;
