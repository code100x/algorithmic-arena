export function CTA(){
   return(
      <section className="bg-white dark:bg-[#020817]  py-6 md:py-10 ">
      <div className="flex p-4 relative items-center m-auto text-center gap-4 max-w-[1024px] border-[1px] rounded-xl bg-gradient-to-t dark:from-[#020817] dark:to-[#0F172A]">
       <div className="flex flex-col w-1/2 text-start items-start gap-4 m-4 ">
      <div className=" text-xl font-bold">Ready to Elevate Your <span className="text-blue-200">Coding Skills?</span></div>
      <div className="text-gray-600">Dive into a world of challenging contests, extensive problem libraries, and real-time leaderboards. Whether you’re aiming to sharpen your skills or compete against the best, Algorithmic Arena is your platform for growth and achievement.</div>
      <button className="p-2 border-[1px] rounded-md bg-[#4E7AFF]">Join Now</button>
       </div>
       <div className="flex grow"></div>
       <img className="absolute right-0 bottom-0 " src="a2.svg" alt="a2"/>
      </div>
    </section>
   )
}