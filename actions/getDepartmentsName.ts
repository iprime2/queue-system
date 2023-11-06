import { getServerSession } from "next-auth";

import prismadb from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const getDepartmentsName = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const departments = await prismadb.department.findMany({
    select: {
      departmentName: true,
    },
  });

  return departments.map((department) => department.departmentName);
};
