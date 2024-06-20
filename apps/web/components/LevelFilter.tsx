"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/select";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export const LevelFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLevel = searchParams.get("level")

  const handleChange = (value: string) => {
    if (value === "none") {
      router.push(`/problems`);
    } else {
      router.push(`/problems?level=${value}`);
    }
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={currentLevel ? currentLevel : "Select a Difficulty"} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">Select a Difficulty</SelectItem>
        <SelectItem value="easy">Easy</SelectItem>
        <SelectItem value="medium">Medium</SelectItem>
        <SelectItem value="hard">Hard</SelectItem>
      </SelectContent>
    </Select>
  );
};

