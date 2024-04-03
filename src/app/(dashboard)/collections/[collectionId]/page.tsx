"use client";

import { CollectionForm } from "@/components";
import { CollectionType } from "@/components/collections/type";
import Loader from "@/components/custom ui/Loader";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CollectionDetails = ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [CollectionDetails, setCollectionDetails] =
    useState<CollectionType | null>(null);

  const getCollectionDetails = async () => {
    try {
      const res = await fetch(`/api/collections/${params.collectionId}`, {
        method: "GET",
      });
      const data = await res.json();
      setCollectionDetails(data);
      setIsLoading(false);
    } catch (error) {
      console.log("[Collection_GET]", error);
    }
  };

  useEffect(() => {
    getCollectionDetails();
  }, []);

  console.log(CollectionDetails);

  return isLoading ? (
    <Loader />
  ) : (
    <CollectionForm initialData={CollectionDetails} />
  );
};

export default CollectionDetails;
