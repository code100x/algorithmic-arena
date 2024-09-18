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
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { Mail, Lock, GithubIcon, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const description =
  "A simple login form with email and password. The submit button says 'Sign in'.";

export default function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Card className="w-full max-w-sm mx-auto border-none">
      <CardHeader className="text-center items-center mt-0 pt-0">
        <Image src="/logo.svg" alt="logo" width={64} height={64} />
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription className="font-medium">
          Login to continue your coding journey and compete in challenges.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
            <Input
              id="email"
              type="email"
              placeholder="alex@gmail.com"
              required
              className="pl-10"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
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
          <Link href="/forgot-password" className="text-blue-500 underline">
            Forgot Password?
          </Link>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <Button
          className="w-full mb-2 bg-blue-600 text-white"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-t-2 border-white border-t-transparent rounded-full animate-spin" />
              Logging In...
            </div>
          ) : (
            "Login"
          )}
        </Button>
        <div className="relative w-full mb-4 flex items-center">
          <div className="flex-grow border-t border-blueGray-500"></div>
          <span className="flex-shrink mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-blueGray-500"></div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Button className="w-full bg-secondary text-blueGray-400 flex items-center justify-center gap-2">
            <Image
              src="/google.png"
              alt="Google"
              width={20}
              height={20}
              className="mr-2"
            />
            Continue with Google
          </Button>
          <Button className="w-full bg-secondary text-blueGray-400 flex items-center justify-center gap-2">
            <GithubIcon className="w-5 h-5 mr-2" />
            Continue with GitHub
          </Button>
        </div>
        <Link href="/signup" className=" mt-4">
          Don't have an account?{" "}
          <span className="text-blue-500 hover:underline">Sign up</span>
        </Link>
      </CardFooter>
    </Card>
  );
}
