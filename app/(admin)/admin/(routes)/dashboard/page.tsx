"use client";

import Heading from "@/components/Heading";
import MainBody from "@/components/MainBody";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  // const router = useRouter();
  // const { data: session } = useSession({
  //   required: true,
  // });

  // if (!session) {
  //   router.push("/");
  // return null;
  // }

  return (
    <MainBody>
      <Heading title="Dashboard" description="Manage Dashboard" />
    </MainBody>
  );
}
