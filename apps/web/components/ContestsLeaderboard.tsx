import Image from "next/image";
import ArrowRight from "../public/svg/PaginationRightArrow.svg";
import LeaderboardStanding from "./LeaderboardStanding";
export default function ContestsLeaderboard() {
  return (
    <div className="border my-6  px-4 py-3  rounded-xl border-[#E2E8F0] dark:border-[#1F2A41]" >
      <div className="flex gap-5 mb-3 justify-between items-center">
        <h1 className="text-xl">Leaderboard</h1>
        <button className="bg-[#3371FF1A] text-[#4E7AFF] flex items-center gap-2 text-xs py-2 px-4 rounded-3xl">
          View Leaderboard <span><Image className="fill-[#4E7AFF]" src={ArrowRight} alt="arrow right" width={16} height={16} /></span>
        </button>
      </div>
      <LeaderboardStanding />
      <LeaderboardStanding />
      <LeaderboardStanding />
      <LeaderboardStanding />
    </div>
  )
}
