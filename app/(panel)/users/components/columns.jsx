"use client";

import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const columns = columnHelper.columns([
  columnHelper.accessor("fullName", {
    header: "نام و نام خانوادگی",
  }),
  columnHelper.accessor("phoneNumber", {
    header: "شماره تماس",
  }),
  columnHelper.accessor("balance", {
    header: "balance",
    cell: ({ row }) => {
      return <div className="text-success">{`${row.original.balance} تومان`}</div>;
    },
  }),
  columnHelper.accessor("display", {
    header: "عملیات",
    cell: ({ row }) => {
      return <div className="">عملیات ها</div>;
    },
  }),
]);
