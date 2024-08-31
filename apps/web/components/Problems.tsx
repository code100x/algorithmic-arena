import ProblemsTable from "../components/problems-table/page";
import TrendingProblems from "./TrendingProblems";

export async function Problems() {
  return (
    <section className="bg-background text-foreground py-8 md:py-12 min-h-screen">
      <div className="container mx-auto">
        <div className="mb-6 flex flex-col space-y-2">
          <h2 className="text-3xl font-bold">Problems</h2>
          <p className="text-muted-foreground">
            Sharpen Your Skills with Diverse Challenges
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <ProblemsTable />
          <TrendingProblems />
        </div>
      </div>
    </section>
  );
}
