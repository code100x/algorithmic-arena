import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function ProblemStatement({ description }: { description: string }) {
  return (
    <div className="prose lg:prose-xl">
      <Markdown remarkPlugins={[remarkGfm]}>{description}</Markdown>
    </div>
  );
}
