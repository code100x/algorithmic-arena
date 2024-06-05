import { Contests } from "../../components/Contests";

export default function Page(): JSX.Element {
  return (
    <main>
      <Contests />
    </main>
  );
}

export const dynamic = "force-dynamic";
