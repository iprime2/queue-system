import { FC } from "react";

import UserForm from "./components/UserForm";
import { getDepartmentsName } from "@/actions/getDepartmentsName";
import { getUser } from "@/actions/getUser";
import Error401 from "@/components/401";

interface UserPageProps {
  params: { userId: string };
}

const UserPage: FC<UserPageProps> = async ({ params }) => {
  const userId = params.userId;

  const usersData = await getUser(userId);
  const departmentsName = await getDepartmentsName();

  if (!usersData) {
    return <Error401 />;
  }

  if (!departmentsName) {
    return <Error401 />;
  }

  return (
    <UserForm initialData={usersData} departmentsNameData={departmentsName} />
  );
};

export default UserPage;
