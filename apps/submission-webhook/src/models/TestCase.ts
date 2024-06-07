import { TestCase as PrismaTestCase, TestCaseResult } from '@prisma/client';
import prismaClient from "../db";

export class TestCase {
  static async create(data: Partial<PrismaTestCase>): Promise<TestCase> {
    const prismaTestCase = await prismaClient.testCase.create({ data });
    return new TestCase(prismaTestCase);
  }

  static async findBySubmissionId(submissionId: string): Promise<TestCase[]> {
    const prismaTestCases = await prismaClient.testCase.findMany({ where: { submissionId } });
    return prismaTestCases.map((prismaTestCase) => new TestCase(prismaTestCase));
  }

  static async findByJudge0TrackingId(judge0TrackingId: string): Promise<TestCase | null> {
    const prismaTestCase = await prismaClient.testCase.findUnique({ where: { judge0TrackingId } });
    return prismaTestCase ? new TestCase(prismaTestCase) : null;
  }

  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: TestCaseResult;
  index: number;
  submissionId: string;
  memory: number | null;
  time: number | null;
  judge0TrackingId: string;

  constructor(data: PrismaTestCase) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.status = data.status;
    this.index = data.index;
    this.submissionId = data.submissionId;
    this.memory = data.memory;
    this.time = data.time;
    this.judge0TrackingId = data.judge0TrackingId;
  }

  async update(data: Partial<PrismaTestCase>): Promise<TestCase> {
    const updatedPrismaTestCase = await prismaClient.testCase.update({
      where: { id: this.id },
      data,
    });
    return new TestCase(updatedPrismaTestCase);
  }
}
