import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(req: Request) {
  try {
    const users = await prismadb.user.findMany({});

    return NextResponse.json(users);
  } catch (error) {
    console.log("[USERS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      superUser,
      userAccess,
      departmentAccess,
      departmentName,
    } = body;

    // const imageUrl = "";

    if (!name || !email || !departmentName) {
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

    const user = await prismadb.user.create({
      data: {
        name,
        email,
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
