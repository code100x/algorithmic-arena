import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@repo/ui/card";
import { PrimaryButton } from "./LinkButton";
const formatDate = (timestamp: any) => {
  const date = new Date(timestamp);
  const options: any = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "UTC",
  };
  return date.toLocaleString(options);
};
export const SolutionsCard = ({
  id,
  title,
  email,
  createdAt,
  language,
}: any) => {
  const time = formatDate(createdAt);
  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <CardTitle>{title} </CardTitle>
            <p className="text-gray-500 dark:text-gray-400">
              created by {email}
            </p>
            <p className="text-gray-500 dark:text-gray-400">{language}</p>
          </div>
        </CardHeader>
        <CardContent className="w-full">
          <div className="flex items-center justify-start gap-3"></div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center justify-between gap-10 w-full">
            <PrimaryButton href={`/solution/${id}`}>Show</PrimaryButton>
            <p className="text-gray-500 dark:text-gray-400">
              uploaded on {time}
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
