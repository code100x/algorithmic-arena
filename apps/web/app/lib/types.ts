import { Prisma } from "@prisma/client";

export type ProblemWithSubmissions = Prisma.ProblemGetPayload<{
  include: {
    submissions: {
      select: { status: true };
    };
    _count: {
      select: { submissions: true };
    };
  };
}>;
