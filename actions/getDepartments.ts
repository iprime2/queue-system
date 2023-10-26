import prismadb from "@/lib/prismadb";

export const getDepartments = async () => {
  const departments = await prismadb.department.findMany({});

  return departments;
};
