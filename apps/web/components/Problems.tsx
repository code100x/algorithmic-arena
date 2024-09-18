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
    <section className=" py-8 md:py-22">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Problems</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Sharpen Your Skills with Diverse Challenges
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
        <div className="mt-6">
          <div className="border-2  rounded-md overflow-hidden dark:bg-background">
            <div className="flex  bg-muted font-bold">
              <div className="px-2 py-2 flex-1">Name</div>
              <div className="px-2 py-2 text-center w-[100px]">Difficulty</div>
              <div className="px-2 py-2 text-center w-[100px]">Status</div>
            </div>
            {problems.map((problem) => (
              <Link
                href={`/problem/${problem.id}`}
                className="flex text-muted-foreground hover:bg-muted/50 duration-300"
                key={problem.id}
              >
                <div className="px-2 py-2 flex-1 font-medium  capitalize">
                  {problem.title.split("-").join(" ")}
                </div>
                <div className=" px-2 py-2 text-center w-[100px] capitalize">
                  {problem.difficulty.toLocaleLowerCase()}
                </div>
                <div className="px-2 py-2 text-center w-[100px]">-</div>
              </Link>
            ))}
          </div>
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
