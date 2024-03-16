import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

type Props = {
  params: {
    id: string;
  };
};

export const POST = async (req: Request, { params }: Props) => {
  try {
    const prisma = new PrismaClient();

    const { title, description, quantity, categories } = await req.json();

    const id = +params.id;

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

    const product = await prisma.product.update({
      where: {
        id: id,
      },
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
