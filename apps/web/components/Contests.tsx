import { getExistingContests, getUpcomingContests } from "../app/db/contest";
import { ContestCard } from "./ContestCard";

export async function Contests() {
  const [upcomingContests, pastContests] = await Promise.all([getUpcomingContests(), getExistingContests()]);
    return <div>
        <section className="bg-white dark:bg-gray-900 py-8 md:py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Upcoming Contests</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Check out the upcoming programming contests on Codeforces.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingContests.map((contest) => <ContestCard key={contest.id} title={contest.title} id={contest.id} time={contest.startTime.getUTCMinutes().toString()} duration={`${(new Date(contest.endTime).getTime() - new Date(contest.startTime).getTime()) / 1000 * 60 * 60} hours`} />)} 
            </div>
          </div>
        </section>
        <section className="bg-white dark:bg-gray-900 py-8 md:py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Previous Contests</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Check out the previous programming contests on Codeforces.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastContests.map((contest) => <ContestCard key={contest.id} title={contest.title} id={contest.id} time={contest.startTime.toLocaleDateString()} duration={(new Date(contest.endTime).getTime() - new Date(contest.startTime).getTime()).toString()} />)}
            </div>
          </div>
        </section>
    </div>
}