"use client";
import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { ProductType } from "@/components/products/type";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import columns from "../../../components/products/ProductColumn"

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);
  const router = useRouter();

  const getProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      });
      const data = await res.json();
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.log("[product_GET]", error);
      toast.error("Something went wrong! Please try again");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  console.log(products);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="px-10">
      <div className="flex justify-between items-center py-2">
        <p className="text-heading2-bold">Products</p>
        <Button
          className="bg-blue-1 text-white"
          onClick={() => {
            router.push("products/new");
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Products
        </Button>
      </div>
      <Separator className="bg-grey-1 mb-4" />
      <DataTable columns={columns} data={products} searchKey="title" />
    </div>
  );
};

export default Products;
