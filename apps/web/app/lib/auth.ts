import { db } from "../db";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { JWTPayload, SignJWT, importJWK } from "jose";
import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's postal address. */
      role: string;
      token: string;
    } & User;
  }
  interface User {
    /** The user's postal address. */
    role: string;
    token: string;
  }
}
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
  }
}

const generateJWT = async (payload: JWTPayload) => {
  const secret = process.env.JWT_SECRET || "secret";

  const jwk = await importJWK({ k: secret, alg: "HS256", kty: "oct" });

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("365d")
    .sign(jwk);

  return jwt;
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "email",
          type: "text",
          placeholder: "name@gmail.com",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials: any) {
        if (!credentials.username || !credentials.password) {
          return null;
        }

        const hashedPassword = await bcrypt.hash(credentials.password, 10);

        const user = await db.user.upsert({
          where: {
            email: credentials.username,
          },
          update: {},
          create: {
            email: credentials.username,
            name: credentials.username,
            password: hashedPassword,
          },
        });

        if (await bcrypt.compare(credentials.password, user.password)) {
          const jwt = await generateJWT({
            id: user.id,
          });
          return {
            id: user.id,
            name: user.name,
            email: credentials.username,
            role: user.role,
            token: jwt,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secr3t",

  session: {
    strategy: "jwt",
  },

  callbacks: {
    session: async ({ session, token }) => {
      const newSession = session;
      if (newSession.user) {
        newSession.user.id = token.id as string;
        newSession.user.token = token.token as string;
        newSession.user.role = token.role as string;
      }
      return newSession!;
    },
    jwt: async ({ token, user }) => {
      const newToken = token;
      if (user) {
        newToken.id = user.id;
        newToken.role = user.role;
        newToken.token = user.token;
      }

      return newToken;
    },
  },
} satisfies NextAuthOptions;
