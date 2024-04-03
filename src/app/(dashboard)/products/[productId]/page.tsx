"use client";
import { ProductForm } from "@/components";
import Loader from "@/components/custom ui/Loader";
import { ProductType } from "@/components/products/type";
import React, { useEffect, useState } from "react";

const ProductDetail = ({ params }: { params: { productId: string } }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [productDetail, setProductDetail] = useState<ProductType | null>(null);

  const getProductDetail = async () => {
    try {
      const res = await fetch(`/api/products/${params.productId}`, {
        method: "GET",
      });
      const data = await res.json();
      console.log(data);

      setProductDetail(data);
      setIsLoading(false);
    } catch (error) {
      console.log("[Product_GET]", error);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  return isLoading ? <Loader /> : <ProductForm initialData={productDetail} />;
};

export default ProductDetail;
