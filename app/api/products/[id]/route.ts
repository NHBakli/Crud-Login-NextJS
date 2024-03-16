import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
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
