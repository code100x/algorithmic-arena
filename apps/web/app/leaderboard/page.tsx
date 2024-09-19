// page.tsx
"use client";

import React from "react";
import GeneralLeaderboard from "../../components/Tables/GeneralLeaderBoard";
import ContestLeaderboard from "../../components/Tables/ContestLeaderBoard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/tabs";

const LeaderBoardPage: React.FC = () => {
  return (
    <main className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 pt-8 pb-14 flex flex-col justify-start items-start gap-6">
      <h1 className="text-3xl font-bold text-white mb-2">Leaderboard</h1>
      <p className="text-sm text-gray-400 mb-6">
        Track, Compete, and Rise in the Ultimate Coding Arena Leaderboard.
      </p>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="h-10 justify-start items-center gap-2 inline-flex">
          <TabsTrigger
            value="general"
            className="data-[state=active]:bg-blueGray-900"
          >
            General Leaderboard
          </TabsTrigger>
          <TabsTrigger
            value="contest"
            className="data-[state=active]:bg-blueGray-900"
          >
            Contest Leaderboard
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralLeaderboard />
        </TabsContent>
        <TabsContent value="contest">
          <ContestLeaderboard />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default LeaderBoardPage;
