"use client"
import Editor from "@monaco-editor/react";
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/tabs"
import { Button } from "@repo/ui/button"
import { Label } from "@repo/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@repo/ui/select"
import { useEffect, useState } from "react"
import { LANGUAGE_MAPPING } from "@repo/common/language"
import axios from "axios";
import { ISubmission, SubmissionTable } from "./SubmissionTable";

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
    }[]
}

export const ProblemSubmitBar = ({ problem }: { problem:  IProblem }) => {
    const [activeTab, setActiveTab] = useState("problem")

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
                  <SubmitProblem problem={problem} />
              </div>
              {activeTab === "submissions" && <Submissions problem={problem} />}
            </div>
        </div>
    )
}

interface Submission {
    id: string;
    problemId: string;
    languageId: string;
    code: string;
    fullCode: string;
    status: string;
    testcases: {
        status: string;
        index: number;
    }[];
}

function Submissions({ problem }: { problem: IProblem }) {
    const [submissions, setSubmissions] = useState<ISubmission[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/api/submission/bulk?problemId=${problem.id}`);
            setSubmissions(response.data.submissions || []);
        }
        fetchData();
    }, []);
    return <div>
        <SubmissionTable submissions={submissions} />
    </div>
}

function SubmitProblem({ problem }: { problem: IProblem }) {
    const [language, setLanguage] = useState(Object.keys(LANGUAGE_MAPPING)[0] as string);
    const [code, setCode] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<string>("SUBMIT");

    useEffect(() => {
        const defaultCode: { [key: string]: string } = {};
        problem.defaultCode.forEach(code => {
            const language = Object.keys(LANGUAGE_MAPPING).find(language => LANGUAGE_MAPPING[language]?.internal === code.languageId);
            if (!language) return;
            defaultCode[language] = code.code;
        });
        setCode(defaultCode);
    }, [problem]);

    async function pollWithBackoff(id: string) {
        const response = await axios.get(`/api/submission/${id}`)
        if (response.data.submission.status === "PENDING") {
            setTimeout(() => pollWithBackoff(id), 1000);
        } else {
            setStatus(response.data.submission.status);
        }
    }

    async function submit() {
        const response = await axios.post(`/api/submission/`, {
            "code": code[language], 
            "languageId": language,
            "problemId": problem.id
        });
        pollWithBackoff(response.data.id);
    }

    return (
        <div>
            <Label htmlFor="language">Language</Label>
            <Select value={language} defaultValue="cpp" onValueChange={(value) => setLanguage(value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                    {Object.keys(LANGUAGE_MAPPING).map((language) => (
                        <SelectItem key={language} value={language}>{LANGUAGE_MAPPING[language]?.name}</SelectItem>
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
                <Button type="submit" className="mt-4 align-right" onClick={submit}>
                    Submit
                </Button>
              </div>
      </div>
    )
}
