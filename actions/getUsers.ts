import { getServerSession } from "next-auth";

import prismadb from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const getUsers = async (selectFlag?: boolean) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  let users;

  if (selectFlag) {
    users = await prismadb.user.findMany({
      select: {
        id: true,
        name: true,
        superUser: true,
        userAccess: true,
        departmentAccess: true,
        createdAt: true,
      },
    });
  } else {
    users = await prismadb.user.findMany({});
  }

  return users;
};
