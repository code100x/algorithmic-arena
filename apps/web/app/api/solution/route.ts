import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { db } from "../../db";
import { SolutionInput } from "@repo/common/zod";
export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      {
        message: "You must be logged in to view submissions",
      },
      {
        status: 401,
      }
    );
  }
  const data = await req.json();
  const res = SolutionInput.safeParse(data);
  if (!res.success) {
    return NextResponse.json(
      {
        message: "Invalid input",
      },
      {
        status: 400,
      }
    );
  }
  //Add
  const solution = await db.solution.create({
    data: {
      userId: session.user.id,
      languageId: parseInt(data.languageId),
      problemId: data.problemId,
      code: data.code,
      title: data.title,
      explaination: data.explaination,
    },
  });
  return NextResponse.json(
    { message: "solution added successfully" },
    { status: 202 }
  );
};
