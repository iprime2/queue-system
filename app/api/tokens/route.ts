import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthenticated!!", { status: 401 });
    }

    const tokens = await prismadb.token.findMany({});

    return NextResponse.json(tokens);
  } catch (error) {
    console.log("[TOKENS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthenticated!!", { status: 401 });
    }

    const { title, description, tokenNo, status, isCompleted, counterId } =
      await req.json();

    if (
      !title ||
      !description ||
      !tokenNo ||
      !status ||
      !isCompleted ||
      !counterId
    ) {
      return new NextResponse("Some input data is missing!!", { status: 400 });
    }

    const counter = await prismadb.counter.findUnique({
      where: {
        id: counterId,
      },
    });

    if (!counter) {
      return new NextResponse("Department does not exist!!", {
        status: 400,
      });
    }

    const token = await prismadb.token.create({
      data: {
        title,
        description,
        tokenNo,
        status,
        isCompleted,
        counterId,
      },
    });

    return NextResponse.json(token);
  } catch (error) {
    console.log("[TOKEN_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
