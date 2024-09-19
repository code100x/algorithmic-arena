import React from "react";
import Profile from "../../components/Profile/ProfileCard";
import { ProblemSolvingOverview } from "../../components/Profile/ProblemSolvingOverview";
import { ContestStats } from "../../components/Profile/ContestStats";
import HeatMap from "../../components/Profile/HeatMap";
import RecentProblems from "../../components/Profile/RecentProblems";

type Props = {};

const ProfilePage: React.FC<Props> = () => {
  return (
    <main className="w-[1440px] h-[1138px] pl-28 pt-8 pr-28 flex gap-[24px]">
      <div className="w-[289px] h-[300px]">
        <Profile />
      </div>

      {/* Middle section */}
      <div className="flex flex-col flex-grow gap-6">
        <div className="flex gap-6">
          <ProblemSolvingOverview />
          <ContestStats />
        </div>

        <div>
          <HeatMap />
        </div>

        <div>
          <RecentProblems />
        </div>
        
      </div>
    </main>
  );
};

export default ProfilePage;
