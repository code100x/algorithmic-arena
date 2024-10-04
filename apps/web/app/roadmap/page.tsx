import { Roadmap } from "../../components/Roadmap";
import { getProblems } from "../db/problem";

export default async function Page(): Promise<JSX.Element> {
  
  const problems = await getProblems();

  return (
    <main>
      
      <Roadmap problems={problems} />
    </main>
  );
}

export const dynamic = "force-dynamic"; 