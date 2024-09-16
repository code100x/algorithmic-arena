import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@repo/ui/card";
import { getProblems } from "../app/db/problem";
import { PrimaryButton } from "./LinkButton";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import { redirect } from "next/navigation";
import Link from "next/link";

export async function Problems({ query }: { query: string | null }) {
  const problems = await getProblems(query ? query : undefined);
  return (
    <section className="bg-white dark:bg-gray-900 py-8 md:py-12 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Popular Problems</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Check out the most popular programming problems on Code100x.
          </p>
        </div>
        <div>
          <form
            action={async (form) => {
              "use server";
              const CurrentQuery = form.get("query");
              if (CurrentQuery || (query && !CurrentQuery)) {
                redirect(`/problems?query=${CurrentQuery}`);
              }
            }}
            className="flex gap-2 items-center"
          >
            <Input
              className="w-auto"
              name="query"
              placeholder="Search problems"
            />
            <Button size={"sm"} variant={"secondary"}>
              Search
            </Button>
          </form>
          {query && (
            <Link
              className="text-sm mt-1 text-blue-500 underline"
              href={"/problems"}
            >
              Clear Search
            </Link>
          )}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6  mt-6">
          {problems.map((problem) => (
            <ProblemCard problem={problem} key={problem.id} />
          ))}
        </div>
        {problems.length === 0 && (
          <div className="flex flex-col items-center md:mt-12">
            <h1 className="lg:text-4xl md:text-2xl text-lg text-muted-foreground font-bold">
              No problems found{" "}
            </h1>
            {query && (
              <p className="text-muted-foreground dark:text-gray-400 mt-2">
                Try searching for another problem
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function ProblemCard({ problem }: { problem: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{problem.title}</CardTitle>
        <CardDescription>Easy problem for beginners</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Difficulty</p>
            <p>{problem.difficulty}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Submissions</p>
            <p>{problem.solved}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <PrimaryButton href={`/problem/${problem.id}`}>
          View Problem
        </PrimaryButton>
      </CardFooter>
    </Card>
  );
}
