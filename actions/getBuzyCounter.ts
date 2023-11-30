"use server";

import { getServerSession } from "next-auth";

import prismadb from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const getBuzyCounter = async (counterId: string, buzy: boolean) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return null;
    }

    const counter = await prismadb.counter.update({
      where: {
        id: counterId,
      },
      data: {
        buzy,
      },
    });

    return counter;
  } catch (error) {
    console.log(error);
  }
};
