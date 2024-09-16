import React from "react";
import VerifyOtpForm from "../../../components/Auth/VerifyOtp";

const VerifyOtp: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <main className="w-full max-w-md p-8 md:p-12 shadow-lg rounded-lg">
        <VerifyOtpForm />
      </main>
    </div>
  );
};

export default VerifyOtp;
