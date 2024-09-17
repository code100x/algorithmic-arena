import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/select"

const SubmissionTracker = () => {
    const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const submissions = [
        { month: 2, day: 15 },
        { month: 2, day: 20 },
        { month: 2, day: 25 },
        { month: 3, day: 10 },
        { month: 4, day: 5 },
    ];

    const submissionsByMonthAndDay = (monthIndex: number) => {
        const daysInMonth = new Date(2024, monthIndex + 1, 0).getDate();
        const dayCount = Array(daysInMonth).fill(0);

        submissions.forEach(submission => {
            if (submission.month === monthIndex) {
                dayCount[submission.day - 1] += 1;
            }
        });

        return dayCount;
    };

    const renderMonthGrid = (monthIndex: number) => {
        const daysInMonth = new Date(2024, monthIndex + 1, 0).getDate();
        const firstDayOfMonth = new Date(2024, monthIndex, 1).getDay();
        const dayCount = submissionsByMonthAndDay(monthIndex);


        const cells = [];
        for (let i = 0; i < 35; i++) {
            const day = i - firstDayOfMonth + 1;
            const isValid = day > 0 && day <= daysInMonth;
            const submissionCount = isValid ? dayCount[day - 1] : 0;
            const bgColor = submissionCount > 2 ? 'bg-green-700' : submissionCount === 2 ? 'bg-green-500' : submissionCount === 1 ? 'bg-green-300' : 'bg-gray-400';

            cells.push(
                <div
                    key={i}
                    className={`w-2 h-2 ${isValid ? bgColor : 'bg-gray-600'}`}
                ></div>
            );
        }

        return (
            <div className="grid grid-cols-5 gap-[1.5px]">
                {cells}
            </div>
        );
    };

    return (
        <Card className="w-[903px] max-w-full h-64 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    15 submissions in the last 12 months
                </CardTitle>
                <Select defaultValue="2024">
                    <SelectTrigger className="w-[88px] h-10 bg-coolGray-900 border-gray-700">
                        <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between mb-4">
                    {months.map((month, index) => (
                        <div key={month} className="flex flex-col font-medium">
                            <div className="text-xs text-gray-500 mb-1">{month}</div>
                            {renderMonthGrid(index)}
                        </div>
                    ))}
                </div>
            </CardContent>
            <div className="flex w-[903px] h-[52px] gap-4 items-center text-sm text-blueGray-400 bg-slate-800 mt-4 px-4">
  <span>Current streak: 5</span>
  <span>Highest streak: 15</span>
</div>

        </Card>
    );
};

export default SubmissionTracker;