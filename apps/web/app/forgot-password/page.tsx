import React from "react";
import { ForgotPasswordPage } from "../../components/Auth/ForgotPasswordForm";

const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <main className="w-full max-w-md p-8 md:p-12  rounded-lg">
        <ForgotPasswordPage />
      </main>
    </div>
  );
};

export default LoginPage;
