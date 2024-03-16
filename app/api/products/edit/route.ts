import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const GET = async (req: Request) => {
  try {
    const prisma = new PrismaClient();
    const { id } = await req.json();
    if (!id)
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });

    const product = await prisma.product.findUnique({
      where: { id: +id },
    });

    return NextResponse.json({ message: product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
};
