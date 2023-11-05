import { FC } from "react";

import Heading from "@/components/Heading";
import MainBody from "@/components/MainBody";
import UserForm from "./components/UserForm";
import { getDepartmentsName } from "@/actions/getDepartmentsName";
import { getUser } from "@/actions/getUser";

interface UserPageProps {
  params: { userId: string };
}

const UserPage: FC<UserPageProps> = async ({ params }) => {
  // if (!user) {
  //   redirect("/");
  // }

  const userId = params.userId;

  const usersData = await getUser(userId);
  const departmentsName = await getDepartmentsName();

  return (
    <UserForm initialData={usersData} departmentsNameData={departmentsName} />
  );
};

export default UserPage;
