"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LogoutPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) {
    router.push("/");
  }

  useEffect(() => {
    const handleSignOut = async () => {
      await signOut({ callbackUrl: "/" });
    };

    handleSignOut();
  }, []);

  return <h1>Logging Out!</h1>;
};

export default LogoutPage;
