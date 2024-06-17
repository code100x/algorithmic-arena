"use client";
import SolutionForm from "./SolutionForm";
import { Button } from "@repo/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/dialog";
import { Pencil } from "lucide-react";
import { useState } from "react";
const SolutionDialog = ({ type, problem, code, language }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="">
        {type == "add" ? (
          <Button className="bg-green-600 mt-4 align-right" variant={"default"}>
            Add to solution
          </Button>
        ) : (
          <Pencil width={30} height={20} />
        )}
      </DialogTrigger>
      <DialogContent className="overflow-hidden overflow-y-auto overflow-x-auto  h-[90dvh] max-w-5xl">
        <DialogHeader>
          <DialogTitle>{type == "add" ? "Add" : "Update"} Solution</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <SolutionForm
            type={type}
            problem={problem}
            subCode={code}
            subLang={language}
            setOpen={setOpen}
          />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default SolutionDialog;
