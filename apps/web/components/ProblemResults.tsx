import { Turnstile } from "@marsidev/react-turnstile";
import {
  SubmissionResult,
  submissions as SubmissionsType,
} from "@prisma/client";
import { Button } from "@repo/ui/button";
import axios from "axios";
import { CheckIcon, CircleX, ClockIcon, Play, Sparkles } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";
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

export default function ProblemResults({
  problemId,
  code,
  language,
  contestId,
}: {
  problemId: string;
  code: Record<string, string>;
  language: string;
  contestId?: string;
}) {
  const [status, setStatus] = useState<SubmitStatus>(SubmitStatus.SUBMIT);
  const [testcases, setTestcases] = useState<any[]>([]);
  const [token, setToken] = useState<string>("");
  const session = useSession();

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
        problemId: problemId,
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

  function getSubmissionStatusIcon(status: SubmitStatus) {
    switch (status) {
      case SubmitStatus.SUBMIT:
        return <Sparkles className="w-4 h-4 text-orange-400" />;
      case SubmitStatus.PENDING:
        return <ClockIcon className="h-4 w-4 text-yellow-500" />;
      case SubmitStatus.ACCEPTED:
        return <CheckIcon className="h-4 w-4 text-green-500" />;
      case SubmitStatus.FAILED:
        return <CircleX className="h-4 w-4 text-red-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-orange-400" />;
    }
  }

  function getSubmissionStatusString(status: SubmitStatus) {
    switch (status) {
      case SubmitStatus.SUBMIT:
        return <div className="font-medium text-2xl">Results</div>;
      case SubmitStatus.PENDING:
        return <div className="font-medium text-xl">Pending</div>;
      case SubmitStatus.ACCEPTED:
        return (
          <div className="font-medium text-xl text-green-500">Accepted</div>
        );
      case SubmitStatus.FAILED:
        return (
          <div className="font-medium text-xl text-red-500">Incorrect</div>
        );
      default:
        return <div className="font-medium text-2xl">Results</div>;
    }
  }

  return (
    <div className="">
      <div className="flex justify-between rounded-2xl border p-4 items-center">
        <div className="flex gap-2 items-center">
          {getSubmissionStatusIcon(status)}
          {getSubmissionStatusString(status)}
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
