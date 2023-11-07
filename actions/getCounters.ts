import { getServerSession } from "next-auth";

import prismadb from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const getCounters = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return null;
    }

    const counters = await prismadb.counter.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        department: {
          select: {
            id: true,
            departmentName: true,
            schoolName: true,
            code: true,
          },
        },
      },
    });

    return counters;
  } catch (error) {
    console.log(error);
  }
};