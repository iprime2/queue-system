"use client";

import { getBuzyCounter } from "@/actions/getBuzyCounter";
import Heading from "@/components/Heading";
import MainBody from "@/components/MainBody";
import QueueBox from "@/components/QueueBox";
import QueueCard from "@/components/QueueCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

const QueuePage = () => {
  // const { queue, update } = useQueue();

  const toggleBuzy = async () => {
    await getBuzyCounter("84adc06d-9674-43cb-a292-d980bc961fba", false);
  };

  return (
    <MainBody>
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex flex-col">
          <Heading title="Queue" description="Token Queue" />
        </div>
        <Separator />
      </div>
      <div className="w-full items-center">
        <div className="w-full flex flex-row gap-4 overflow-x-scroll overflow-y-hidden border-solid h-[140px] px-4 py-6">
          <Suspense fallback={<QueueCard />}>
            <QueueCard />
          </Suspense>
        </div>
        <div className="flex flex-col w-full p-4 gap-4">
          <div className="flex flex-col">
            <QueueBox title="Title:" content="Test Title" />
            <QueueBox
              title="Description:"
              content="Test Desc Desc Desc Desc Desc Desc"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={() => toggleBuzy()}>Mark as Complete</Button>
            <Button>Mark as Waiting</Button>
          </div>
        </div>
      </div>
    </MainBody>
  );
};

export default QueuePage;
