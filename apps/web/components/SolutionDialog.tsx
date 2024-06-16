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
const SolutionDialog = ({ type, problem, code, language }: any) => {
  return (
    <Dialog>
      <DialogTrigger className="">
        {type == "add" ? (
          <Button className="bg-green-600 mt-4 align-right" variant={"default"}>
            Add to solution
          </Button>
        ) : (
          <Pencil width={30} height={20} />
        )}
      </DialogTrigger>
      <DialogContent className="overflow-hidden overflow-y-auto h-[90dvh]">
        <DialogHeader>
          <DialogTitle>Solution</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <SolutionForm
            type={type}
            problem={problem}
            subCode={code}
            subLang={language}
          />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default SolutionDialog;
