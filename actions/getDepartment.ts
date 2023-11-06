import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prismadb from "@/lib/prismadb";

export const getDepartment = async (departmentId: string) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }
  const department = await prismadb.department.findUnique({
    where: {
      id: departmentId,
    },
  });

  return department;
};
