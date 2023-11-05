import Link from "next/link";
import { FC } from "react";

import Heading from "@/components/Heading";
import MainBody from "@/components/MainBody";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getDepartments } from "@/actions/getDepartments";
import { DataTable } from "@/components/DataTable";
import { columns } from "./components/columns";

const DepartmentsPage = async () => {
  const departments = await getDepartments();

  return (
    <MainBody>
      <div className="w-full flex flex-col gap-3">
        <Heading title="Departments" description="Manage departments" />
        <div className="w-full flex">
          <Link href="/departments/new">
            <Button className="rounded-md">Create</Button>
          </Link>
        </div>
        <Separator />
        <div className="w-full items-center">
          <DataTable
            columns={columns}
            data={departments}
            searchKey="departmentName"
          />
        </div>
      </div>
    </MainBody>
  );
};

export default DepartmentsPage;
