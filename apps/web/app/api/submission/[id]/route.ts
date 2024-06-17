import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../db";
import { authOptions } from "../../../lib/auth";
import { getServerSession } from "next-auth";
export const GET = async (req: NextRequest) => {
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
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      {
        message: "Invalid problem id",
      },
      {
        status: 400,
      }
    );
  }
  const submission = await db.submission.findFirst({
    where: {
      id: id,
    },
    include: {
      language: true,
    },
  });
  return NextResponse.json({
    status: 200,
    submission,
  });
};
