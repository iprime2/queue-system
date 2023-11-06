import { getServerSession } from "next-auth";

import prismadb from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const getUsers = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const users = await prismadb.user.findMany({});

  return users;
};
