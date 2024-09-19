"use client";

import React from "react";
import { Card, CardContent } from "@repo/ui/card";
import { useRouter } from "next/navigation"; // Updated import
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import { ArrowLeft, User, CircleUser } from "lucide-react";

const EditProfile = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.push("/profile");
  };

  return (
    <Card className="w-full h-[792px] max-w-[1216px] mx-auto border-none">
      <CardContent className="p-8">
        <div className="mb-8">
          <Button
            variant="link"
            className="text-sm text-gray-400 flex items-center"
            onClick={handleBackClick}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <div className="font-bold h-8 w-72">Profile Picture</div>
            <img
              src="/profile.png"
              alt="Profile"
              width={289}
              height={345}
              className=" aspect-square object-cover mb-2"
            />
            <Button
              variant="secondary"
              className="mt- w-[289px] bg-gray-800 text-white hover:bg-gray-700 border-none"
            >
              Upload Image
            </Button>
          </div>

          <div className="w-full md:w-2/3 space-y-4">
            <div className="font-bold h-8 w-72">Personal Info</div>
            <div className="space-y-2">
              <div>Username</div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  //   defaultValue="riturajreal"
                  className="pl-10  border-gray-700 text-white w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div>Name</div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <div className="relative">
                <CircleUser
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  id="name"
                  type="text"
                  placeholder="Name"
                  //   defaultValue="Anup Singh"
                  className="pl-10 border-gray-700 text-white w-full"
                />
              </div>
            </div>

            <Button className="w-32 h-10 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white">
              Update Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditProfile;
