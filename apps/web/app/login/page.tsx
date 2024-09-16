import React from "react";
import LoginForm from "../../components/Auth/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <main className="w-full max-w-md p-8 md:p-12 shadow-lg rounded-lg">
        <LoginForm />
      </main>
    </div>
  );
};

export default LoginPage;
