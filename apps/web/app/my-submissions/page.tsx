import React from "react";
import MySubmissionsTable from "../../components/Tables/MySubmissionsTable";


const SubmissionHistory = () => {
  

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto py-8 px-4 text-white">
      <h1 className="text-2xl font-bold dark:text-white text-black">
        All Submissions
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        A Timeline of Your Submissions
      </p>

      {/* <div className="grid grid-cols-3 gap-4 mb-6"> */}
        <MySubmissionsTable />
    {/* </div> */}
    </div>
  );
};

export default SubmissionHistory;
