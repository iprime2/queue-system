import { getServerSession } from "next-auth";

import prismadb from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const getTokens = async (selectFlag?: boolean) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return null;
    }

    let tokens;

    if (selectFlag) {
      tokens = await prismadb.token.findMany({
        select: {
          id: true,
          title: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
          counter: {
            select: {
              id: true,
              name: true,
            },
          },
          department: {
            select: {
              id: true,
              departmentName: true,
            },
          },
        },
      });
    } else {
      tokens = await prismadb.token.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
          counter: {
            select: {
              id: true,
              name: true,
            },
          },
          department: {
            select: {
              id: true,
              departmentName: true,
            },
          },
        },
      });
    }
    return tokens;
  } catch (error) {
    console.log(error);
  }
};
