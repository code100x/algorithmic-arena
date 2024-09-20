import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";
import * as z from "zod";
import { db } from "../../db";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json(
      {
        message: "You must be an admin to create contests",
      },
      {
        status: 401,
      }
    );
  }

  const body = await req.json();
  const formSchema = z.object({
    title: z
      .string({ required_error: "Title is required" })
      .min(2, "Title must be at least 2 characters long")
      .max(100, "Title cannot exceed 100 characters"),
    description: z
      .string({ required_error: "Description is required" })
      .min(10, "Description must be at least 10 characters long")
      .max(500, "Description cannot exceed 500 characters"),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    hidden: z.boolean().default(false),
    problems: z.array(z.string()),
  });

  const form = formSchema.safeParse(body);
  if (!form.success) {
    return NextResponse.json(
      {
        message: "Invalid input",
        errors: form.error,
      },
      {
        status: 400,
      }
    );
  }
  const validatedData = form.data;
  const problems = await db.problem.findMany({
    where: {
      id: {
        in: validatedData.problems,
      },
    },
  });

  if (problems.length !== validatedData.problems.length) {
    return NextResponse.json(
      {
        message: "Invalid problems",
      },
      {
        status: 400,
      }
    );
  }

  const contest = await db.$transaction(async (tx) => {
    const contest = await tx.contest.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        startTime: validatedData.startTime,
        endTime: validatedData.endTime,
        hidden: validatedData.hidden,
      },
    });
    await tx.contestProblem.createMany({
      data: [
        ...problems.map((problem, index) => ({
          problemId: problem.id,
          contestId: contest.id,
          index,
        })),
      ],
    });

    return contest;
  });

  return NextResponse.json({ contest }, { status: 201 });
}
