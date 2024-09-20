import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../lib/auth";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { Button } from "@repo/ui/button";
import { db } from "../../db";
import { NextRequest } from "next/server";

const pages = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/api/auth/signin");

  console.log(session.user);
  return (
    <div>
      <h1 className="md:text-2xl text-lg text-muted-foreground font-bold">
        Profile Settings
      </h1>
      <div className="mt-6">
        <form
          // ! validate the form
          // ! form is updating the user profile but not the user session
          action={async (formData: FormData) => {
            "use server";
            await db.user.update({
              where: {
                id: session.user.id,
              },
              data: {
                name: formData.get("name") as string,
              },
            });
          }}
        >
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              defaultValue={session.user.name ?? ""}
              name="name"
              className="w-auto"
              type="text"
              id="name"
            />
          </div>
          <div className="mt-3">
            <Button size={"sm"} variant={"secondary"}>
              Update Profile
            </Button>
          </div>
        </form>
      </div>

      {/* TODO: Add the page and function allows to user proifile */}
    </div>
  );
};

export default pages;
