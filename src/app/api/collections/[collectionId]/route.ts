import Collection from "@/lib/models/Conllection";
import { connectDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const GET = async (
  req: NextResponse,
  { params }: { params: { collectionId: string } }
) => {
  try {
    await connectDB();

    const collection = await Collection.findById(params.collectionId);

    if (!collection) {
      return new NextResponse(
        JSON.stringify({ message: "Collection not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    console.log("[Collections_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const POST = async (
  req: NextResponse,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();

    let conllection = await Collection.findById(params.collectionId);

    if (!conllection) {
      return new NextResponse("Collection nou found", { status: 404 });
    }

    const { title, description, image } = await req.json();

    if (!title || !image) {
      return new NextResponse("Title and Image are required", { status: 400 });
    }

    conllection = await Collection.findByIdAndUpdate(
      params.collectionId,
      { title, description, image },
      { new: true }
    );
    await conllection.save()
    return new NextResponse(conllection, { status: 200 });
  } catch (error) {
    console.log("[Collections_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextResponse,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Anauthorized", { status: 401 });
    }

    await connectDB();

    await Collection.findByIdAndDelete(params.collectionId);
    return new NextResponse("Collection is deleted", { status: 200 });
  } catch (error) {
    console.log("[collectionId_DELTE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
