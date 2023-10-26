import prismadb from "@/lib/prismadb";

export const getDepartmentsName = async () => {
  const departments = await prismadb.department.findMany({
    select: {
      departmentName: true,
    },
  });

  return departments.map((department) => department.departmentName);
};
