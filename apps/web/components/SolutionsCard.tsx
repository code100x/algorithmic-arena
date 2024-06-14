import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@repo/ui/card";
import { PrimaryButton } from "./LinkButton";

export const SolutionsCard = ({
  id,
  title,
  email,
  createdAt,
  language,
}: any) => {
  const duration =
    (new Date().getTime() - new Date(createdAt).getTime()) / (1000 * 60 * 60);
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>{title}</CardTitle>
          <p className="text-gray-500 dark:text-gray-400">{language}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-start gap-3">
          <p className="text-gray-500 dark:text-gray-400">
            created by ${email}
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            uploaded ${duration > 48 ? "long time" : duration} ago
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-end">
          <PrimaryButton href={`/solution/:${id}`}>Show</PrimaryButton>
        </div>
      </CardFooter>
    </Card>
  );
};
