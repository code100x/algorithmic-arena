import {
  getExistingContests,
  getRunningContests,
  getUpcomingContests,
} from "../app/db/contest";
import { ContestCard } from "./ContestCard";

export async function Contests() {
  const [upcomingContests, pastContests, runningContests] = await Promise.all([
    getUpcomingContests(),
    getExistingContests(),
    getRunningContests(),
  ]);
  return (
    <div className="">
      <section className=" py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Ongoing Contests</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Check out the ongoing programming contests on Codeforces.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {runningContests.map((contest) => (
              <ContestCard
                key={contest.id}
                title={contest.title}
                id={contest.id}
                startTime={contest.startTime}
                endTime={contest.endTime}
              />
            ))}
          </div>
        </div>
      </section>
      <section className=" py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Upcoming Contests</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Check out the upcoming programming contests on Codeforces.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingContests.map((contest) => (
              <ContestCard
                key={contest.id}
                title={contest.title}
                id={contest.id}
                startTime={contest.startTime}
                endTime={contest.endTime}
              />
            ))}
          </div>
        </div>
      </section>
      <section className=" py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Previous Contests</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Check out the previous programming contests on Codeforces.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastContests.map((contest) => (
              <ContestCard
                key={contest.id}
                title={contest.title}
                id={contest.id}
                startTime={contest.startTime}
                endTime={contest.endTime}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
