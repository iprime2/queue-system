"use server";

import { getBuzyCounter } from "@/actions/getBuzyCounter";
import { getOnlineCounters } from "@/actions/getOnlineCounters";
import { getQueue } from "@/hooks/useQueue";
import prismadb from "@/lib/prismadb";
// import { updateToken } from "@/actions/updateToken";

type onlineCounterTypes = {
  id: string;
  buzy: boolean;
  user: {
    id: string;
    name: string;
  };
  department: {
    id: string;
    departmentName: string;
  };
};

type queueType = {
  id: string;
  title: string;
  description: string;
  tokenNo: number;
  status: string;
  isCompleted: boolean;
  userId: string | null;
  counterId: string | null;
  departmentId: string | null;
  closedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

// TODO any
export const assignToken = async () => {
  const onlineCounters: onlineCounterTypes[] | any = await getOnlineCounters();

  const queue = getQueue();

  console.log(queue);

  if (!onlineCounters) {
    console.log("No online counter");
    return "No online counter";
  }

  if (!queue) {
    console.log("No queue");
    return "No queue";
  }

  const updateQueue = async (data: {
    id: string;
    counterId: string;
    userId: string;
    status: string;
  }) => {
    const { id, counterId, userId, status } = data;

    await prismadb.token.update({
      where: {
        id: id,
      },
      data: {
        counterId: counterId,
        userId: userId,
        status: status,
      },
    });
  };

  // queue?.map((item: queueType) => {
  //   onlineCounters.map((counterItem: onlineCounterTypes) => {
  //     if (!counterItem.buzy) {
  //       if (item.departmentId === counterItem.department.id) {
  //         item.counterId = counterItem.id;
  //         item.userId = counterItem.user.id;
  //         item.status = "progress";
  //         getBuzyCounter(counterItem.id, true);
  //         const data = {
  //           id: item.id,
  //           counterId: item.counterId,
  //           userId: item.userId,
  //           status: item.status,
  //         };
  //         // update(item);
  //         updateQueue(data);
  //         // updateToken(item);
  //       }
  //     }
  //   });
  // });

  console.log(queue);
};
