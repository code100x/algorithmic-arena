import { Judge0Submission as PrismaJudge0Submission } from '@prisma/client';
import prismaClient from "../db";

export class Judge0Submission {
  awaitCallback() {
      throw new Error('Method not implemented.');
  }
  sendToJudge0() {
      throw new Error('Method not implemented.');
  }
  static async create(data: Partial<PrismaJudge0Submission>): Promise<Judge0Submission> {
    const prismaJudge0Submission = await prismaClient.judge0Submission.create({ data });
    return new Judge0Submission(prismaJudge0Submission);
  }

  static async findBySubmissionId(submissionId: string): Promise<Judge0Submission | null> {
    const prismaJudge0Submission = await prismaClient.judge0Submission.findUnique({
      where: { submissionId },
    });
    return prismaJudge0Submission ? new Judge0Submission(prismaJudge0Submission) : null;
  }

  id: string;
  submissionId: string;
  status: PermissionStatus;
  stdout: string | null;
  stderr: string | null;
  compileOutput: string | null;
  time: number | null;
  memory: number | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: PrismaJudge0Submission) {
    this.id = data.id;
    this.submissionId = data.submissionId;
    this.status = data.status;
    this.stdout = data.stdout;
    this.stderr = data.stderr;
    this.compileOutput = data.compileOutput;
    this.time = data.time;
    this.memory = data.memory;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  async update(data: Partial<PrismaJudge0Submission>): Promise<Judge0Submission> {
    const updatedPrismaJudge0Submission = await prismaClient.judge0Submission.update({
      where: { id: this.id },
      data,
    });
    return new Judge0Submission(updatedPrismaJudge0Submission);
  }
}