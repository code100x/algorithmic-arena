"use client";
import Editor from "@monaco-editor/react";
import { CopyIcon, TrashIcon } from "lucide-react";
import { toast } from "react-toastify";
import { PrimaryButton } from "./LinkButton";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/dropdown";
import SolutionDialog from "./SolutionDialog";
import axios from "axios";
import { revalidatePath } from "next/cache";
const Solution = ({
  title,
  explaination,
  code,
  language,
  email,
  problem,
  problemId,
}: any) => {
  const router = useRouter();
  const handleDelete = async () => {
    toast("Deleting the solution");
    try {
      const res = await axios.delete(`/api/solution/:${23}`);
      revalidatePath(`/solutions/:${problemId}`);
      toast.success("solution deleted successfully");
      router.push(`/solutions/:${problemId}`);
    } catch (err) {
      console.log(err);
      toast.error("something went wrong on deleting solution");
    }
  };
  return (
    <div className="my-2 mx-10">
      <div className="border border-gray-400 px-4 py-2 rounded-xl">
        <div className="flex justify-between my-2">
          <p className="font-[20px] text-2xl text-center ">Solution</p>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col items-start">
              <DropdownMenuItem>
                <TrashIcon
                  width={30}
                  height={20}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete();
                  }}
                />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SolutionDialog type="update" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center justify-between">
          <p>
            <span className="text-gray-500 dark:text-gray-400">Problem</span>{" "}
            {problem}
          </p>
          <PrimaryButton href={`/problem/:${problemId}`}>
            Solve yourself
          </PrimaryButton>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Title</p>
          <p>{title}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Explaination</p>
          <p>{explaination}</p>
          <div className="flex items-center justify-end">
            <p className="text-gray-500 dark:text-gray-400">by {email}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <p className="text-gray-500 dark:text-gray-400 my-2">Code</p>
            <CopyIcon
              className="cursor-pointer"
              onClick={(e) => {
                navigator.clipboard.writeText(code);
                toast.success("copied");
              }}
            />
          </div>
          <Editor
            height="500px"
            defaultLanguage={language}
            value={code}
            theme="vs-dark"
            options={{
              fontSize: 14,
              readOnly: true,
              lineNumbers: "on",
              minimap: { enabled: false },
              automaticLayout: true,
              scrollBeyondLastLine: false,
              renderIndentGuides: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Solution;
