import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@repo/ui/card"
import Link from "next/link"
import { parseFutureDate, parseOldDate } from "../app/lib/time";

interface ContestCardParams {
    title: string;
    id: string;
    endTime: Date;
    startTime: Date;
}

export function ContestCard({ title, id, startTime, endTime }: ContestCardParams) {
    const duration = `${(new Date(endTime).getTime() - new Date(startTime).getTime()) / (1000 * 60 * 60)} hours`;
    const isActive = startTime.getTime() < Date.now() && endTime.getTime() > Date.now();

    return <Card>
            <CardHeader>
                <div className="flex justify-between">
                    <CardTitle>{title}</CardTitle>
                    <div>
                        {startTime.getTime() < Date.now() && endTime.getTime() < Date.now() ? <div className="text-red-500">Ended</div> : null}
                        {isActive ? <div className="text-green-500">Active</div> : null}
                        {endTime.getTime() < Date.now() ? <div className="text-red-500">Ended</div> : null}
                    </div>
                </div>
            </CardHeader>
        <CardContent>
        <div className="flex items-center justify-between">
            <div>
            <p className="text-gray-500 dark:text-gray-400">{startTime.getTime() < Date.now() ? "Started" : "Starts in"}</p>
            <p>{startTime.getTime() < Date.now() ? parseOldDate(new Date(startTime)) : parseFutureDate(new Date(startTime))}</p>
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
            {isActive ?  "Participate" : "View Contest"} 
        </Link>
        </CardFooter>
    </Card>
}