"use client";
import { SolutionInput } from "@repo/common/zod";
import { Input } from "@repo/ui/input";
import Editor from "@monaco-editor/react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/select";
import { useEffect, useState } from "react";
import { LANGUAGE_MAPPING } from "@repo/common/language";
import { Button } from "@repo/ui/button";
import { Label } from "@repo/ui/label";
import { toast } from "react-toastify";
import MarkdownIt from "markdown-it";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const SolutionForm = ({ type, problem, subCode, subLang, setOpen }: any) => {
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const [title, setTitle] = useState("");
  const [explaination, setExplaintation] = useState(
    `## Intution:\n ## Approch:\n ## Time complexity:\n## spaceComplexity:`
  );
  const [languageIds, setLanguageIds] = useState([]);
  const [language, setLanguage] = useState(subLang);
  const [code, setCode] = useState<Record<string, string>>({});
  const handleClick = async () => {
    const languageId: any[] = languageIds.filter((ele: any) => {
      if (ele.name == language) {
        return true;
      }
    });
    if (!languageId) {
      return;
    }
    const body = {
      title,
      explaination,
      problemId: problem.id,
      languageId: languageId[0].id,
      code: code[language],
    };
    console.log("body", body);
    const result = SolutionInput.safeParse(body);
    if (!result.success) {
      toast.error("fill all the fileds before submitting");
      return;
    }
    try {
      if (type == "add") {
        const res = await axios.post("/api/solution", body);
        toast.success("solution added successfully");
        setOpen(false);
      } else {
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong");
    }
  };
  useEffect(() => {
    const fetchLanguageId = async () => {
      try {
        const res = await axios.get("/api/language");
        setLanguageIds(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLanguageId();
  }, []);
  useEffect(() => {
    const defaultCode: { [key: string]: string } = {};
    problem.defaultCode.forEach((code: any) => {
      const language = Object.keys(LANGUAGE_MAPPING).find(
        (language) => LANGUAGE_MAPPING[language]?.internal === code.languageId
      );
      if (!language) return;
      defaultCode[language] = code.code;
    });
    defaultCode[language] = subCode;
    setCode(defaultCode);
  }, []);
  function handleEditorChange({ html, text }: any) {
    console.log(html, text);
    console.log("handleEditorChange", html, text);
    setExplaintation(text);
  }
  return (
    <div className="my-2 mx-2">
      <form className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <label>Title</label>
          <Input
            required={true}
            type="text"
            placeholder="Easy to understand c++ sol."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-3 px-2">
          <label>Explaination</label>
          <MarkdownEditor
            value={explaination}
            style={{ height: "500px" }}
            renderHTML={(code) => mdParser.render(code)}
            onChange={handleEditorChange}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="language">Language</Label>
          <Select
            value={language}
            defaultValue={language}
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
          <label>Code</label>
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
              defaultLanguage="cpp"
            />
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Button
            disabled={title.length == 0}
            variant={"default"}
            className="bg-green-600 w-1/4"
            onClick={(e) => {
              e.preventDefault();
              handleClick();
            }}
          >
            {type == "update" ? "Update" : "Add"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SolutionForm;
