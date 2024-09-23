export function HowItWork (){
   const steps = [
      {
        heading: 'Sign Up or Log In',
        description:
          'Create your account by signing up with your email, Google, or GitHub. If you are already a member, simply log in to access your profile and start coding right away.',
      },
      {
        heading: 'Choose a Contest or Problem',
        description:
          'Explore our regularly scheduled coding contests and select one that fits your skill level or interests. Alternatively, dive into our extensive problem library to tackle challenges at your own pace.',
      },
      {
        heading: 'Start Coding',
        description:
          'Use our interactive coding environment to write, test, and submit your solutions directly on the platform. Receive instant feedback to refine your approach.',
      },
      {
        heading: 'Track Your Progress',
        description:
          'Monitor your ranking on real-time leaderboards and analyze your performance with detailed analytics. This insight helps you understand your strengths and pinpoint areas for improvement.',
      },
    ];
  
    return (
      <section className="bg-white  bg-gradient-to-t dark:from-[#020817] dark:to-[#0F172A] py-6 md:py-10 ">
        <div className="flex flex-col items-center m-auto text-center gap-4 max-w-[1024px]">
          <div className="text-5xl font-bold">
            How it <span className="text-[#4E7AFF]">Works?</span>
          </div>
          <div className="text-sm text-gray-500 w-2/3">
          Follow these simple steps to get started, compete in challenges, and track your progress on Algorithmic Arena.
          </div>
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2 p-2 ">
            {steps.map((lang: any, index: number) => (
              <div
                className={`border-[1px] rounded-md p-4  text-start gap-2 flex flex-col  ${
                  index % 2 === 0 ? 'mr-0' : 'ml-0'
                } `}
                key={index}
              >
                <div className="flex flex-col gap-1 items-start p">
                  <div className="flex py-[2px] px-4 rounded-3xl bg-blue-200 text-[#4E7AFF]"> Step {index+1}</div>
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