import { getServerSession } from "next-auth";

import prismadb from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const getTokenNo = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return null;
    }

    const currentDate = new Date().toISOString().split("T")[0];

    const lastToken = await prismadb.token.findFirst({
      where: {
        createdAt: {
          gte: new Date(`${currentDate}T00:00:00.000Z`),
          lt: new Date(`${currentDate}T23:59:59.999Z`),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        tokenNo: true,
      },
    });

    const newTokenNo = lastToken ? lastToken.tokenNo + 1 : 1;

    return newTokenNo;
  } catch (error) {
    console.log(error);
  }
};
