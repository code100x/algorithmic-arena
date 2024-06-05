import { useParams } from "next/navigation";
import { Contest } from "../../../components/Contest";

export default function ContestPage({ params }: { params: { id: string } }) {
  if (!params.id) {
    return <div>Contest doesnt exist...</div>;
  }

  return <Contest id={params.id} />;
}

export const dynamic = "force-dynamic";
