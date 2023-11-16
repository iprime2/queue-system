import Link from "next/link";

import { getTokens } from "@/actions/getTokens";
import Heading from "@/components/Heading";
import MainBody from "@/components/MainBody";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { columns } from "./components/columns";
import { DataTable } from "@/components/DataTable";
import Error401 from "@/components/401";

const TokensPage = async () => {
  const tokens = await getTokens();

  if (!tokens) {
    return <Error401 />;
  }

  return (
    <MainBody>
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex flex-col space-y-2">
          <Heading title="Tokens" description="Manage tokens" />
          <div className="w-full flex">
            <Link href="/admin/tokens/new">
              <Button className="rounded-md">Create</Button>
            </Link>
          </div>
        </div>
        <Separator />
        <div className="w-full items-center">
          <DataTable columns={columns} data={tokens} searchKey="title" />
        </div>
      </div>
    </MainBody>
  );
};

export default TokensPage;
