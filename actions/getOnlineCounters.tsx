import { getServerSession } from "next-auth";

import prismadb from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const getOnlineCounters = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return [];
    }

    const onlineCounters = await prismadb.counter.findMany({
      where: {
        online: true,
      },
      select: {
        id: true,
        buzy: true,
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
          },
        },
      },
    });

    return onlineCounters;
  } catch (error) {
    console.log(error);
  }
};
