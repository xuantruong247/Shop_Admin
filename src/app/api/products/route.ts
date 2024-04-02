import Product from "@/lib/models/Products";
import { connectDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (req: NextResponse) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    await connectDB();

    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    } = await req.json();

    if (!title || !description || !media || !category || !price || !expense) {
      return new NextResponse("Missing text", { status: 400 });
    }

    const newProduct = await Product.create({
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    });

    await newProduct.save();

    return  NextResponse.json(newProduct, { status: 201 });

  } catch (error) {
    console.log("[Products_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
