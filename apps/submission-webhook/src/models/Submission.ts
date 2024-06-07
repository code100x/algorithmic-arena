import { Submission as PrismaSubmission, SubmissionResult } from '@prisma/client';
import prismaClient from "../db";

export class Submission {
    id: string;
    problemId: string;
    userId: string;
    languageId: number;
    createdAt: Date;
    updatedAt: Date;
    code: string;
    fullCode: string;
    activeContestId: string | null;
    status: string;
    memory: number | null;
    time: number | null;
    static async create(data: Partial<PrismaSubmission>): Promise<Submission> {
        const prismaSubmission = await prismaClient.submission.create({ data });
        return new Submission(prismaSubmission);
      }
    
      static async findById(id: string): Promise<Submission | null> {
        const prismaSubmission = await prismaClient.submission.findUnique({ where: { id } });
        return prismaSubmission ? new Submission(prismaSubmission) : null;
      }
      

  constructor(data: PrismaSubmission) {
    this.id = data.id;
    this.problemId = data.problemId;
    this.userId = data.userId;
    this.languageId = data.languageId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.code = data.code;
    this.fullCode = data.fullCode;
    this.activeContestId = data.activeContestId;
    this.status = data.status;
    this.memory = data.memory;
    this.time = data.time;

  }
  async update(data: Partial<PrismaSubmission>): Promise<Submission> {
    const updatedPrismaSubmission = await prismaClient.submission.update({
      where: { id: this.id },
      data,
    });
    return new Submission(updatedPrismaSubmission);
  }
}