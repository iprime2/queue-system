import { getServerSession } from "next-auth";

import prismadb from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const getToken = async (tokenId: string) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return null;
    }

    const counter = await prismadb.token.findUnique({
      where: {
        id: tokenId,
      },
    });

    return counter;
  } catch (error) {
    console.log(error);
  }
};
