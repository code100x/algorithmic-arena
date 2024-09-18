import React from "react";
import { CircleHelp } from "lucide-react";
import { Button } from "@repo/ui/button";
import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white p-4">
      <div className=" bg-gray-800 p-4 mb-6">
        <p>
          <CircleHelp size={32} className="text-gray-400" />
        </p>
      </div>
      <h1 className="text-2xl font-bold mb-2">Oops! Page Not Found.</h1>
      <p className="text-center text-gray-400 mb-6 max-w-md">
        The page you're looking for doesn't exist or has been moved. Please
        check the URL or return to the homepage.
      </p>
      <Link href="/">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Explore Platform
        </Button>
      </Link>
    </div>
  );
};

export default Custom404;
