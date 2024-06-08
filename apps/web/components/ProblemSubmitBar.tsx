"use client";
import Editor from "@monaco-editor/react";
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/tabs";
import { Button } from "@repo/ui/button";
import { Label } from "@repo/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@repo/ui/select";
import { useEffect, useState } from "react";
import { LANGUAGE_MAPPING } from "@repo/common/language";
import axios from "axios";
import { ISubmission, SubmissionTable } from "./SubmissionTable";
import { CheckIcon, CircleX, ClockIcon } from "lucide-react";
import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react";

enum SubmitStatus {
  SUBMIT = "SUBMIT",
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  FAILED = "FAILED",
}

export interface IProblem {
  id: string;
  title: string;
  description: string;
  slug: string;
  defaultCode: {
    languageId: number;
    code: string;
  }[];
}

export const ProblemSubmitBar = ({
  problem,
  contestId,
}: {
  problem: IProblem;
  contestId?: string;
}) => {
  const [activeTab, setActiveTab] = useState("problem");

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Tabs
              defaultValue="problem"
              className="rounded-md p-1"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="problem">Submit</TabsTrigger>
                <TabsTrigger value="submissions">Submissions</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        <div className={`${activeTab === "problem" ? "" : "hidden"}`}>
          <SubmitProblem problem={problem} contestId={contestId} />
        </div>
        {activeTab === "submissions" && <Submissions problem={problem} />}
      </div>
    </div>
  );
};

function Submissions({ problem }: { problem: IProblem }) {
  const [submissions, setSubmissions] = useState<ISubmission[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `/api/submission/bulk?problemId=${problem.id}`,
      );
      setSubmissions(response.data.submissions || []);
    };
    fetchData();
  }, []);

  return (
    <div>
      <SubmissionTable submissions={submissions} />
    </div>
  );
}

function SubmitProblem({
  problem,
  contestId,
}: {
  problem: IProblem;
  contestId?: string;
}) {
  const [language, setLanguage] = useState(
    Object.keys(LANGUAGE_MAPPING)[0] as string,
  );
  const [code, setCode] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<string>(SubmitStatus.SUBMIT);
  const [testcases, setTestcases] = useState<any[]>([]);
  const session = useSession();

  useEffect(() => {
    const defaultCode: { [key: string]: string } = {};
    problem.defaultCode.forEach((code) => {
      const language = Object.keys(LANGUAGE_MAPPING).find(
        (language) => LANGUAGE_MAPPING[language]?.internal === code.languageId,
      );
      if (!language) return;
      defaultCode[language] = code.code;
    });
    setCode(defaultCode);
  }, [problem]);

  async function pollWithBackoff(id: string, retries: number) {
    if (retries === 0) {
      setStatus(SubmitStatus.SUBMIT);
      toast.error("Not able to get status ");
      return;
    }

    const response = await axios.get(`/api/submission/?id=${id}`);

    if (response.data.submission.status === "PENDING") {
      setTestcases(response.data.testCases);
      await new Promise((resolve) => setTimeout(resolve, 2.5 * 1000));
      pollWithBackoff(id, retries - 1);
    } else {
      if (response.data.submission.status === "AC") {
        setStatus(SubmitStatus.ACCEPTED);
        setTestcases(response.data.testCases);
        toast.success("Accepted!");
        return;
      } else {
        setStatus(SubmitStatus.FAILED);
        toast.error("Failed :(");
        setTestcases(response.data.testCases);
        return;
      }
    }
  }

  async function submit() {
    setStatus(SubmitStatus.PENDING);
    setTestcases(t => t.map(tc => ({...tc, status: "PENDING"})));
    const response = await axios.post(`/api/submission/`, {
      code: code[language],
      languageId: language,
      problemId: problem.id,
      activeContestId: contestId,
    });
    pollWithBackoff(response.data.id, 10);
  }

  return (
    <div>
      <Label htmlFor="language">Language</Label>
      <Select
        value={language}
        defaultValue="cpp"
        onValueChange={(value) => setLanguage(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(LANGUAGE_MAPPING).map((language) => (
            <SelectItem key={language} value={language}>
              {LANGUAGE_MAPPING[language]?.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="pt-4 rounded-md">
        <Editor
          height={"60vh"}
          value={code[language]}
          theme="vs-dark"
          onMount={() => {}}
          options={{
            fontSize: 14,
            scrollBeyondLastLine: false,
          }}
          language={LANGUAGE_MAPPING[language]?.monaco}
          onChange={(value) => {
            //@ts-ignore
            setCode({ ...code, [language]: value });
          }}
          defaultLanguage="javascript"
        />
      </div>
      <div className="flex justify-end">
        <Button
          disabled={status === SubmitStatus.PENDING}
          type="submit"
          className="mt-4 align-right"
          onClick={session.data?.user ? submit : () => signIn()}
        >
          {session.data?.user ? (status === SubmitStatus.PENDING ? "Submitting" : "Submit") : "Login to submit"}
        </Button>
      </div>
      <RenderTestcase testcases={testcases} />
    </div>
  );
}

function renderResult(status: string) {
  switch (status) {
    case "AC":
      return <CheckIcon className="h-6 w-6 text-green-500" />;
    case "FAIL":
      return <CircleX className="h-6 w-6 text-red-500" />;
    case "TLE":
      return <ClockIcon className="h-6 w-6 text-red-500" />;
    case "COMPILATION_ERROR":
      return <CircleX className="h-6 w-6 text-red-500" />;
    case "PENDING":
      return <ClockIcon className="h-6 w-6 text-yellow-500" />;
    default:
      return <div className="text-gray-500"></div>;
  }
}

function RenderTestcase({ testcases }: { testcases: any[] }) {
  return (
    <div className="grid grid-cols-6 gap-4">
      {testcases.map((testcase, index) => (
        <div key={index} className="border rounded-md">
          <div className="px-2 pt-2 flex justify-center">
            <div className="">Test #{index + 1}</div>
          </div>
          <div className="p-2 flex justify-center">
            {renderResult(testcase.status)}
          </div>
        </div>
      ))}
    </div>
  );
}
