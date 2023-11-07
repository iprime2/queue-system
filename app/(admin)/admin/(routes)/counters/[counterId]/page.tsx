import { FC } from "react";

import CounterForm from "./components/CounterForm";
import { getDepartmentsName } from "@/actions/getDepartmentsName";
import { getUsersName } from "@/actions/getUsersName";
import { getCounter } from "@/actions/getCounter";
import Error401 from "@/components/401";
import { getUsers } from "@/actions/getUsers";
import { getDepartments } from "@/actions/getDepartments";

interface UserPageProps {
  params: { counterId: string };
}

const UserPage: FC<UserPageProps> = async ({ params }) => {
  const counterId = params.counterId;

  const counterData = await getCounter(counterId);
  const departments = await getDepartments(true);
  const users = await getUsers(true);

  if (!counterData) {
    return <Error401 />;
  }

  if (!departments) {
    return <Error401 />;
  }

  if (!users) {
    return <Error401 />;
  }

  return (
    <CounterForm
      initialData={counterData}
      departmentsData={departments}
      usersData={users}
    />
  );
};

export default UserPage;
