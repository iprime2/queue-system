import { FC } from "react";

import Heading from "@/components/Heading";
import MainBody from "@/components/MainBody";
import UserForm from "./components/UserForm";
import { getUsers } from "@/actions/getUsers";
import { getDepartmentsName } from "@/actions/getDepartmentsName";

interface UserPageProps {
  params: { userId: string };
}

const UserPage: FC<UserPageProps> = async ({ params }) => {
  // if (!user) {
  //   redirect("/");
  // }

  const usersData = await getUsers();
  const departmentsName = await getDepartmentsName();

  const userId = params.userId;

  return (
    <UserForm initialData={usersData} departmentsNameData={departmentsName} />
  );
};

export default UserPage;
