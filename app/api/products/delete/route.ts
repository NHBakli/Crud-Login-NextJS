import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const DELETE = async (req: Request) => {
  try {
    const prisma = new PrismaClient();
    const { id } = await req.json();
    if (!id)
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });

    const product = await prisma.product.delete({
      where: { id: +id },
    });

    return NextResponse.json(
      { message: `The product ${product.title} is delete` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server Error!" }, { status: 500 });
  }
};
