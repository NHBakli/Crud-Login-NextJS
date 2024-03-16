import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const POST = async (req: Request) => {
  try {
    const prisma = new PrismaClient();
    const { title, description, quantity, categories } = await req.json();
    if (!title || !description || !quantity || !categories)
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });

    const category = await prisma.category.findFirst({
      where: { name: categories },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    const product = await prisma.product.create({
      data: {
        title,
        description,
        quantity: +quantity,
        categories: { connect: { id: category.id } },
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error!" }, { status: 500 });
  }
};
