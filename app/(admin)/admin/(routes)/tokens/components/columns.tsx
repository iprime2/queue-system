"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import CellAction from "@/components/CellAction";
import { CheckCircle2Icon, XCircleIcon } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TokensColumnTypes = {
  id: string;
  title: string;
  description: string;
  tokenNo: string;
  status: string;
  isCompleted: boolean;
  userId: string;
  counterId: string;
  departmentId: string;
  closedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  user: { id: string; name: string };
  department: {
    id: string;
    departmentName: string;
    schoolName: string;
    code: string;
  };
  counter: {
    id: string;
    name: string;
  };
};

export const columns: ColumnDef<TokensColumnTypes>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
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
    accessorKey: "counterName",
    header: "Counter",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.original.counter.name}
      </div>
    ),
  },
  {
    accessorKey: "isCompleted",
    header: "Completed",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.original.isCompleted ? (
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
