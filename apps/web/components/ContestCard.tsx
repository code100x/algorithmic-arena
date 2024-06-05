import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@repo/ui/card"
import Link from "next/link"

interface ContestCardParams {
    title: string;
    id: string;
    time: string;
    duration: string;
}

export function ContestCard({ title, id, time, duration}: ContestCardParams) {
    return <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
        <CardContent>
        <div className="flex items-center justify-between">
            <div>
            <p className="text-gray-500 dark:text-gray-400">Start Time</p>
            <p>{time}</p>
            </div>
            <div>
            <p className="text-gray-500 dark:text-gray-400">Duration</p>
            <p>{duration}</p>
            </div>
        </div>
        </CardContent>
        <CardFooter>
        <Link
            href={`/contest/${id}`}
            className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300"
            prefetch={false}
        >
            View Contest
        </Link>
        </CardFooter>
    </Card>
}