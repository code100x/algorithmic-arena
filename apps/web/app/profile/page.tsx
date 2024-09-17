import React from 'react';
import Profile from '../../components/Profile/ProfileCard';
import { ProblemSolvingOverview } from '../../components/Profile/ProblemSolvingOverview';
import { ContestStats } from '../../components/Profile/ContestStats';
import Heatmap from '../../components/Profile/Heatmap';
import RecentProblems from '../../components/Profile/RecentProblems';

type Props = {};

const ProfilePage: React.FC<Props> = () => {
  return (
    <main className="w-[1440px] h-[1138px] pl-28 pt-8 pr-28 flex gap-[24px]">
      {/* Left column with the Profile */}
      <div className="w-[289px]"> {/* Adjust the width as needed */}
        <Profile />
      </div>
      
      {/* Middle section */}
      <div className="flex flex-col flex-grow gap-6">
        {/* First row: ProblemSolvingOverview and ContestStats */}
        <div className="flex gap-6"> 
          <ProblemSolvingOverview />
          <ContestStats />
        </div>
        
        {/* Second row: Heatmap */}
        <div>
          <Heatmap />
        </div>
          <RecentProblems />
      </div>
    </main>
  );
};

export default ProfilePage;