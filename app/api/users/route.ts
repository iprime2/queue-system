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

    const users = await prismadb.user.findMany({});

    return NextResponse.json(users);
  } catch (error) {
    console.log("[USERS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthenticated!!", { status: 401 });
    }

    const {
      name,
      email,
      password,
      superUser,
      userAccess,
      departmentAccess,
      departmentName,
    } = await req.json();

    // const imageUrl = "";

    if (!name || !email || !password || !departmentName) {
      return new NextResponse("Some input data is missing!!", { status: 400 });
    }

    if (
      superUser === null ||
      !userAccess === null ||
      !departmentAccess === null
    ) {
      return new NextResponse("Access input data is missing!!", {
        status: 400,
      });
    }

    const department = await prismadb.department.findUnique({
      where: {
        departmentName: departmentName,
      },
    });

    if (department) {
      return new NextResponse("Department does not exist!!", {
        status: 400,
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prismadb.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        superUser,
        userAccess,
        departmentAccess,
        departmentName,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[DEPARTMENT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
