import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function ProblemStatement({ description }: { description: string }) {
  console.log('Description : ', description)
  return (
    <div className="relative w-full h-[calc(100%-50px)] overflow-y-auto dark:bg-black">
      <div id="description-body" className="mt-[36px] text-[#f5f5f5] ml-[26px] text-[14px]" >
        <Markdown remarkPlugins={[remarkGfm]}>{description}</Markdown>
      </div>
    </div>
  );
}
