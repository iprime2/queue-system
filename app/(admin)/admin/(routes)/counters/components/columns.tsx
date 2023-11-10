"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import CellAction from "@/components/CellAction";
import { CheckCircle2Icon, XCircleIcon } from "lucide-react";
import { Department, User } from "@prisma/client";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CountersColumnTypes = {
  id: string;
  name: string;
  online: boolean;
  userId: string;
  departmentId: string;
  createdAt: Date;
  updatedAt: Date;
  user: { id: string; name: string };
  department: {
    id: string;
    departmentName: string;
    schoolName: string;
    code: string;
  };
};

export const columns: ColumnDef<CountersColumnTypes>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "departmentName",
    header: "Department",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.original.department.departmentName}
      </div>
    ),
  },
  {
    accessorKey: "userName",
    header: "User",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.original.user.name}
      </div>
    ),
  },
  {
    accessorKey: "online",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.original.online ? (
          <CheckCircle2Icon className="text-green-500" />
        ) : (
          <XCircleIcon className="text-red-500" />
        )}
      </div>
    ),
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
    cell: ({ row }) => <CellAction data={row.original} type={"counters"} />,
  },
];
