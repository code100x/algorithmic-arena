import React from 'react';
import { Card, CardContent, CardHeader } from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import Image from 'next/image';
import Link from 'next/link'; // Import Link from next/link

type Props = {};

const ProfileCard: React.FC<Props> = () => {
    return (
        <div className="flex items-start min-h-screen">
            <Card className="text-white rounded-xl overflow-hidden b-16 p-4 w-[289px] h-[300px] bg-blueGray-900">
                <CardHeader className="flex items-center p-4 flex-row">
                    <Image
                        src="/ProfileCard.svg"
                        alt="Profile Picture"
                        width={100}
                        height={100}
                        className='space-x-m'
                    />
                    <div className="ml-4">
                        <div className="text-slate-50 text-base font-medium">Harkirat Singh</div>
                        <div className="text-blue-500 text-xs font-medium">@hkirat</div>
                        <div className="text-slate-50 text-base font-medium">Rank #1</div>
                    </div>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                    <Link href="/edit-profile"> {/* Wrap the Button in a Link */}
                        <Button className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Edit Profile
                        </Button>
                    </Link>
                    <div className="flex flex-wrap gap-2">
                        {['javascript', 'cpp', 'python', 'rust'].map((lang) => (
                            <div key={lang} className="px-3 py-1 bg-slate-500/10 rounded-full border-slate-800 flex items-center justify-center gap-2">
                                <div className="text-slate-400 text-sm font-medium leading-tight">
                                    {lang}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfileCard;