"use client";

import React, { useState } from "react";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Textarea } from "@repo/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/select";
import { Card, CardHeader, CardContent } from "@repo/ui/card";
import { Switch } from "@repo/ui/switch";
import { Label } from "@repo/ui/label";
import { UploadCloud, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@repo/ui/dialog";
// import { toast } from "../../../../../packages/ui/src/@/hooks/use-toast";
import { toast } from "../../../../packages/ui/src/@/hooks/use-toast";

const ProblemCreationForm = () => {
  const [isContestProblem, setIsContestProblem] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [examples, setExamples] = useState<string[]>([]);
  const [testCases, setTestCases] = useState<
    { input: string; output: string }[]
  >([]);
  const [newTestCase, setNewTestCase] = useState({ input: "", output: "" });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const contents = JSON.parse(e.target?.result as string);
          setTestCases(contents);
          toast({
            title: "Success",
            description: "Test cases uploaded successfully",
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Invalid JSON file",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
      setFileName(file.name);
    }
  };

  const addExample = () => {
    const newExample = prompt("Enter example:");
    if (newExample) {
      setExamples([...examples, newExample]);
    }
  };

  const addTestCase = () => {
    if (newTestCase.input && newTestCase.output) {
      setTestCases([...testCases, newTestCase]);
      setNewTestCase({ input: "", output: "" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProblemDetailsCard
          isContestProblem={isContestProblem}
          setIsContestProblem={setIsContestProblem}
        />
        <div className="space-y-6">
          <ExamplesCard examples={examples} addExample={addExample} />
          <TestCasesUploadCard
            fileName={fileName}
            handleFileUpload={handleFileUpload}
          />
          {testCases.length > 0 && (
            <TestCasesListCard
              testCases={testCases}
              setTestCases={setTestCases}
            />
          )}
        </div>
      </div>
      <FormActions />
    </div>
  );
};

const ProblemDetailsCard = ({
  isContestProblem,
  setIsContestProblem,
}: {
  isContestProblem: boolean;
  setIsContestProblem: (value: boolean) => void;
}) => (
  <Card className="border-slate-800 border-2">
    <CardHeader className="bg-slate-900 mb-2">
      <h2 className="text-xl font-semibold">Problem Details</h2>
      <p className="text-sm text-slate-400">
        Enter basic details about problem
      </p>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Label htmlFor="problemName">Problem Name</Label>
        <Input
          id="problemName"
          placeholder="Enter problem name"
          className="border-slate-700"
        />
      </div>
      <div>
        <Label htmlFor="problemDescription">Problem Description</Label>
        <Textarea
          id="problemDescription"
          placeholder="Enter the description"
          className="border-slate-700"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select>
            <SelectTrigger className="border-slate-700">
              <SelectValue placeholder="Select Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="points">Points</Label>
          <Select>
            <SelectTrigger className="border-slate-700">
              <SelectValue placeholder="Select Point" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="5">5</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="topics">Topics</Label>
        <Select>
          <SelectTrigger className="border-slate-700">
            <SelectValue placeholder="Select Topics" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="arrays">Arrays</SelectItem>
            <SelectItem value="strings">Strings</SelectItem>
            <SelectItem value="linked-list">Linked List</SelectItem>
            <SelectItem value="graphs">Graphs</SelectItem>
            <SelectItem value="sorting">Sorting</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="constraints">Constraints</Label>
        <Textarea
          id="constraints"
          placeholder="Enter Problem Constraints"
          className="border-slate-700"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="contest"
          checked={isContestProblem}
          onCheckedChange={setIsContestProblem}
        />
        <Label htmlFor="contest">Mark as a contest Problem</Label>
      </div>
    </CardContent>
  </Card>
);

const ExamplesCard = ({
  examples,
  addExample,
}: {
  examples: string[];
  addExample: () => void;
}) => (
  <Card className="border-slate-800 border-2">
    <CardHeader className="bg-slate-900">
      <h2 className="text-xl font-semibold">Add Examples</h2>
      <p className="text-sm text-slate-400">Add examples to guide user</p>
    </CardHeader>
    <CardContent className="flex flex-col items-center justify-center h-48">
      {examples.length > 0 ? (
        examples.map((example, index) => (
          <p key={index} className="text-slate-400">
            {example}
          </p>
        ))
      ) : (
        <>
          <p className="text-slate-400 mb-2">No Examples added yet</p>
          <p className="text-sm text-slate-500 mb-4">
            Please at least add one example.
          </p>
        </>
      )}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-blue-600 text-white mt-4 hover:bg-blue-700"
          >
            + Add Examples
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Example</DialogTitle>
            <DialogDescription>
              Enter an example for the problem.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              id="example"
              placeholder="Enter example here"
              className="col-span-3"
            />
          </div>
          <DialogClose asChild>
            <Button onClick={addExample}>Add Example</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </CardContent>
  </Card>
);

const TestCasesUploadCard = ({
  fileName,
  handleFileUpload,
}: {
  fileName: string | null;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <Card className="border-slate-800 border-2">
    <CardHeader className="bg-slate-900">
      <h2 className="text-xl font-semibold">Add Testcases</h2>
      <p className="text-sm text-slate-400">Add testcases to the problem</p>
    </CardHeader>
    <CardContent className="flex flex-col items-center justify-center h-40">
      <label
        htmlFor="upload-testcases"
        className="flex items-center space-x-2 cursor-pointer"
      >
        <Button
          variant="outline"
          className="flex items-center space-x-2 border-slate-700 hover:bg-slate-700"
        >
          <UploadCloud className="h-4 w-4" />
          <span>{fileName ? "Change File" : "Upload Testcases"}</span>
        </Button>
      </label>
      <input
        type="file"
        id="upload-testcases"
        accept=".json"
        className="hidden"
        onChange={handleFileUpload}
      />
      <p className="text-sm text-slate-500 mt-2">
        Supported format: JSON {fileName && `- ${fileName} uploaded`}
      </p>
    </CardContent>
  </Card>
);

const TestCasesListCard = ({
  testCases,
  setTestCases,
}: {
  testCases: { input: string; output: string }[];
  setTestCases: React.Dispatch<
    React.SetStateAction<{ input: string; output: string }[]>
  >;
}) => (
  <Card className="border-slate-800">
    <CardHeader className="bg-slate-900">
      <h2 className="text-xl font-semibold">Test Cases</h2>
    </CardHeader>
    <CardContent>
      {testCases.map((testCase, index) => (
        <div key={index} className="mb-4 p-2 border border-slate-700 rounded">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold">Test Case {index + 1}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setTestCases(testCases.filter((_, i) => i !== index));
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p>
            <strong>Input:</strong> {testCase.input}
          </p>
          <p>
            <strong>Output:</strong> {testCase.output}
          </p>
        </div>
      ))}
    </CardContent>
  </Card>
);

const FormActions = () => (
  <div className="flex justify-end space-x-4">
    <Button variant="outline" className="border-slate-700 hover:bg-slate-700">
      Cancel
    </Button>
    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
      Create Problem
    </Button>
  </div>
);

export default ProblemCreationForm;
