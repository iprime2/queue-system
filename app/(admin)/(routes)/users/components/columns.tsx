"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import CellAction from "@/components/CellAction";
import { CheckCircle2Icon, XCircleIcon } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UsersColumnTypes = {
  id: string;
  name: string;
  email: string;
  departmentName: string;
  imageUrl: string;
  superUser: boolean;
  userAccess: boolean;
  departmentAccess: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<UsersColumnTypes>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "departmentName",
    header: "DepartmentName",
  },
  {
    accessorKey: "superUser",
    header: "Super User",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.original.superUser ? (
          <CheckCircle2Icon className="text-green-500" />
        ) : (
          <XCircleIcon className="text-red-500" />
        )}
      </div>
    ),
  },
  {
    accessorKey: "userAccess",
    header: "User Access",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.original.userAccess ? (
          <CheckCircle2Icon className="text-green-500" />
        ) : (
          <XCircleIcon className="text-red-500" />
        )}
      </div>
    ),
  },
  {
    accessorKey: "departmentAccess",
    header: "Dept. Access",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.original.departmentAccess ? (
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
    cell: ({ row }) => <CellAction data={row.original} type={"users"} />,
  },
];
