import { getServerSession } from "next-auth";

import prismadb from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const getTokens = async (selectFlag?: boolean) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return null;
    }

    if (selectFlag) {
      const tokens = await prismadb.token.findMany({
        select: {
          id: true,
          title: true,
          createdAt: true,
        },
      });

      return tokens;
    }

    const token = await prismadb.token.findMany({
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
            schoolName: true,
            code: true,
          },
        },
      },
    });

    return token;
  } catch (error) {
    console.log(error);
  }
};
