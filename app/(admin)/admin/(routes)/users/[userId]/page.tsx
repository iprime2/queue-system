import { FC } from "react";

import UserForm from "./components/UserForm";
import { getUser } from "@/actions/getUser";
import Error401 from "@/components/401";
import { getDepartments } from "@/actions/getDepartments";

interface UserPageProps {
  params: { userId: string };
}

const UserPage: FC<UserPageProps> = async ({ params }) => {
  const userId = params.userId;

  const usersData = await getUser(userId);
  const departments = await getDepartments(true);

  if (!usersData) {
    return <Error401 />;
  }

  if (!departments) {
    return <Error401 />;
  }

  console.log(usersData);

  return <UserForm initialData={usersData} departmentsNameData={departments} />;
};

export default UserPage;
