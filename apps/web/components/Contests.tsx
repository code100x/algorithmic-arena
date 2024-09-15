"use client";

import { useState } from "react";
import { ContestsCard } from "./ContestsCard";
import ContestsLeaderboard from "./ContestsLeaderboard";
import PastContest from "./PastContest";
import ContestsPagination from "./ContestsPagination";
import { MyContestsTable } from "./MyContestsTable";
import Tabs from "./Tabs";

export function Contests() {

  const [ActiveOrUpcomingContests, setActiveOrUpcomingContests] = useState<string>("Active");
  const [PastOrMyContests, setPastOrMyContests] = useState<string>("Past");

  const PastContests: { title: string, date: string, attendee: string }[] = Array(4).fill({
    title: "Weekly Contest 1",
    date: "August 25, 2024, 2:00 PM (IST)",
    attendee: "256",
  })
  const PastContestsComponent = PastContests.map((contest, index) => (
    <PastContest
      key={index}
      contestName={contest.title}
      date={contest.date}
      attendee={contest.attendee}
    />
  ))

  const MyContests: { title: string, finishTime: string, solved: string, ranking: string }[] = Array(4).fill({
    title: "Weekly Contest 94",
    finishTime: "0:56:00",
    solved: "0 / 4",
    ranking: "12 / 29",
  })
  const MyContestsComponent = <MyContestsTable data={MyContests} />

  const UpcomingContests: { title: string, date: string, attendee: string }[] = Array(4).fill({
    title: "Weekly Contest 1",
    date: "02d : 21hr : 34m : 02s",
    attendee: "256",
  })

  const UpcomingContestsComponent = UpcomingContests.map((contest, index) => (
    <ContestsCard
      key={index}
      title={contest.title}
      date={contest.date}
      status={{
        type: "upcoming",
        date: contest.date
      }}
    />
  ))

  const ActiveContests: { title: string, date: string }[] = Array(4).fill({
    title: "Weekly Contest 1",
    date: "August 25, 2024, 2:00 PM (IST)",
  })
  const ActiveContestsComponent = ActiveContests.map((contest, index) => (
    <ContestsCard
      key={index}
      title={contest.title}
      date={contest.date}
      status={{
        type: "active"
      }}
    />
  ))

  const FeaturedContest = {
    type: "upcoming",
    title: "Weekly Contest 1",
    date: "August 25, 2024, 2:00 PM (IST)",
    status: {
      type: "upcoming" as "upcoming" | "active",
      date: "02d : 21hr : 34m : 02s"
    }
  }

  return (
    <section className="min-h-screen py-[2rem] bg-white dark:bg-[#020817]">
      <div className="max-w-7xl px-3 md:px-5 mx-auto">
        <div className="px-4">
          <h1 className="text-4xl font-bold">Contests</h1>
          <p className="text-md my-2 text-gray-400">Test your skills, face top coders, and ascend the leaderboards at Algorithmic Arena.</p>
        </div>

        {/* Contests */}
        <div className="mt-6 pt-6">

          {/* Featured Contest */}
          <h1 className="text-2xl px-4 font-bold">Featured Contest</h1>
          <ContestsCard type="featured" title={FeaturedContest.title} date={FeaturedContest.date} status={FeaturedContest.status} />

          {/* Active and Upcoming Contests */}

          <div className="my-8">
            <Tabs TabHead={[
              { title: "Active Contests", key: "Active" },
              { title: "Upcoming Contests", key: "Upcoming" }
            ]}
              TabContent={[{
                key: "Active",
                content: (
                  <div className="lg:flex md:gap-3 md:justify-between">
                    {ActiveContestsComponent}
                  </div>
                )
              },
              {
                key: "Upcoming",
                content: (
                  <div className="lg:flex md:gap-3 md:justify-between">
                    {UpcomingContestsComponent}
                  </div>
                )
              }
              ]}
            />
          </div>
        </div>

        {/* Past, My Contests & Leaderboard */}
        <div className="md:flex md:items-start md:gap-8">
          <div className="md:flex-1 md:min-w-[400px]">
            {<Tabs
              TabHead={[{ title: "Past Contests", key: "Past" }, { title: "My Contests", key: "My" }]}
              TabContent={[{
                key: "Past", content: (
                  <div className="flex flex-col gap-2 my-4">
                    {PastContestsComponent}
                    <ContestsPagination />
                  </div>
                )
              },
              {
                key: "My", content: (
                  <div className="flex flex-col gap-2 my-4">
                    {MyContestsComponent}
                    {MyContests.length > 0 && <ContestsPagination />}
                  </div>
                )
              }]}
            />}
          </div>
          {/* Leaderboard */}
          <ContestsLeaderboard />
        </div>
      </div>
    </section>
  );
}
