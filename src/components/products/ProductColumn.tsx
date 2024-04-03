"use client";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { ProductType } from "./type";
import Link from "next/link";
import { Delete } from "..";
import { Pencil } from "lucide-react";

const ProductColumn: ColumnDef<ProductType>[] = [
  {
    accessorKey: "title",
    header: "Title",
  
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "collections",
    header: "Collections",
    cell: ({ row }) =>
      row.original.collections.map((colection) => colection.title).join(", "),
  },
  {
    accessorKey: "price",
    header: "Price ($)",
  },
  {
    accessorKey: "expense",
    header: "Expense ($)",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex  gap-2 items-center justify-center">
        <Delete item="products" id={row.original._id} />
        <Link
          href={`/products/${row.original._id}`}
          className="bg-blue-1 py-3 px-4 text-white rounded-md"
        >
          <Pencil className="h-4 w-4"/>
        </Link>
      </div>
    ),
  },
];

export default ProductColumn;
