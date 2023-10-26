import prismadb from "@/lib/prismadb";

export const getDepartment = async (departmentId: string) => {
  const department = await prismadb.department.findUnique({
    where: {
      id: departmentId,
    },
  });

  return department;
};
