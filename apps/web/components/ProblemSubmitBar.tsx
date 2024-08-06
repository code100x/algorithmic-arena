"use client";
import Editor from "@monaco-editor/react";
import CodeMirrorEditor from "@uiw/react-codemirror";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/tabs";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import { Button } from "@repo/ui/button";
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
import { submissions as SubmissionsType } from "@prisma/client";
import { Turnstile } from "@marsidev/react-turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY || "0x4AAAAAAAc4qhUEsytXspC_";

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
    <div>
      <Tabs
        defaultValue="problem"
        className="rounded-md px-2 mb-1 dark:border border border-gray-700/50"
        value={activeTab}
        onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="problem">Submit</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className={`${activeTab === "problem" ? "" : "hidden"}`}>
        <SubmitProblem problem={problem} contestId={contestId} />
      </div>
      {activeTab === "submissions" && <Submissions problem={problem} />}
    </div>
  );
};

function Submissions({ problem }: { problem: IProblem }) {
  const [submissions, setSubmissions] = useState<ISubmission[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `/api/submission/bulk?problemId=${problem.id}`
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
    Object.keys(LANGUAGE_MAPPING)[0] as string
  );

  const [code, setCode] = useState<Record<string, string>>({});

  const [status, setStatus] = useState<string>(SubmitStatus.SUBMIT);
  const [testcases, setTestcases] = useState<any[]>([]);
  const [token, setToken] = useState<string>("");
  const session = useSession();

  useEffect(() => {
    const defaultCode: { [key: string]: string } = {};
    problem.defaultCode.forEach((code) => {
      const language = Object.keys(LANGUAGE_MAPPING).find(
        (language) => LANGUAGE_MAPPING[language]?.internal === code.languageId
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
      setTestcases(response.data.submission.testcases);
      await new Promise((resolve) => setTimeout(resolve, 2.5 * 1000));
      pollWithBackoff(id, retries - 1);
    } else {
      if (response.data.submission.status === "AC") {
        setStatus(SubmitStatus.ACCEPTED);
        setTestcases(response.data.submission.testcases);
        toast.success("Accepted!");
        return;
      } else {
        setStatus(SubmitStatus.FAILED);
        toast.error("Failed :(");
        setTestcases(response.data.submission.testcases);
        return;
      }
    }
  }

  async function submit() {
    setStatus(SubmitStatus.PENDING);
    setTestcases((t) => t.map((tc) => ({ ...tc, status: "PENDING" })));
    try {
      const response = await axios.post(`/api/submission/`, {
        code: code[language],
        languageId: language,
        problemId: problem.id,
        activeContestId: contestId,
        token: token,
      });
      pollWithBackoff(response.data.id, 10);
    } catch (e) {
      //@ts-ignore
      toast.error(e.response.statusText);
      setStatus(SubmitStatus.SUBMIT);
    }
  }

  return (
    <>
      <div className="min-h-0 flex-grow min-w-full mr-[8px] mb-[8px] rounded-lg overflow-hidden dark:bg-black dark:border dar:border-borders border border-gray-700/50">
        <div className="h-[50px] bg-black relative dark:border-b dark:border-borders border-b border-b-gray-700/50">
          <div className="inline-block relative w-fit h-fit rounded-md ml-[13px] top-[8px] px-[6px] py-[6px] text-white hover:text-white cursor-pointer text-[14px] transition select-none">
            <Select
              value={language}
              defaultValue="cpp"
              onValueChange={(value) => setLanguage(value)}>
              <SelectTrigger >
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
          </div>
        </div>

        <CodeMirrorEditor
          value={code[language]}
          //@ts-ignore
          extensions={[loadLanguage(LANGUAGE_MAPPING[language]?.monaco ?? "javascript")!]}
          theme={tokyoNight}
          onChange={(value) => {
            setCode({ ...code, [language]: value });
          }}
          width="100%"
          height="75vh"
        />
      </div>

      <div
        className="flex justify-end items-center dark:bg-black w-full h-[55px] rounded-lg overflow-hidden dark:border dark:border-borders border border-gray-700/50"
      >
        {process.env.NODE_ENV === "production" ?
          <Turnstile
            onSuccess={(token: string) => {
              setToken(token);
            }}
            siteKey={TURNSTILE_SITE_KEY}
          /> : null
        }
        <Button
          disabled={status === SubmitStatus.PENDING}
          type="submit"
          className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-800/50 dark:border-gray-700/50 dark:text-green-500 dark:hover:bg-gray-700/50 me-2"
          onClick={session.data?.user ? submit : () => signIn()}>
          {session.data?.user
            ? status === SubmitStatus.PENDING
              ? "Submitting"
              : "Submit"
            : "Login to submit"}
        </Button>
      </div>
      <RenderTestcase testcases={testcases} />
    </>
  );
}

function renderResult(status: number | null) {
  switch (status) {
    case 1:
      return <ClockIcon className="h-6 w-6 text-yellow-500" />;
    case 2:
      return <ClockIcon className="h-6 w-6 text-yellow-500" />;
    case 3:
      return <CheckIcon className="h-6 w-6 text-green-500" />;
    case 4:
      return <CircleX className="h-6 w-6 text-red-500" />;
    case 5:
      return <ClockIcon className="h-6 w-6 text-red-500" />;
    case 6:
      return <CircleX className="h-6 w-6 text-red-500" />;
    case 13:
      return <div className="text-gray-500">Internal Error!</div>;
    case 14:
      return <div className="text-gray-500">Exec Format Error!</div>;
    default:
      return <div className="text-gray-500">Runtime Error!</div>;
  }
}

function RenderTestcase({ testcases }: { testcases: SubmissionsType[] }) {
  return (
    <div className="grid grid-cols-6 gap-4">
      {testcases.map((testcase, index) => (
        <div key={index} className="border rounded-md">
          <div className="px-2 pt-2 flex justify-center">
            <div className="">Test #{index + 1}</div>
          </div>
          <div className="p-2 flex justify-center">
            {renderResult(testcase.status_id)}
          </div>
        </div>
      ))}
    </div>
  );
}
