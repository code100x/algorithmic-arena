"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input"
import Image from "next/image";
import { User, CircleUser } from 'lucide-react';

const CompleteProfileForm = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle profile completion logic here
    console.log('Profile completed', { username, name });
  };

  return (
    <Card className="w-full max-w-sm mx-auto border-none">
      <CardHeader className="text-center items-center mt-0 pt-0">
        <Image src="/logo.svg" alt="logo" width={64} height={64} />
        <CardTitle className="text-2xl font-bold">Complete Your Profile</CardTitle>
        <CardDescription className="font-medium">
          You're almost ready to start! Please provide a username and confirm your name.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <Input
                id="username"
                type="text"
                placeholder="Username"
                required
                className="pl-10"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <div className="relative">
              <CircleUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <Input
                id="name"
                type="text"
                placeholder="Name"
                required
                className="pl-10"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <Button type="submit" className="w-full bg-blue-600 text-white">
            Complete Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default CompleteProfileForm;