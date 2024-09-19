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
import { Label } from "@repo/ui/label";
import { Lock, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function ResetPassword() {
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleResetPassword = async () => {
    setLoading(true);
    // Simulate a reset password process with a timeout
    setTimeout(() => {
      setLoading(false);
      // Add your reset password logic here
    }, 2000);
  };

  return (
    <Card className="w-full max-w-sm mx-auto border-none">
      <CardHeader className="text-center items-center mt-0 pt-0">
        <Image src="/logo.svg" alt="logo" width={64} height={64} />
        <CardTitle className="text-2xl font-bold">
          Create New Password
        </CardTitle>
        <CardDescription className="font-medium">
          Please enter a new password for your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="new-password">New Password</Label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
            <Input
              id="new-password"
              type={newPasswordVisible ? "text" : "password"}
              placeholder="New Password"
              required
              className="pl-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={toggleNewPasswordVisibility}
            >
              {newPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
            <Input
              id="confirm-password"
              type={confirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm Password"
              required
              className="pl-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={toggleConfirmPasswordVisibility}
            >
              {confirmPasswordVisible ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <Button
          className="w-full mb-2 bg-blue-600 text-white"
          onClick={handleResetPassword}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-t-2 border-white border-t-transparent rounded-full animate-spin" />
              Resetting Password...
            </div>
          ) : (
            "Reset Password"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
