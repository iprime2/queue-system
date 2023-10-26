import { FC } from "react";

import Heading from "@/components/Heading";
import MainBody from "@/components/MainBody";
import DepartmentForm from "./components/DepartmentForm";
import { getDepartment } from "@/actions/getDepartment";

interface DepartmentPageProps {
  params: { departmentId: string };
}

const UserPage: FC<DepartmentPageProps> = async ({ params }) => {
  // if (!user) {
  //   redirect("/");
  // }

  const departmentId = params.departmentId;

  const departmentData = await getDepartment(departmentId);

  return <DepartmentForm initialData={departmentData} />;
};

export default UserPage;
