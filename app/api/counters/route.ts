import bcrypt from "bcrypt";
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

    const counters = await prismadb.counter.findMany({});

    return NextResponse.json(counters);
  } catch (error) {
    console.log("[COUNTERS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthenticated!!", { status: 401 });
    }

    const { name, online, userId, departmentId } = await req.json();

    if (!name || !userId || !departmentId) {
      return new NextResponse("Some input data is missing!!", { status: 400 });
    }

    if (online === null) {
      return new NextResponse("Access input data is missing!!", {
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

    const user = await prismadb.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return new NextResponse("User does not exist!!", {
        status: 400,
      });
    }

    const counter = await prismadb.counter.create({
      data: {
        name,
        userId,
        departmentId,
        online,
      },
    });

    return NextResponse.json(counter);
  } catch (error) {
    console.log("[COUNTER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
