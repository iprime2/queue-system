"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import CellAction from "@/components/CellAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UsersColumnTypes = {
  id: string;
  name: string;
  imgUrl: string;
  userAccess: string;
  departmentAccess: string;
  departmentName: string;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<UsersColumnTypes>[] = [
  {
    accessorKey: "name",
    header: "User Name",
  },
  {
    accessorKey: "userAccess",
    header: "User Permission",
  },
  {
    accessorKey: "departmentAccess",
    header: "Dept. Permission",
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
    cell: ({ row }) => <CellAction data={row.original} type={"users"} />,
  },
];
