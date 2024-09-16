import Link from "next/link";
export function Hero() {
  return (
    <section className="bg-white dark:bg-[#020817] m-4 md:m-0 py-4 md:py-6">
      <div className="mx-auto px-4 md:px-6 flex flex-col justify-center items-center gap-0">
        <div className="flex flex-col justify-center text-center gap-3 ">
          <div className="text-6xl font-bold">Conquer the Code at</div>
          <div className="text-6xl text-[#4E7AFF] font-bold">
            Algorithmic Arena
          </div>
          <div className="text-sm text-gray-600">
            Join elite coders, solve problems, and climb leaderboards at
            Algorithmic Arena{" "}
          </div>
          <div className="flex justify-center flex-col md:flex-row gap-4 mt-4">
            <Link
              href={"/api/auth/signin"}
              className="border-[1px] border-gray-600 px-4 py-2 rounded-sm bg-[#4E7AFF]"
            >
              Start Solving{" "}
            </Link>
            <Link
              href={"/#features"}
              className="border-[1px] border-gray-600 px-4 py-2 rounded-sm"
            >
              Explore Features
            </Link>
          </div>
        </div>
        <div className="">
          {/* Light Mode Image */}
          <img
            className="block dark:hidden "
            src="/HeroSectionLightImage.svg"
            alt="Light mode hero image"
          />
          {/* Dark Mode Image */}
          <img
            className="hidden dark:block "
            src="/HeroSectionDarkImage.svg"
            alt="Dark mode hero image"
          />
        </div>
      </div>
    </section>
  );
}
