import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const pages = async () => {
  const session = await getServerSession();
  if (!session) redirect("/api/auth/signin");
  return (
    <div>
      <h1 className="md:text-2xl text-lg text-muted-foreground font-bold">
        Profile Settings
      </h1>
      <div></div>

      {/* TODO: Add the page and function allows to user proifile */}
    </div>
  );
};

export default pages;
