"use client";

import { RoadmapLanding } from "./RoadmapLanding";



export function Roadmap({ problems }: { problems: { id: number; title: string; difficulty: string }[] }) {
  return (
    <div className="flex flex-col items-center"> 
      <h1 className="text-5xl font-bold mt-4">Roadmap -<span className="text-[#4E7AFF]"> DSA</span> </h1> 
      
      <RoadmapLanding problems={problems} />
    </div>
  );
}
