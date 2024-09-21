import React from 'react';
import { Button } from "@repo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/tabs";
import { Badge } from "@repo/ui/badge";

const ContestDashboard = () => {
  return (
    <div className="bg-gray-900 text-white p-6 space-y-6">
      <p className="text-sm text-gray-400">Test your skills, face top coders, and ascend the leaderboards at Algorithmic Arena.</p>
      
      {/* Featured Contest */}
      <Card className="bg-gray-800 text-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">Weekly Contest 1</h2>
              <Badge variant="outline" className="mb-4">Starts in 02d : 21hr : 34m : 02s</Badge>
              <div className="flex items-center space-x-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-gray-400">25 August, 2024, 2:00 PM (IST)</span>
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Avatar key={i}>
                      <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span className="text-sm text-gray-400">+94 Registered</span>
              </div>
              <div className="space-x-2">
                <Button>Register now</Button>
                <Button variant="outline">View details</Button>
              </div>
            </div>
            <div className="bg-gray-900 p-4 rounded-md">
              <pre className="text-xs text-gray-300">
                <code>{`class Solution {
  twoSum(nums, target) {
    const comp = {};
    for (let i = 0; i < nums.length; i++) {
      if (comp[nums[i] ] >= 0) {
        return [comp[nums[i] ], i]
      }
      comp[target - nums[i]] = i
    }
  }
}`}
                </code>
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Carousel Indicators */}
      <div className="flex justify-center space-x-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`h-2 w-2 rounded-full ${i === 1 ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
        ))}
      </div>

      {/* Contest Tabs */}
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Contests</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Contests</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="bg-gray-800 text-white">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Weekly Contest 1</h3>
                  <Badge variant="secondary" className="mb-2">Active</Badge>
                  <div className="flex items-center space-x-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs text-gray-400">25 August, 2024, 2:00 PM (IST)</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((j) => (
                        <Avatar key={j}>
                          <AvatarFallback>U{j}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">+94 Participating</span>
                  </div>
                  <Button className="w-full mb-2">Join now</Button>
                  <Button variant="link" className="w-full">View Leaderboard</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Past Contests */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="past">
            <TabsList>
              <TabsTrigger value="past">Past Contests</TabsTrigger>
              <TabsTrigger value="my">My Contests</TabsTrigger>
            </TabsList>
            <TabsContent value="past" className="mt-4">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-800 p-4 rounded-md mb-2 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Weekly Contest {i}</h3>
                    <p className="text-sm text-gray-400">25 August, 2024, 2:00 PM (IST)</p>
                  </div>
                  <span className="text-sm text-gray-400">256 Participated</span>
                </div>
              ))}
              <div className="flex justify-center mt-4 space-x-2">
                <Button variant="outline" size="sm">1</Button>
                <Button variant="ghost" size="sm">2</Button>
                <Button variant="ghost" size="sm">...</Button>
                <Button variant="ghost" size="sm">9</Button>
                <Button variant="ghost" size="sm">10</Button>
                <Button variant="outline" size="sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Contest Leaderboard */}
        <Card className="bg-gray-800 text-white">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Contest Leaderboard</CardTitle>
            <Button variant="link" className="text-sm">View more →</Button>
          </CardHeader>
          <CardContent>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center space-x-4 mb-4">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  RJ
                </div>
                <div className="flex-grow">
                  <p className="font-semibold">Anup Singh</p>
                  <p className="text-sm text-gray-400">@anupsingh12</p>
                </div>
                <Badge variant="secondary">Rank {i}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContestDashboard;