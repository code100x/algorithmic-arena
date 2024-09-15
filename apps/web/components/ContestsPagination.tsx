import PaginationLeftArrow from "../public/svg/PaginationLeftArrow.svg";
import PaginationRightArrow from "../public/svg/PaginationRightArrow.svg";
import Image from "next/image";
export default function ContestsPagination() {
  return (
    <div className="text-gray-400 text-[16px] md:text-sm flex  text-black dark:text-white gap-2">
      <button className="bg-[#F1F5F9] border-2 hover:border-[#4E7AFF] dark:bg-[#0F172A]  py-1 px-2 md:px-4 md:py-2 rounded-md md:rounded-xl">
        <Image src={PaginationLeftArrow} alt="left arrow" width={16} height={16} />
      </button>
      <button className="bg-[#4E7AFF] border-2 border-[#4E7AFF] py-1 px-2 md:px-4 md:py-2 rounded-md md:rounded-xl">
        1
      </button>
      <button className="bg-[#F1F5F9] border-2 hover:border-[#4E7AFF] dark:bg-[#0F172A] py-1 px-2 md:px-4 md:py-2 rounded-md md:rounded-xl">
        2
      </button>
      <button className="bg-[#F1F5F9] border-2 hover:border-[#4E7AFF] dark:bg-[#0F172A] py-1 px-2 md:px-4 md:py-2 rounded-md md:rounded-xl">
        ...
      </button>
      <button className="bg-[#F1F5F9] border-2 hover:border-[#4E7AFF] dark:bg-[#0F172A] py-1 px-2 md:px-4 md:py-2 rounded-md md:rounded-xl">
        9
      </button>
      <button className="bg-[#F1F5F9] border-2 hover:border-[#4E7AFF] dark:bg-[#0F172A] py-1 px-2 md:px-4 md:py-2 rounded-md md:rounded-xl">
        10
      </button>
      <button className="bg-[#F1F5F9] border-2 hover:border-[#4E7AFF] dark:bg-[#0F172A] py-1 px-2 md:px-4 md:py-2 rounded-md md:rounded-xl">
        <Image src={PaginationRightArrow} alt="right arrow" width={16} height={16} />
      </button>
    </div>
  )
}
