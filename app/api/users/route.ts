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
      // imgUrl,
      superUser,
      userAccess,
      departmentAccess,
      departmentName,
    } = body;

    const imageUrl = "";

    if (
      !name ||
      !email ||
      !imageUrl ||
      !superUser ||
      !userAccess ||
      !departmentAccess ||
      !departmentName
    ) {
      return new NextResponse("Some input data is missing!!", { status: 400 });
    }

    const user = await prismadb.user.create({
      data: {
        name,
        email,
        imageUrl,
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
