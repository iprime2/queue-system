import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export const getUser = async (userId: string) => {
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
