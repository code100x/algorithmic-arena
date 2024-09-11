"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Code from "../public/svg/Code.svg";
import BarChart from "../public/svg/BarChart.svg";
import Bookmark from "../public/svg/Bookmark.svg";
import User from "../public/svg/User.svg";
import LogOut from "../public/svg/LogOut.svg";
import Trophy from "../public/svg/Trophy.svg";
import Close from "../public/svg/Close.svg";
import { useSession } from "next-auth/react";
import Toggle from "../public/svg/toggle.svg";
import { signIn } from "next-auth/react";
import { Button } from "@repo/ui/button";
import { ModeToggle } from "./ModeToggle";
import logo from "../public/logo.svg";
import Avatar from "../public/Avatar.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
export function Appbar() {
  const { data: session, status: sessionStatus } = useSession();
  const [toggle, setToggle] = useState(false);
  const isLoading = sessionStatus === "loading";
  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = "hidden";
    }
    else {
      document.body.style.overflow = "auto";
    }
  }, [toggle]);
  return (
    <header className="bg-background border-b border-gray-800 text-white px-4 md:px-6 py-3 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <Image src={logo} alt="Code100x" />
        <div className="text-sm font-bold">
          <div className="text-foreground">algorithmic</div>
          <div className="text-primary">arena</div>
        </div>
      </Link>
      <div className="flex items-center gap-4">
        {!isLoading && session?.user && (
          <>
            <nav className="hidden text-foreground md:flex items-center gap-6 mx-5">
              <Link href="/contests" className="opacity-80 hover:underline" prefetch={false}>
                Contests
              </Link>
              <Link href="/problems" className="opacity-80 hover:underline" prefetch={false}>
                Problems
              </Link>
              <Link href="/standings" className="opacity-80 hover:underline" prefetch={false}>
                Leaderboards
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Image className="hidden md:flex" src={Avatar} alt="avatar" />
              <div onClick={() => setToggle(!toggle)} className="border cursor-pointer md:hidden border-gray-800 p-3 rounded-lg">
                <Image src={toggle ? Toggle : Toggle} alt="toggle" />
              </div>
              <ModeToggle />
            </div>
          </>
        )}

        {!isLoading && !session?.user && (
          <div className="flex items-center gap-4">
            <div onClick={() => setToggle(!toggle)} className="border cursor-pointer md:hidden border-gray-800 p-3 rounded-lg">
              <Image src={toggle ? Toggle : Toggle} alt="toggle" />
            </div>
            <ModeToggle />
            <Button className="hidden dark:bg-[#020817] md:flex text-white" onClick={() => signIn()}>Sign Up Now</Button>
          </div>
        )}
        <AnimatePresence>
          {toggle &&
            <motion.div
              transition={{ type: "spring", duration: 0.5 }}
              animate={{ x: "0%" }}
              initial={{ x: "-100%" }}
              exit={{ x: "-100%" }}
              className="absolute overflow-hidden text-primary top-0 left-0 bg-white dark:bg-[#020817] rounded-lg shadow-md w-full z-[999] min-h-screen">

              <div className="border-b border-gray-800">
                <div className="flex items-center justify-between p-4">
                  <Link href="/" className="flex items-center gap-2" prefetch={false}>
                    <Image src={logo} alt="Code100x" />
                    <div className="text-sm font-bold">
                      <div className="text-foreground">algorithmic</div>
                      <div className="text-primary">arena</div>
                    </div>
                  </Link>
                  <Image className="cursor-pointer" src={Close} alt="close" onClick={() => setToggle(false)} />
                </div>
              </div>

              {
                session?.user ? (
                  <>
                    <div className="px-4 border-b flex flex-col py-8 gap-8 border-gray-800">
                      <div className="flex gap-4 items-center">
                        <Image src={Avatar} alt="avatar" width={40} height={40} />
                        <div>
                          <h1 className="text-md">Rituraj Jha</h1>
                          <p className="text-[#4E7AFF] text-xs">@riturajreal</p>
                        </div>
                      </div>
                      <div className="flex gap-8 flex-col">
                        <Link href="/problems">
                          <div className="flex gap-2 items-center ">
                            <Image src={Code} alt="code" width={20} height={20} />
                            <p className="text-lg">Problems</p>
                          </div>
                        </Link>
                        <Link href="/contests">
                          <div className="flex gap-2 items-center ">
                            <Image src={Trophy} alt="trophy" width={20} height={20} />
                            <p className="text-lg">Contests</p>
                          </div>
                        </Link>
                        <Link href="/standings">
                          <div className="flex gap-2 items-center ">
                            <Image src={BarChart} alt="bar chart" width={20} height={20} />
                            <p className="text-lg">Leaderboards</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="flex gap-8 px-4 py-8 flex-col border-b border-gray-800">
                      <div className="flex gap-2 items-center ">
                        <Image src={Bookmark} alt="bookmark" width={20} height={20} />
                        <p className="text-lg">Bookmarks</p>
                      </div>
                      <div className="flex gap-2 items-center ">
                        <Image src={User} alt="profile" width={20} height={20} />
                        <p className="text-lg">Profile</p>
                      </div>
                    </div>
                    <div className=" px-4 pt-8 flex gap-2 items-center ">
                      <Image src={LogOut} alt="profile" width={20} height={20} />
                      <p className="text-lg">Log Out</p>
                    </div>
                  </>
                ) : (
                  <div className="flex gap-8 px-4 py-8 flex-col">
                    <Button className="dark:bg-[#3259E8] text-white" onClick={() => signIn()}>Sign Up Now</Button>
                  </div>
                )
              }
            </motion.div>
          }
        </AnimatePresence>

      </div>
      {isLoading && <div className="flex items-center gap-4"></div>}
    </header>
  );
}
