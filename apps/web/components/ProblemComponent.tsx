import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/tabs";
import ProblemDescription from "./ProblemDescription";
import { ProblemWithSubmissions } from "@/app/lib/types";
import SubmissionsTable from "./submissions-table/page";
import { ReactNode } from "react";

export function ProblemComponent({
  problem,
  children,
}: {
  problem: ProblemWithSubmissions;
  children: ReactNode;
}) {
  return (
    <Tabs
      defaultValue="problem"
      className="rounded-2xl p-4 flex flex-col gap-6 bg-primary-foreground h-full items-start"
    >
      <TabsList className="bg-transparent">
        <TabsTrigger value="problem">Problem</TabsTrigger>
        <TabsTrigger value="submissions">Submissions</TabsTrigger>
      </TabsList>
      <TabsContent value="problem" className="w-full">
        <ProblemDescription problem={problem} />
      </TabsContent>
      <TabsContent value="submissions" className="w-full">
        {children}
      </TabsContent>
    </Tabs>
  );
}
