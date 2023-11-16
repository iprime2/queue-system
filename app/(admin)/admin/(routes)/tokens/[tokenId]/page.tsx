import { FC } from "react";

import TokenForm from "./components/TokenForm";
import Error401 from "@/components/401";
import { getUsers } from "@/actions/getUsers";
import { getDepartments } from "@/actions/getDepartments";
import { getCounters } from "@/actions/getCounters";
import { getToken } from "@/actions/getToken";
import { getTokenNo } from "@/actions/getTokenNo";

interface UserPageProps {
  params: { tokenId: string };
}

const UserPage: FC<UserPageProps> = async ({ params }) => {
  const tokenId = params.tokenId;

  const token = await getToken(tokenId);
  const departments = await getDepartments(true);
  const users = await getUsers(true);
  const counters = await getCounters(true);
  const tokenNo = await getTokenNo();

  // if (!token) {
  //   return <Error401 />;
  // }

  if (!counters) {
    return <Error401 />;
  }

  if (!departments) {
    return <Error401 />;
  }

  if (!users) {
    return <Error401 />;
  }

  if (!tokenNo) {
    return <Error401 />;
  }

  return (
    <TokenForm
      initialData={token}
      departmentsData={departments}
      countersData={counters}
      usersData={users}
      tokenNo={tokenNo}
    />
  );
};

export default UserPage;
