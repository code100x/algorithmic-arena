import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || session.user.role !== "ADMIN") {
    redirect("/");
  }
  return <div>{children}</div>;
};

export default layout;
