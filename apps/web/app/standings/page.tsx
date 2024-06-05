import { PrimaryButton } from "../../components/LinkButton";
import { getContestsWithLeaderboard } from "../db/contest";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@repo/ui/table";

export default async function Page() {
  const contests = await getContestsWithLeaderboard();

  return (
    <div className="flex flex-col min-h-screen p-4 max-w-screen-md mx-auto">
      <div className="container px-4 md:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Leaderboard</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Check out the leaderboard
          </p>
        </div>
      </div>
      <div>
        <ContestsTable contests={contests} />
      </div>
    </div>
  );
}

interface IContest {
  id: string;
  title: string;
  startTime: Date;
}

function ContestsTable({ contests }: { contests: IContest[] }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Contest Name</TableHead>
            <TableHead>Start time</TableHead>
            <TableHead>Result</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contests.map((contest) => (
            <TableRow>
              <TableCell>{contest.id.substr(0, 8)}</TableCell>
              <TableCell>{contest.title}</TableCell>
              <TableCell>{contest.startTime.toLocaleString()}</TableCell>
              <TableCell>
                <PrimaryButton href={`/standings/${contest.id}`}>
                  View
                </PrimaryButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
