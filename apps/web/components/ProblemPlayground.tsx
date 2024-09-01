"use client";
import { ProblemWithSubmissions } from "@/app/lib/types";
import { Turnstile } from "@marsidev/react-turnstile";
import { Editor } from "@monaco-editor/react";
import {
  SubmissionResult,
  submissions as SubmissionsType,
} from "@prisma/client";
import { LANGUAGE_MAPPING } from "@repo/common/language";
import { Button } from "@repo/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/select";
import axios from "axios";
import {
  AlignLeft,
  CheckIcon,
  CircleX,
  ClockIcon,
  Play,
  Redo,
  RefreshCcw,
  Sparkles,
} from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY ||
  "0x4AAAAAAAc4qhUEsytXspC_";

enum SubmitStatus {
  SUBMIT = "SUBMIT",
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  FAILED = "FAILED",
}

export default function ProblemPlayground({
  problem,
  contestId,
}: {
  problem: ProblemWithSubmissions;
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
      if (response.data.submission.status === SubmissionResult.ACCEPTED) {
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
    <div className="flex flex-col gap-6">
      <div className="flex justify-between gap-6">
        <div className="min-w-36">
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
        </div>
        <div className="flex flex-row gap-3 items-center">
          <div className="p-2 border rounded-lg">
            <AlignLeft className="w-4 h-4" />
          </div>
          <div className="p-2 border rounded-lg">
            <Redo className="w-4 h-4" />
          </div>
          <div className="p-2 border rounded-lg">
            <RefreshCcw className="w-4 h-4" />
          </div>
        </div>
      </div>
      <div className="rounded-xl">
        <Editor
          height={"60vh"}
          className=""
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
      <div className="flex justify-between rounded-2xl border p-4 items-center">
        <div className="flex gap-2 items-center">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <div className="font-medium text-2xl">Results</div>
          {process.env.NODE_ENV === "production" ? (
            <Turnstile
              onSuccess={(token: string) => {
                setToken(token);
              }}
              siteKey={TURNSTILE_SITE_KEY}
            />
          ) : null}
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            hidden={!session.data?.user}
            disabled={status === SubmitStatus.PENDING}
          >
            <div className="flex gap-2 items-center">
              <Play className="w-4 h-4" />
              {session.data?.user ? "Run Code" : "Login to submit"}
            </div>
          </Button>
          <Button
            disabled={status === SubmitStatus.PENDING}
            type="submit"
            className="text-white bg-blue-600 hover:text-background hover:bg-foreground"
            onClick={session.data?.user ? submit : () => signIn()}
          >
            {session.data?.user
              ? status === SubmitStatus.PENDING
                ? "Submitting"
                : "Submit"
              : "Login to submit"}
          </Button>
        </div>
      </div>
      <RenderTestcase testcases={testcases} />
    </div>
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
