import React from "react";
import ResetPassword from "../../components/Auth/ResetPassword";

const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <main className="w-full max-w-md p-8 md:p-12  rounded-lg">
        <ResetPassword />
      </main>
    </div>
  );
};

export default LoginPage;
