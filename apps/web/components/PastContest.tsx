import Image from "next/image";
import calendar from "../public/svg/calendar.svg";
export default function({ contestName, date, attendee }: {
  contestName: string,
  date: string,
  attendee: string
}) {
  return (
    <div className="rounded-xl flex justify-between items-start p-3 px-2 px-5 bg-[#F1F5F9] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1F2A41]">
      <div>
        <h1 className="text-xl">{contestName}</h1>
        <div className="text-gray-400 my-2 text-sm flex items-center gap-2">
          <Image src={calendar} alt="calendar" width={16} height={16} />
          <p>{date}</p>
        </div>
      </div>
      <button className="bg-[#64748B1A] flex text:xs md:text-sm py-2 px-4 rounded-3xl">
        <span className="block md:hidden">
          {attendee}
        </span>
        <span className="hidden md:block">
          {`${attendee} Attendees`}
        </span>
      </button>
    </div>
  )
}
