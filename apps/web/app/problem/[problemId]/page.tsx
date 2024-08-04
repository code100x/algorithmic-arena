
import { getProblem } from "../../db/problem";
import { ProblemDetails } from "./_components/problem-details"

export default async function ProblemPage({
  params: { problemId },
}: {
  params: {
    problemId: string;
  };
}) {
  const problem = await getProblem(problemId);

  if (!problem) {
    return <div>Problem not found</div>;
  }

  return (
    <div className="h-[calc(100vh-60px)] overflow-hidden bg-black">
      <div
        className="relative flex flex-row h-[calc(100vh-60px)] w-full mt-[8px] "
      >
        <ProblemDetails problem={problem} />
      </div>
    </div>
  );
}
export const dynamic = "force-dynamic";
