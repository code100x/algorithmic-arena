import { Badge } from "./ui/badge";
import { cn } from "../lib/utils";
import { capitalize } from "@repo/common/utils";

const difficultyColors = {
  EASY: "bg-green-500 text-green-600",
  MEDIUM: "bg-orange-600 text-orange-400",
  HARD: "bg-red-600 text-red-500",
};

export default function DifficultyBadge({
  difficulty,
}: {
  difficulty: "EASY" | "MEDIUM" | "HARD";
}) {
  return (
    <div
      className={`${cn(difficultyColors[difficulty], "bg-opacity-10 py-1 px-3 rounded-full w-fit text-sm h-fit")}`}
    >
      {capitalize(difficulty)}
    </div>
  );
}
