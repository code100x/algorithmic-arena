"use client";

import React, { useState } from 'react';
import { Button } from "@repo/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/card";
import { Input } from '@repo/ui/input';
import { Label } from "@repo/ui/label";
import { Mail } from 'lucide-react';
import { useRouter } from 'next/navigation'; 
import Image from 'next/image';
import Link from 'next/link';

type Props = {};

export const ForgotPasswordPage: React.FC<Props> = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter(); 


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push("/reset-password"); 
    }, 2000);
  };

  return (
    <Card className="w-full max-w-sm mx-auto border-none">
<CardHeader className="text-center items-center mt-0 pt-0">
<Image src="/logo.svg" alt="logo" width={64} height={64} />
        <CardTitle className="text-2xl font-bold">Reset Your Password</CardTitle>
        <CardDescription className="font-medium">
        Enter your email address, and we'll send you a link to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <Input
              id="email"
              type="email"
              placeholder="alex@gmail.com"
              required
              className="pl-10"
            />
          </div>
        </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-t-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Sending...</span>
              </div>
            ) : (
              'Send Reset Link'
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center items-center space-x-1">
  <div className="text-gray-500">Didn't receive the email?</div>
  <Link href="/forgot-password" className="text-blue-500">
    Resend Link
  </Link>
</CardFooter>

    </Card>
  );
};