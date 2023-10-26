"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import CellAction from "@/components/CellAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DepartmentsColumnTypes = {
  id: string;
  departmentName: string;
  schoolName: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<DepartmentsColumnTypes>[] = [
  {
    accessorKey: "schoolName",
    header: "School Name",
  },
  {
    accessorKey: "departmentName",
    header: "DepartmentName",
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => (
      <div className="flex">{format(row.original.createdAt, "PP")}</div>
    ),
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} type={"departments"} />,
  },
];
