"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import CellAction from "@/components/CellAction";

type DepartmentAllTypes = {
  id: string;
  departmentName: string;
  schoolName: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
};

export type DepartmentSomeTypes = {
  id: string;
  departmentName: string;
  createdAt: Date;
};

export type DepartmentsColumnTypes = DepartmentAllTypes | DepartmentSomeTypes;

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
