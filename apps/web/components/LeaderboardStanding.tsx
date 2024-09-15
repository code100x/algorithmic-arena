export default function LeaderboardStanding() {
  return (
    <div className="rounded-xl py-3 flex flex-col gap-2">
      <div className="flex justify-between items-center gap-2">
        <div className="flex gap-4 items-center">
          <div className="w-10 h-10 rounded-full bg-[#1E293B] flex items-center justify-center">
            <p className="text-md text-gray-400">RJ</p>
          </div>
          <div>
            <h1 className="text-md">Rituraj Jha</h1>
            <p className="text-[#4E7AFF] text-xs">@riturajreal</p>
          </div>
        </div>
        <button className="bg-[#64748B1A] text-gray-400 text-sm py-1 px-4 rounded-3xl">
          Rank 1
        </button>
      </div>
    </div>
  )
} 
