"use client";

import Heading from "@/components/Heading";
import MainBody from "@/components/MainBody";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  // const { data: session } = useSession({
  //   required: true,
  // });
  return (
    <MainBody>
      <Heading title="Dashboard" description="Manage Dashboard" />
      {/* <p>{session?.user?.name}</p> */}
    </MainBody>
  );
}
