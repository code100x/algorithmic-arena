import { ActiveContestsStatus, UpcomingContestsStatus } from "./ContestsStatus";
import calendar from "../public/svg/calendar.svg";
import Avatar from "../public/Avatar.svg";
import ContestsFeatureCode from "../public/svg/ContestsFeaturedCode.svg";
import ContestsFeatureCodeLight from "../public/svg/ContestsFeatureCode-Light.svg";
import Image from "next/image";

export function ContestsCard({ title, date, type, status }:
  {
    type?: "featured",
    title: string,
    date: string,
    status?: {
      type: "active"
    } | {
      type: "upcoming",
      date: string
    }
  }
) {
  const Action = () => (
    <>
      <button className="bg-[#3259E8] text-white px-4 py-2 rounded-xl">
        {
          status?.type === "upcoming"
            ? "Register Now"
            : "Join Now"
        }
      </button>
      <button className="text-gray-400">
        {
          status?.type === "upcoming"
            ? "View Details"
            : "View Leaderboard"
        }
      </button>
    </>
  )

  if (type === "featured") {
    return (
      <div className="md:w-full flex justify-between lg:pr-16 bg-gradient-to-b from-[#F1F5F9] to-[#FFFFFF] dark:from-[#0F172A] dark:to-[#020817] rounded-xl my-4 border border-[#E2E8F0] dark:border-[#1F2A41]">
        <div className="p-5">
          <h1 className="text-xl font-bold">{title}</h1>
          {
            status?.type === "upcoming"
              ? <UpcomingContestsStatus date={status.date} />
              : <ActiveContestsStatus />
          }
          <div className="mt-5 text-gray-400 text-sm flex items-center gap-2">
            <Image src={calendar} alt="calendar" width={16} height={16} />
            <p>{date}</p>
          </div>
          <div className="flex items-center my-4 relative">
            <Image src={Avatar} alt="avatar" width={40} />
            <Image src={Avatar} alt="avatar" className="absolute left-[20px]" width={40} />
            <Image src={Avatar} alt="avatar" className="absolute  left-[40px]" width={40} />
            <Image src={Avatar} alt="avatar" className="absolute  left-[60px]" width={40} />
            <div className="bg-[#020817] absolute left-[80px] z-10 border border-[#1F2A41] rounded-3xl py-1 text-gray-400 px-3">+94</div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <Action />
          </div>
        </div>
        {/* Image for dark mode */}
        <span className="hidden lg:dark:flex ">
          <Image
            src={ContestsFeatureCode}
            className="hidden dark:block"
            alt="ContentFeaturedCardDark"
            width={320}
            height={200}
          />
        </span>

        {/* Image for light mode */}
        <span className="hidden lg:flex dark:hidden ">
          <Image
            src={ContestsFeatureCodeLight}
            className="block dark:hidden"
            alt="ContentFeaturedCardLight"
            width={320}
            height={200}
          />
        </span>
      </div>
    )
  }
  return (
    <div className="p-5 hover:scale-[1.007] transition-all lg:w-1/4 bg-gradient-to-b from-[#F1F5F9] to-[#FFFFFF] dark:from-[#0F172A] dark:to-[#020817] rounded-xl my-4 border border-[#E2E8F0] dark:border-[#1F2A41] ">
      <h1 className="text-xl font-bold">{title}</h1>
      {
        status?.type === "upcoming"
          ? <UpcomingContestsStatus date={status.date} />
          : <ActiveContestsStatus />
      }

      <div className="mt-5 text-gray-400 text-sm flex items-center gap-2">
        <Image src={calendar} alt="calendar" width={16} height={16} />
        <p>{date}</p>
      </div>
      <div className="flex items-center my-4 relative">
        <Image src={Avatar} alt="avatar" width={40} />
        <Image src={Avatar} alt="avatar" className="absolute left-[20px]" width={40} />
        <Image src={Avatar} alt="avatar" className="absolute  left-[40px]" width={40} />
        <Image src={Avatar} alt="avatar" className="absolute  left-[60px]" width={40} />
        <div className="bg-[#020817] absolute left-[80px] z-10 border border-[#1F2A41] rounded-3xl py-1 text-gray-400 px-3">+94</div>
      </div>
      <div className="flex lg:flex-col items-center lg:items-stretch gap-4 mt-4">
        <Action />
      </div>
    </div>
  )
}
