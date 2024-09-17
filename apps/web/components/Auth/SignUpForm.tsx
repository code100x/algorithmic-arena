"use client";

import { useState } from "react";
import { Button } from "@repo/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { Input } from "../../../../packages/ui/src/@/components/ui/input";
import {
  User,
  Mail,
  Lock,
  GithubIcon,
  Eye,
  EyeOff,
  CircleUser,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SignUpForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignUp = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Card className="w-full max-w-sm mx-auto border-none">
      <CardHeader className="text-center items-center mt-0 pt-0">
        <Image src="/logo.svg" alt="logo" width={64} height={64} />
        <CardTitle className="text-2xl font-bold">
          Join Algorithmic Arena
        </CardTitle>
        <CardDescription className="font-medium">
          Sign up to start your coding journey, compete in contests, and solve
          challenges.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
            <Input
              id="username"
              type="text"
              placeholder="Username"
              required
              className="pl-10"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <div className="relative">
            <CircleUser
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
            <Input
              id="name"
              type="text"
              placeholder="Name"
              required
              className="pl-10"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              required
              className="pl-10"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
            <Input
              id="password"
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              required
              className="pl-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <Button
          className="w-full mb-2 bg-blue-600 text-white"
          onClick={handleSignUp}
          disabled={loading}
        >
          <Link
              href="/signup/verify-otp"
              className="w-full flex items-center justify-center gap-2"
            >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-t-2 border-white border-t-transparent rounded-full animate-spin" />
              Signing Up...
            </div>
          ) : (
            "Sign Up Now"
          )}
          </Link>
        </Button>
        <div className="relative w-full mb-4 flex items-center">
          <div className="flex-grow border-t border-blueGray-500"></div>
          <span className="flex-shrink mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-blueGray-500"></div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Button className="w-full bg-primary-foreground text-gray-500 flex items-center justify-center gap-2">
            <Link
              href="/signup/complete-profile"
              className="w-full flex items-center justify-center gap-2"
            >
              <Image
                src="/google.png"
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
              />
              Continue with Google
            </Link>
          </Button>

          <Button className="w-full bg-primary-foreground text-gray-500 flex items-center justify-center gap-2">
            <Link
              href="/signup/complete-profile"
              className="w-full flex items-center justify-center gap-2"
            >
              <GithubIcon className="w-5 h-5 mr-2 dark:text-white text-black" />
              Continue with GitHub
            </Link>
          </Button>
        </div>
        <Link href="/login" className=" mt-4">
          Already have an account?{" "}
          <span className="text-blue-500 hover:underline">Login</span>
        </Link>
      </CardFooter>
    </Card>
  );
}
