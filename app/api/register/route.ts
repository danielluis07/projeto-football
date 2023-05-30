import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, apikey } = body;

    if (!email || !name || !apikey) {
      return new NextResponse("Faltando informações", { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        apikey,
      },
    });
    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error, "REGISTRATION_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
