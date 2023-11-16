"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import CellAction from "@/components/CellAction";
import { CheckCircle2Icon, XCircleIcon } from "lucide-react";

export type TokensAllColumnTypes = {
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
  user: { id: string; name: string } | null;
  department: {
    id: string;
    departmentName: string;
    schoolName: string;
    code: string;
  } | null;
  counter: {
    id: string;
    name: string;
  } | null;
};

export type TokensSomeColumnTypes = {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
  department: {
    id: string;
    departmentName: string;
  } | null;
  counter: {
    id: string;
    name: string;
  } | null;
  user: {
    id: string;
    name: string;
  } | null;
};

export type TokensColumnTypes =
  | TokensSomeColumnTypes
  | TokensAllColumnTypes
  // any fix
  | any;

export const columns: ColumnDef<TokensColumnTypes>[] = [
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
      <div className="flex items-center ml-5">
        {row.original?.department?.departmentName || "NAN"}
      </div>
    ),
  },
  {
    accessorKey: "userName",
    header: "User",
    cell: ({ row }) => (
      <div className="flex items-center">
        {row.original?.user?.name || "NAN"}
      </div>
    ),
  },
  {
    accessorKey: "counterName",
    header: "Counter",
    cell: ({ row }) => (
      <div className="flex mr-4  items-center ml-4">
        {row.original?.counter?.name || "NAN"}
      </div>
    ),
  },
  {
    accessorKey: "isCompleted",
    header: "Completed",
    cell: ({ row }) => (
      <div className="flex mr-4 items-center ml-5">
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
    cell: ({ row }) => <CellAction data={row.original} type={"tokens"} />,
  },
];
