import React, { useEffect, useState } from "react";
import { ISubmission, SubmissionTable } from "./SubmissionTable";
import axios from "axios";
import SubmissionsTable from "./submissions-table/page";

export default function ProblemSubmissions({
  problemId,
}: {
  problemId: string;
}) {
  // const [submissions, setSubmissions] = useState<ISubmission[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get(
  //       `/api/submission/bulk?problemId=${problemId}`
  //     );
  //     setSubmissions(response.data.submissions || []);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="flex flex-col gap-6 w-full">
      <SubmissionsTable problemId={problemId} />
    </div>
  );
}
