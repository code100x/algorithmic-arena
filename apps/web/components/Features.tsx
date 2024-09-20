export function Features() {
  const Features = [
    {
      heading: "Competitive Coding Contests",
      description:
        "Participate in challenging coding contests regularly, testing your skills against the best. Improve your problem-solving abilities and climb the leaderboards with each competition.",
    },
    {
      heading: "Real-Time Leaderboards",
      description:
        "Track your progress with dynamic leaderboards that update in real-time. See where you stand in the global coding community and strive to improve your rank.",
    },
    {
      heading: "Vast Problem Library",
      description:
        "Access a diverse collection of coding problems across various topics and difficulty levels. Challenge yourself with beginner to expert-level tasks and enhance your coding skills.",
    },
    {
      heading: "Detailed Problem Descriptions",
      description:
        "Each problem comes with clear and comprehensive descriptions, including input/output examples. Understand the task at hand and approach each problem with confidence.",
    },
    {
      heading: "Seamless Coding",
      description:
        "Code directly on the platform with our interactive coding environment. Write, test, and submit your solutions seamlessly without needing any external tools.",
    },
    {
      heading: "Multilingual Support",
      description:
        "Solve problems using your preferred programming language. Our platform supports multiple languages, allowing you to code comfortably in the language you excel at.",
    },
  ];

  return (
    <section
      className="bg-white dark:bg-[#020817] py-6 md:py-10 "
      id="features"
    >
      <div className="flex flex-col items-center m-auto text-center gap-4 max-w-[1024px]">
        <div className="text-5xl font-bold">
          Platform <span className="text-[#4E7AFF]">Features</span>
        </div>
        <div className="text-sm text-gray-500 w-full md:w-2/3">
          Unlock the Full Potential of Competitive Programming with These Key
          Features
        </div>
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2 p-2 ">
          {Features.map((lang: any, index: number) => (
            <div
              className={`border-[1px] rounded-md p-2 text-start gap-2 flex flex-col  ${
                index % 2 === 0 ? "mr-0" : "ml-0"
              }`}
              key={index}
            >
              <div className="flex gap-2 items-center">
                <div>
                  <img src="/LinkArrowFeature.svg" alt="back" />
                </div>
                <div className="font-bold">{lang.heading}</div>
              </div>
              <div className="text-gray-500">{lang.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
