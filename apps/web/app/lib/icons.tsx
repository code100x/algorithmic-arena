import { CheckCircle, Clock8, Minus } from "lucide-react";

export const problemStatusIcons = {
  PENDING: <Minus className="h-5 w-5 text-muted-foreground" />,
  AC: <CheckCircle className="h-5 w-5 text-green-500" />,
  REJECTED: <Clock8 className="h-5 w-5 text-[#FB923C]" />,
};
