import { ContestPointsTable } from "../../../components/ContestPointsTable";
import { getContestPoints } from "../../db/contestPoints";

export default async function Page({
  params: { contestId },
}: {
  params: {
    contestId: string;
  };
}) {
  const { contestPoints, myPoints } = await getContestPoints(contestId, 1, 10);

  return (
    <div className="flex flex-col min-h-screen p-4 max-w-screen-md mx-auto">
      <div className="flex flex-col min-h-screen">
        <div className="container px-4 md:px-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Leaderboard</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Check out the leaderboard
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md">
            <div className="prose prose-stone dark:prose-invert">
              <ContestPointsTable contestPoints={contestPoints} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
