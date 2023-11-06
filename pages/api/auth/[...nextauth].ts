import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import prisma from "@/libs/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.password) {
          throw new Error("Invalid credentials");
        }

        const isCorrectedPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectedPassword) {
          throw new Error("Invalid Credentials");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  debug: true,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   console.log("url", url);
    //   console.log("baseUrl", baseUrl);
    //   return url.startsWith(baseUrl) ? url : baseUrl + "/protected/client";
    // },
    async session(res) {
      const { token, session } = res;
      if (token) {
        session.user.accessToken = token.accessToken;
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.departmentName = token.departmentName;
        session.user.superUser = token.superUser;
        session.user.userAccess = token.userAccess;
        session.user.departmentAccess = token.departmentAccess;
      }

      return session;
    },
    async jwt({ token, user }) {
      // const dbUser = await prisma.user.findFirst({
      //   where: {
      //     email: token.email as string,
      //   },
      // });

      // if (!dbUser) {
      //   token.id = user!.id;
      //   return token;
      // }

      // console.log("nextAuth");
      // console.log(token);

      // return {
      //   id: dbUser.id,
      //   name: dbUser.name,
      //   email: dbUser.email,
      //   departmentName: dbUser.departmentName,
      //   superUser: dbUser.superUser,
      //   userAccess: dbUser.userAccess,
      //   departmentAccess: dbUser.departmentAccess,
      // };

      return token;
    },
  },
};

export default NextAuth(authOptions);
