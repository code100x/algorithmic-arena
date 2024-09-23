import React from "react";
import { Button } from "@repo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/tabs";
import { Badge } from "@repo/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/table";

const CodeEditorInterface = () => {
  return (
    <div className="bg-gray-900 text-white p-6 flex flex-col lg:flex-row gap-6">
      {/* Problem Description and Submissions */}
      <Tabs defaultValue="problem">
        <Card className="bg-gray-800 text-white flex-1">
          <CardHeader className="pb-2">
            <TabsList>
              <TabsTrigger value="problem">Problem</TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <TabsContent value="problem">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <span className="text-blue-400">&lt;/&gt;</span> Reverse an
                    Array
                  </h2>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Easy</Badge>
                    <span className="text-sm text-gray-400">
                      10k Submissions
                    </span>
                    <Button variant="ghost" size="icon">
                      <BookmarkIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-gray-300">
                  Given an array arr of integers, your task is to write a
                  function that reverses the array. The reversed array should
                  have the elements in the opposite order compared to the
                  original array.
                </p>
                <div className="space-y-2">
                  <h3 className="font-semibold">Example 1</h3>
                  <Card className="bg-gray-700 p-3">
                    <p>
                      <span className="font-semibold">Input:</span> arr = [1, 2,
                      3, 4, 5]
                    </p>
                    <p>
                      <span className="font-semibold">Output:</span> [5, 4, 3,
                      2, 1]
                    </p>
                  </Card>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Constraints</h3>
                  <ul className="list-disc list-inside text-gray-300">
                    <li>1 &lt;= len(arr) &lt;= 10^4</li>
                    <li>1 &lt;= arr[i] &lt;= 10^4</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Related Topics</h3>
                  <div className="flex gap-2">
                    <Badge variant="secondary">Array</Badge>
                    <Badge variant="secondary">Two Pointers</Badge>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="submissions">
              <div className="space-y-4">
                <div className="flex justify-between mb-4">
                  <Select defaultValue="status">
                    <SelectTrigger className="w-[150px] bg-gray-900">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="status">Status</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="incorrect">Incorrect</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="language">
                    <SelectTrigger className="w-[150px] bg-gray-900">
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="language">Language</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon">
                    <RefreshIcon className="h-4 w-4" />
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Language</TableHead>
                      <TableHead>Runtime</TableHead>
                      <TableHead>Memory</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Badge
                            variant={
                              submission.status === "Accepted"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {submission.status}
                          </Badge>
                          <span className="ml-2 text-xs text-gray-400">
                            {submission.time}
                          </span>
                        </TableCell>
                        <TableCell>{submission.language}</TableCell>
                        <TableCell>{submission.runtime}</TableCell>
                        <TableCell>{submission.memory}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex justify-center mt-4 space-x-2">
                  <Button variant="outline" size="sm">
                    &lt;
                  </Button>
                  <Button variant="outline" size="sm">
                    1
                  </Button>
                  <Button variant="ghost" size="sm">
                    2
                  </Button>
                  <Button variant="ghost" size="sm">
                    ...
                  </Button>
                  <Button variant="ghost" size="sm">
                    9
                  </Button>
                  <Button variant="ghost" size="sm">
                    10
                  </Button>
                  <Button variant="outline" size="sm">
                    &gt;
                  </Button>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Card>

        {/* Code Editor */}
        <Card className="bg-gray-800 text-white flex-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <Select defaultValue="javascript">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">Javascript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <SettingsIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MaximizeIcon className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto">
              <code className="text-sm text-gray-300">
                {`class Solution {
    twoSum(nums, target) {
        const n = nums.length;
        
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                if (nums[i] + nums[j] === target) {
                    return [i, j];
                }
            }
        }
        
        return [-1, -1];
    }
}`}
              </code>
            </pre>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline">Run Code</Button>
              <Button>Submit</Button>
            </div>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

const BookmarkIcon = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
  </svg>
);

const SettingsIcon = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const MaximizeIcon = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M8 3H5a2 2 0 0 0-2 2v3" />
    <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
    <path d="M3 16v3a2 2 0 0 0 2 2h3" />
    <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
  </svg>
);

const RefreshIcon = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 2v6h-6" />
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
    <path d="M3 22v-6h6" />
    <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
  </svg>
);

const submissions = [
  {
    status: "Accepted",
    time: "Submitted at 21 August, 2024 10:22 AM",
    language: "cpp",
    runtime: "14ms",
    memory: "12md",
  },
  {
    status: "Incorrect",
    time: "Submitted at 21 August, 2024 10:22 AM",
    language: "cpp",
    runtime: "N/A",
    memory: "N/A",
  },
  {
    status: "Incorrect",
    time: "Submitted at 21 August, 2024 10:22 AM",
    language: "cpp",
    runtime: "N/A",
    memory: "N/A",
  },
  {
    status: "Accepted",
    time: "Submitted at 21 August, 2024 10:22 AM",
    language: "cpp",
    runtime: "320ms",
    memory: "22mb",
  },
  {
    status: "Incorrect",
    time: "Submitted at 21 August, 2024 10:22 AM",
    language: "cpp",
    runtime: "N/A",
    memory: "N/A",
  },
];

export default CodeEditorInterface;
