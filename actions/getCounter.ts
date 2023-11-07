import { getServerSession } from "next-auth";

import prismadb from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const getCounter = async (counterId: string) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return null;
    }

    const counter = await prismadb.counter.findUnique({
      where: {
        id: counterId,
      },
    });

    return counter;
  } catch (error) {
    console.log(error);
  }
};
