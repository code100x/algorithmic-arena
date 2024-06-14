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
const SolutionDialog = ({ type }: any) => {
  return (
    <Dialog>
      <DialogTrigger className="">
        {type == "add" ? "Add to solution" : <Pencil width={30} height={20} />}
      </DialogTrigger>
      <DialogContent className="overflow-hidden overflow-y-auto h-[90dvh]">
        <DialogHeader>
          <DialogTitle>Solution</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <SolutionForm type={type} />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default SolutionDialog;
