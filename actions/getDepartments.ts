import { getServerSession } from "next-auth";

import prismadb from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const getDepartments = async (selectFlag: boolean) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  if (selectFlag) {
    const departments = await prismadb.department.findMany({
      select: {
        id: true,
        departmentName: true,
      },
    });

    return departments;
  }
  const departments = await prismadb.department.findMany({});

  return departments;
};
