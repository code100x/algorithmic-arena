import { Prisma } from "@prisma/client";

export type ProblemWithSubmissions = Prisma.ProblemGetPayload<{
  include: {
    defaultCode: true;
    submissions: {
      select: { status: true };
    };
    _count: {
      select: { submissions: true };
    };
  };
}>;

export type SubmissionWithLang = Prisma.SubmissionGetPayload<{
  select: {
    id: true;
    status: true;
    memory: true;
    time: true;
    createdAt: true;
    code: true;
    language: { select: { id: true; name: true } };
  };
}>;
