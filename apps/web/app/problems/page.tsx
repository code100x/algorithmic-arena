import { Problems } from "../../components/Problems";

export default function Page({
  searchParams,
}: {
  searchParams: { query: string | null };
}): JSX.Element {
  return (
    <main>
      <Problems query={searchParams.query} />
    </main>
  );
}

export const dynamic = "force-dynamic";
