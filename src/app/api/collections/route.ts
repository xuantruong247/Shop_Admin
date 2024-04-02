import { connectDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import Collection from "@/lib/models/Conllection";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId }: { userId: string | null } = auth();
    if (!userId) {
      return new NextResponse("Anauthorized", { status: 401 });
    }

    await connectDB();
    const { title, description, image } = await req.json();

    const existingCollection = await Collection.findOne({ title });

    if (existingCollection) {
      return new NextResponse("Collection already exists", { status: 400 });
    }

    if (!title || !image) {
      return new NextResponse("Title nad image are required", { status: 400 });
    }

    const newCollection = await Collection.create({
      title,
      description,
      image,
    });

    await newCollection.save();

    return NextResponse.json(newCollection, { status: 201 });
  } catch (error) {
    console.log(["collection_POST", error]);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (req: NextResponse) => {
  try {
    await connectDB()

    const collections = await Collection.find().sort({createAt:"desc"})

    return NextResponse.json(collections, { status:200});
  } catch (error) {
    console.log("[collection_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
