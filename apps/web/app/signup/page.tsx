import React from "react";
import SignUpForm from "../../components/Auth/SignUpForm";

const SignUp: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <main className="w-full max-w-md p-8 md:p-12 shadow-lg rounded-lg">
        <SignUpForm />
      </main>
    </div>
  );
};

export default SignUp;
