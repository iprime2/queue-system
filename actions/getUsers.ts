import { getServerSession } from "next-auth";

import prismadb from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const getUsers = async (selectFlag: boolean) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  if (selectFlag) {
    const users = await prismadb.user.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return users;
  }
  const users = await prismadb.user.findMany({});

  return users;
};
