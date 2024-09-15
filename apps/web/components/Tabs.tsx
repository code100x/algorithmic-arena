import { useState } from "react";
export default function Tabs({ TabHead, TabContent }: {
  TabHead: {
    title: string,
    key: string
  }[],
  TabContent: {
    key: string,
    content: React.ReactNode
  }[]
}) {
  const [tabSelect, setTabSelect] = useState<string>(TabHead[0]?.key ?? "");
  return (
    <>
      <div className="flex items-center gap-4">
        {
          TabHead.map((tab, index) => (
            <button
              key={index}
              onClick={() => { setTabSelect(tab.key) }}
              className={`relative transition-200 text-gray-400 dark:text-gray-400 px-4 py-2 rounded-xl`}
            >
              <span className="relative z-20">
                {tab.title}
              </span>
              {tabSelect === tab.key && (
                <span
                  className="absolute dark:bg-[#1E293B] bg-[#E2E8F0] inset-0 z-10"
                  style={{ borderRadius: 9999 }}
                />
              )}
            </button>
          ))
        }
      </div>
      <div className="block overflow-hidden">
        {
          TabContent.map((tab, index) => (
            <div
              key={index}
              className={`${tabSelect === tab.key ? "block" : "hidden"}`}
            >
              {tab.content}
            </div>
          ))
        }
      </div>
    </>
  );
}
