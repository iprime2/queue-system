import { FC } from "react";

import DepartmentForm from "./components/DepartmentForm";
import { getDepartment } from "@/actions/getDepartment";
import Error401 from "@/components/401";

interface DepartmentPageProps {
  params: { departmentId: string };
}

const UserPage: FC<DepartmentPageProps> = async ({ params }) => {
  const departmentId = params.departmentId;

  const departmentData = await getDepartment(departmentId);

  // if (departmentData) {
  //   return <Error401 />
  // }

  return <DepartmentForm initialData={departmentData} />;
};

export default UserPage;
