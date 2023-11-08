import { getServerSession } from "next-auth";

import prismadb from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const getDepartments = async (selectFlag?: boolean) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  let departments;

  if (selectFlag) {
    departments = await prismadb.department.findMany({
      select: {
        id: true,
        departmentName: true,
        createdAt: true,
      },
    });
  } else {
    departments = await prismadb.department.findMany({});
  }

  return departments;
};
