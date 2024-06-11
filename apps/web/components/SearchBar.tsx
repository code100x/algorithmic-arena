"use client"

import * as React from "react";
import { z } from "zod"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Dialog, DialogClose, DialogContent } from "@repo/ui/dialog";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import Link from "next/link";
import { problemSchema } from "@repo/common/zod"

export function SearchBar({ problems }: { problems: z.infer<typeof problemSchema>[] }) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [searchProblems, setSearchProblems] = React.useState(problems);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [shortcut, setShortcut] = React.useState("Ctrl K");
  const scrollableContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "KeyK" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        setDialogOpen(true);
      } else if (event.code === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, searchProblems.length - 1));
      } else if (event.code === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      } else if (event.code === "Enter" && selectedIndex !== -1) {
        event.preventDefault();
        document.getElementById(`problem-link-${selectedIndex}`)?.click();
      }
      if (event.code === "ArrowDown" || event.code === "ArrowUp") {
        event.preventDefault();
        const container = scrollableContainerRef.current;
        if (container) {
          if (selectedIndex > 3) {
            const scrollAmount = event.code === "ArrowDown" ? 85 : -80;
            container.scrollBy({ top: scrollAmount, behavior: "smooth" });
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [searchProblems, selectedIndex]);

  React.useEffect(() => {
    const isMacOS = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    setShortcut(isMacOS ? "Cmd K" : "Ctrl K");
  }, []);

  React.useEffect(() => {
    const foundProblems = problems.filter((problem: z.infer<typeof problemSchema>) => {
      return (
        problem.title.toLowerCase().includes(input.toLowerCase())
      );
    });
    setSearchProblems(foundProblems);
    setSelectedIndex(-1);
  }, [input]);

  function handleClose(open: boolean) {
    if (!open) setDialogOpen(false);
    setInput("");
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={handleClose}>
      <Button variant="outline" className="flex justify-between gap-5 w-1/3" onClick={() => setDialogOpen(true)}>
        <div className="items-center hidden gap-2 md:flex justify-between w-full">
          <div className="flex">
            <MagnifyingGlassIcon className="h-[1.2rem] w-[1.2rem]" />
            Search...
          </div>
          <kbd className="bg-white/15 p-1.5 rounded-sm text-xs leading-3">{shortcut}</kbd>
        </div>
        <div className="block md:hidden">
          <MagnifyingGlassIcon className="h-[1.2rem] w-[1.2rem]" />
        </div>
      </Button>
      <DialogContent className="max-w-2xl gap-0 p-0">
        <div className="flex items-center px-4 py-2 border-b">
          <MagnifyingGlassIcon className="h-[1.5rem] w-[1.5rem]" />
          <Input
            type="text"
            placeholder="Type title"
            className="text-base border-none shadow-none focus-visible:outline-none focus-visible:ring-0"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <DialogClose>
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>
        <div className="h-[400px] overflow-y-scroll" ref={scrollableContainerRef}>
          {searchProblems.map((problem, index) => (
            <div key={problem.id} className={`p-2 ${index === selectedIndex ? "bg-blue-600/20" : ""}`}>
              <Link href={`/problem/${problem.id}`} passHref>
                <p id={`problem-link-${index}`} tabIndex={-1} style={{ display: "none" }}>
                  Navigate
                </p>
              </Link>
              <p>Title: {problem.title}</p>
              <p>Difficulty: {problem.difficulty}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

