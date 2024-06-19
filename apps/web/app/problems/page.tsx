import { Problems } from "../../components/Problems";

export default function Page(): JSX.Element {
  return (
    <main>
      <Problems />
    </main>
  );
}

export const dynamic = "force-dynamic"