import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    // if (!userId) {
    //   return new NextResponse("Unauthenticated", { status: 401 });
    // }

    if (!userId) {
      return new NextResponse("User Id is required", { status: 400 });
    }

    const user = await prismadb.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return new NextResponse("Use not found!!", {
        status: 400,
      });
    }

    user.password = "";

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const body = await req.json();

    const {
      name,
      email,
      password,
      superUser,
      userAccess,
      departmentAccess,
      departmentName,
    } = body;

    // if (!userId) {
    //   return new NextResponse("Unauthenticated", { status: 401 });
    // }

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

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prismadb.user.updateMany({
      where: {
        id: userId,
      },
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
    console.log("[USER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    if (!userId) {
      return new NextResponse("User Id is required", { status: 400 });
    }

    const department = await prismadb.user.deleteMany({
      where: {
        id: userId,
      },
    });

    return NextResponse.json(department);
  } catch (error) {
    console.log("[USER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
