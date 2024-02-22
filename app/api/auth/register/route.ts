import { connectToDatabase } from "@/helpers/server-helpers";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  try {
    const prisma = new PrismaClient();
    const { name, email, password } = await req.json();
    if (!name || !email || !password)
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      email,
      name,
      password: hashedPassword,
    };

    await connectToDatabase(prisma);
    const user = await prisma.user.create({
      data: userData,
    });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server Error!" }, { status: 500 });
  }
};
