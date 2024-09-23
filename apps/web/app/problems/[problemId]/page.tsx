import SubmissionsTable from "@/components/submissions-table/page";
import { getServerSession } from "next-auth";

export default async function page({
  params: { problemId },
}: {
  params: { problemId: string };
}) {
  const session = await getServerSession();
  if (!session || !session.user)
    return <div className="">Please login to view your submissions</div>;

  return <SubmissionsTable problemId={problemId} />;
}
