import Heading from "@/components/Heading";
import MainBody from "@/components/MainBody";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { FC } from "react";

const UsersPage = () => {
  return (
    <MainBody>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-col">
          <Heading title="Users" description="Manage users" />
          <div className="w-full flex">
            <Link href="/users/new">
              <Button className="rounded-md">Create</Button>
            </Link>
          </div>
          <Separator />
        </div>
        <div className="w-full items-center">Table</div>
      </div>
    </MainBody>
  );
};

export default UsersPage;
