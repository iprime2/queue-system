import Link from "next/link";

import { getCounters } from "@/actions/getCounters";
import Heading from "@/components/Heading";
import MainBody from "@/components/MainBody";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { columns } from "./components/columns";
import { DataTable } from "@/components/DataTable";
import Error401 from "@/components/401";

const CountersPage = async () => {
  "use sever";
  const counters = await getCounters();

  if (!counters) {
    return <Error401 />;
  }

  return (
    <MainBody>
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex flex-col space-y-2">
          <Heading title="Counters" description="Manage counters" />
          <div className="w-full flex">
            <Link href="/admin/counters/new">
              <Button className="rounded-md">Create</Button>
            </Link>
          </div>
        </div>
        <Separator />
        <div className="w-full items-center">
          <DataTable columns={columns} data={counters} searchKey="name" />
        </div>
      </div>
    </MainBody>
  );
};

export default CountersPage;
