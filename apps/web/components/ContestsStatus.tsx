export function ActiveContestsStatus() {
  return (
    <div className="border border-[#3D9C5C] bg-green-500/10 p-4 text-[12px] px-3 text-[#3D9C5C] py-1 my-3 max-w-max rounded-lg">
      <h1>Active</h1>
    </div>
  )
}

export function UpcomingContestsStatus({ date }: { date: string }) {
  return (
    <div className="border border-[#6690FF] bg-[#3371FF1A] text-[12px] px-3 text-[#4E7AFF] py-1 my-3 max-w-max rounded-lg">
      <h1>Starts in {date}</h1>
    </div>
  )
}
