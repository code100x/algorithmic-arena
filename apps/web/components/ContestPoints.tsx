"use client";
import { useEffect, useState } from "react";
import { parseClock } from "../app/lib/time";

export const ContestPoints = ({ points }: { points: number }) => {
  return (
    <main className="flex-1 md:py-8 rounded-lg shadow-md px-4 md:px-6">
      <div className="flex items-center justify-center text-gray-500 dark:text-gray-400">
        <div>{points} points</div>
      </div>
    </main>
  );
};
