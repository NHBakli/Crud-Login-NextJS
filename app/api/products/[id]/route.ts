import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

type Props = {
  params: {
    id: string;
  };
};

export const GET = async (req: Request, { params }: Props) => {
  try {
    const prisma = new PrismaClient();

    const id = params.id;

    if (!id) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: +id,
      },
      include: {
        categories: true,
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
};

export const PUT = async (req: Request, { params }: Props) => {
  try {
    const prisma = new PrismaClient();

    const id = +params.id;

    const existingProduct = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        categories: true,
      },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const { title, description, quantity, categories } = await req.json();

    let categoryId;

    if (categories) {
      const category = await prisma.category.findFirst({
        where: { name: categories },
      });

      if (!category) {
        return NextResponse.json(
          { message: "Category not found" },
          { status: 404 }
        );
      }

      categoryId = +category.id;

      await prisma.product.update({
        where: { id: id },
        data: {
          categories: { set: [{ id: categoryId }] },
        },
      });
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: id,
      },
      include: {
        categories: true,
      },
      data: {
        title: title || existingProduct.title,
        description: description || existingProduct.description,
        quantity: quantity !== undefined ? +quantity : existingProduct.quantity,
      },
    });

    return NextResponse.json({ product: updatedProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error!" + error },
      { status: 500 }
    );
  }
};
