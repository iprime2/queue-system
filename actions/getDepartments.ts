import { getServerSession } from "next-auth";

import prismadb from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const getDepartments = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }
  const departments = await prismadb.department.findMany({});

  return departments;
};
