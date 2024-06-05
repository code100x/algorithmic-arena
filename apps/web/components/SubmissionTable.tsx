/**
 * v0 by Vercel.
 * @see https://v0.dev/t/pxkBLMqmzHi
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@repo/ui/table";
export interface ISubmission {
    id: string;
    time: string;
    memory: string;
    problemId: string;
    languageId: string;
    code: string;
    fullCode: string;
    status: string;
    testcases: {
        status: string;
        index: number;
    }[];
};

export function SubmissionTable({ submissions }: { submissions: ISubmission[] }) {
    function getColor(status: string) {
        switch (status) {
            case "AC":
                return "text-green-500";
            case "FAIL":
                return "text-red-500";
            case "TLE":
                return "text-yellow-500";
            case "COMPILATION_ERROR":
                return "text-red-500";
            case "PENDING":
                return "text-gray-500";
            default:
                return "text-gray-500";
        }
    }
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Submission ID</TableHead>
            <TableHead>Result</TableHead>
            <TableHead>Tests Passed</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Memory</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {submissions.map((submission) => <TableRow>
                <TableCell>{submission.id.substr(0, 8)}</TableCell>
                <TableCell className={getColor(submission.status)}>{submission.status}</TableCell>
                <TableCell>{submission.testcases.filter(testcase => testcase.status === "AC").length}/{submission.testcases.length}</TableCell>
                <TableCell>{submission.time}</TableCell>
                <TableCell>{submission.memory}</TableCell>
            </TableRow>)}
       </TableBody>
      </Table>
    </div>
  )
}