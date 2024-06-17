import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { db } from "../../../db";
export const DELETE = async (req: NextRequest) => {
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
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      {
        message: "Invalid submission id",
      },
      {
        status: 400,
      }
    );
  }
  try {
    const del = await db.solution.delete({
      where: { id: id },
    });
    console.log(del);
    return NextResponse.json(
      {
        message: "solution deleted successfully",
      },
      {
        status: 202,
      }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "something went wrong",
      },
      {
        status: 500,
      }
    );
  }
};

export const PUT = async (req: NextRequest) => {
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
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      {
        message: "Invalid submission id",
      },
      {
        status: 400,
      }
    );
  }
  //Update
  const data = req.body;
  const solution = await db.solution.update({
    where: {
      id: id,
    },
    data: {},
  });
  return NextResponse.json(
    {
      message: "solution updated successfully",
    },
    { status: 202 }
  );
};
