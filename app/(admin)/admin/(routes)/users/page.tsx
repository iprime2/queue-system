import { getUsers } from "@/actions/getUsers";
import Heading from "@/components/Heading";
import MainBody from "@/components/MainBody";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { FC } from "react";
import { columns } from "./components/columns";
import { DataTable } from "@/components/DataTable";

const UsersPage = async () => {
  "use sever";
  const users = await getUsers();

  return (
    <MainBody>
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex flex-col">
          <Heading title="Users" description="Manage users" />
          <div className="w-full flex">
            <Link href="/users/new">
              <Button className="rounded-md">Create</Button>
            </Link>
          </div>
        </div>
        <Separator />
        <div className="w-full items-center">
          <DataTable columns={columns} data={users} searchKey="name" />
        </div>
      </div>
    </MainBody>
  );
};

export default UsersPage;
