import React from "react";
import SignUpForm from "../../components/Auth/SignUpForm";
import { redirect } from "next/navigation";

const SignUp: React.FC = () => {
  // temp redirect to login page of nextauth
  if (1 === 1) {
    redirect("/api/auth/signin");
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <main className="w-full max-w-md p-8 md:p-12 rounded-lg">
        <SignUpForm />
      </main>
    </div>
  );
};

export default SignUp;
