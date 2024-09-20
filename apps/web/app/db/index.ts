import prismaClient from "@repo/db/client";

export const db = prismaClient;

// ! when we have already exporting client i don't think we need to export db again

// const prismaClientSingleton = () => {
//   return new PrismaClient();
// };

// type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// // eslint-disable-next-line
// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClientSingleton | undefined;
// };

// const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// export const db = prisma;

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
