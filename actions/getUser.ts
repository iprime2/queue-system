import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import prismadb from "@/lib/prismadb";

export const getUser = async (userId: string) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const user = await prismadb.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return new NextResponse("Use not found!!", {
      status: 400,
    });
  }

  user.password = "";

  return user;
};
