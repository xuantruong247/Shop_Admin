"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CollectionType } from "./type";
import { Delete } from "..";
import Link from "next/link";
import { Pencil } from "lucide-react";

const CollectionColumns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <p>{row.original.products.length}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex  gap-2 items-center justify-center">
        <Delete item="collections" id={row.original._id} />
        <Link
          href={`/collections/${row.original._id}`}
          className="bg-blue-1 py-3 px-4 text-white rounded-md"
        >
          <Pencil className="h-4 w-4"/>
        </Link>
      </div>
    ),
  },
];

export default CollectionColumns;
