"use client";
import { SolutionInput } from "@repo/common/zod";
import { Input } from "@repo/ui/input";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { Textarea } from "@repo/ui/textarea";
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

const SolutionForm = ({ type, problem, subCode, subLang }: any) => {
  const [title, setTitle] = useState("");
  const [explaination, setExplaintation] = useState("");
  const [languageIds, setLanguageIds] = useState([]);
  const [language, setLanguage] = useState(
    Object.keys(LANGUAGE_MAPPING)[0] as string
  );
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
    setCode(defaultCode);
  }, []);
  useEffect(() => {
    setLanguage(subLang);
    setCode({ ...code, [language]: subCode });
  });
  return (
    <div className="my-2">
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
        <div className="flex flex-col gap-3">
          <label>Explaination</label>
          <Textarea
            placeholder="Simply use sort build-in function."
            className="h-[150px]"
            value={explaination}
            onChange={(e) => {
              setExplaintation(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label>Code</label>
          <Label htmlFor="language">Language</Label>
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
