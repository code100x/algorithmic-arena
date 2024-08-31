import { User, UserRole } from "@prisma/client";
import prisma from "../src";
import bcrypt from "bcrypt";

// model User {
//   id                 String              @id @default(cuid())
//   email              String              @unique
//   name               String?
//   token              String?
//   password           String
//   createdAt          DateTime            @default(now())
//   updatedAt          DateTime            @updatedAt
//   contestSubmissions ContestSubmission[]
//   role               UserRole            @default(USER)
//   submissions        Submission[]
//   contestPoints      ContestPoints[]
// }

//Create users

const users = [
  {
    id: "1",
    email: "user1@test.com",
    name: "User1",
    password: "123456",
  },
  {
    id: "2",
    email: "user2@test.com",
    name: "User2",
    password: "123456",
  },
  {
    id: "3",
    email: "admin@test.com",
    name: "Admin",
    password: "123456",
    role: UserRole.ADMIN,
  },
];

export async function addUsers() {
  users.map(async (u) => {
    await prisma.user.upsert({
      where: {
        id: u.id,
      },
      create: {
        id: u.id,
        email: u.email,
        name: u.name,
        password: await bcrypt.hash(u.password, 10),
        role: u.role || UserRole.USER,
      },
      update: {
        email: u.email,
        name: u.name,
        password: await bcrypt.hash(u.password, 10),
        role: u.role || UserRole.USER,
      },
    });
  });
}
