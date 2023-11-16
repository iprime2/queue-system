import { Department } from "@prisma/client";
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

    const { title, description, tokenNo, status, isCompleted, departmentId } =
      await req.json();

    if (!title || !description || !tokenNo || !status || !departmentId) {
      return new NextResponse("Some input data is missing!!", { status: 400 });
    }

    if (isCompleted === null || isCompleted === undefined) {
      return new NextResponse("Complete status data is missing!!", {
        status: 400,
      });
    }

    const department = await prismadb.department.findUnique({
      where: {
        id: departmentId,
      },
    });

    if (!department) {
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
        departmentId,
      },
    });

    return NextResponse.json(token);
  } catch (error) {
    console.log("[TOKEN_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
