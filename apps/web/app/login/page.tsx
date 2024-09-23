import React from "react";
import LoginForm from "../../components/Auth/LoginForm";
import { redirect } from "next/navigation";

const LoginPage: React.FC = () => {
  // temp redirect to login page of nextauth
  if (1 === 1) {
    redirect("/api/auth/signin");
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <main className="w-full max-w-md p-8 md:p-12  rounded-lg">
        <LoginForm />
      </main>
    </div>
  );
};

export default LoginPage;
