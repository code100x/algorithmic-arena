import { getServerSession } from "next-auth";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();
  console.log(session?.user);
  return <div>{children}</div>;
};

export default layout;
