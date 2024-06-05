import { ProblemSubmitBar } from "../../../../../components/ProblemSubmitBar";
import { getProblem } from "../../../../db/problem";

export default async function ProblemPage({
  params: {
    problemId,
  }
}: {
  params: {
    problemId: string;
  }
}) {
  const problem = await getProblem(problemId);

  if (!problem) {
    return <div>Problem not found</div>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-8 md:py-12 grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
          <div className="prose prose-stone dark:prose-invert">
            <ProblemStatement />
          </div>
        </div>
        <ProblemSubmitBar problem={problem} />
     </main>
    </div>
  )
}

function ProblemStatement() {
    return (
        <div>
            <h2 className="text-2xl font-bold">Problem A - Watermelon</h2>
            <h3>Problem Description</h3>
            <p>
              One hot summer day, Polycarp bought a watermelon. He decided to cut it in half to eat it with his friend.
              However, when Polycarp tried to cut the watermelon, it broke into more than two pieces. Now Polycarp and
              his friend are left with a real mess. They have to pick up the pieces and put the watermelon back
              together.
            </p>
            <p>
              Given the number of pieces the watermelon was broken into, your task is to determine whether Polycarp and
              his friend can put the watermelon back together so that each of them gets at least one piece.
            </p>
            <h3>Input</h3>
            <p>
              The first and only line of the input contains an integer n (2 ≤ n ≤ 100) — the number of pieces the
              watermelon was broken into.
            </p>
            <h3>Output</h3>
            <p>
              If Polycarp and his friend can put the watermelon back together so that each of them gets at least one
              piece, print "YES" (without quotes). Otherwise, print "NO" (without quotes).
            </p>
        </div>
    )
}