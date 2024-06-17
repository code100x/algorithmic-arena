"use client";
import { CopyIcon, TrashIcon } from "lucide-react";
import { toast } from "react-toastify";
import { PrimaryButton } from "./LinkButton";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import remarkGfm from "remark-gfm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/dropdown";
import axios from "axios";
import { useState } from "react";
import { Button } from "@repo/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  solarizedlight,
  atomDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
const Solution = ({
  id,
  title,
  explaination,
  code,
  language,
  email,
  problem,
  problemId,
}: any) => {
  const { data: session, status } = useSession();
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    toast("Deleting the solution");
    try {
      console.log(id);
      const res = await axios.delete(`/api/solution/${id}`);
      console.log(res.data);
      toast.success("solution deleted successfully");
      setOpen(false);
      router.back();
    } catch (err) {
      console.log(err);
      toast.error("something went wrong on deleting solution");
    }
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCopied(false);
  };
  return (
    <div className="my-2 mx-10">
      <div className="border border-gray-400 px-4 py-2 rounded-xl">
        <div className="flex justify-between my-2">
          <p className="font-[20px] text-2xl text-center w-full">Solution</p>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger>
              <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col items-start">
              {session && session?.user?.email == email && (
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete();
                  }}
                  className="cursor-pointer"
                >
                  <p className="flex gap-3">
                    {" "}
                    delete
                    <TrashIcon
                      width={30}
                      height={20}
                      className="cursor-pointer"
                    />
                  </p>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center justify-between my-1">
          <p>
            <span className="text-gray-500 dark:text-gray-400">Problem: </span>{" "}
            {problem}
          </p>
          <PrimaryButton href={`/problem/${problemId}`}>
            Solve yourself
          </PrimaryButton>
        </div>
        <div className="my-2">
          <p className="text-4xl">{title}</p>
        </div>
        <div>
          <div className="prose prose-md text-gray-600 w-full">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {explaination}
            </ReactMarkdown>
          </div>
          <div className="flex items-center justify-end">
            <p className="text-gray-500 dark:text-gray-400">by {email}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-start">
            <p className="text-gray-500 dark:text-gray-400 my-2">Code</p>
          </div>
          <div
            className="relative rounded-xl border border-gray-400 px-3 py-2 shadow-md"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <SyntaxHighlighter
              customStyle={{ borderRadius: "10px" }}
              style={atomDark}
              language={language == "js" ? "javascript" : language}
            >
              {code}
            </SyntaxHighlighter>
            {isHovered && (
              <div
                className={`absolute top-2 right-2 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
              >
                <Button
                  className="bg-gray-300 hover:bg-gray-600 text-black font-bold py-1 px-2 rounded inline-flex items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    setCopied(true);
                    navigator.clipboard.writeText(code);
                    setTimeout(() => {
                      setCopied(false);
                    }, 2000);
                  }}
                >
                  {!copied ? <CopyIcon className="cursor-pointer" /> : "copied"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solution;
