import { getProblems } from "../app/db/problem";
import { ProblemCard } from "./ProblemCard";
import { LevelFilter } from "./LevelFilter";
import { SearchBar } from "./SearchBar";

export async function Problems() {
  const problems = await getProblems();


  return (
    <section className="bg-white dark:bg-gray-900 py-8 md:py-12 min-h-screen">
      <div className="w-full flex justify-center gap-4">
        <SearchBar problems={problems} />
        <LevelFilter />
      </div>
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Popular Problems</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Check out the most popular programming problems on Code100x.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem) => (
            <ProblemCard problem={problem} key={problem.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
