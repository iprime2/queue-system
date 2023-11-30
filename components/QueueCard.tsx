"use client";

import { useQueue } from "@/hooks/useQueue";
import { cn } from "@/lib/utils";
import { Token } from "@prisma/client";
import { useEffect, useState } from "react";

const QueueCard = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { queue } = useQueue();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  //TODO refactor any
  const queueItems = queue as Token[] | any;

  return (
    <>
      {queueItems?.map((item: Token, index: number) => (
        <div
          key={item.id}
          className={cn(
            "flex flex-col w-1/4 p-5 h-fit rounded-lg shadow-xl cursor-pointer",
            item.status === "completed" && "bg-green-400",
            item.status === "pending" && "bg-red-500",
            item.status === "created" && "bg-red-500",
            item.status === "progress" && "bg-orange-400"
          )}
        >
          <h2>{item.title}</h2>
          <p>{item.description}</p>

        </div>
      ))}
    </>
  );
};

export default QueueCard;
