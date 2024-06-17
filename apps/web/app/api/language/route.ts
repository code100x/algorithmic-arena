import { NextRequest, NextResponse } from "next/server";
import { db } from "../../db";
export const GET = async (req: NextRequest) => {
  try {
    const res = await db.language.findMany();
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
};
