"use client";
import { ProblemWithSubmissions } from "@/app/lib/types";
import { Editor } from "@monaco-editor/react";
import { LANGUAGE_MAPPING } from "@repo/common/language";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/select";
import { AlignLeft, Redo, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import ProblemResults from "./ProblemResults";

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
          <div className="p-2 border rounded-lg cursor-pointer">
            <AlignLeft className="w-4 h-4" />
          </div>
          <div className="p-2 border rounded-lg cursor-pointer">
            <Redo className="w-4 h-4" />
          </div>
          <div className="p-2 border rounded-lg cursor-pointer">
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
      <ProblemResults
        problemId={problem.id}
        contestId={contestId}
        code={code}
        language={language}
      />
    </div>
  );
}
