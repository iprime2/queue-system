import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET(
  req: Request,
  { params }: { params: { counterId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthenticated!!", { status: 401 });
    }

    const { counterId } = params;

    if (!counterId) {
      return new NextResponse("Counter Id is required", { status: 400 });
    }

    const counter = await prismadb.counter.findUnique({
      where: {
        id: counterId,
      },
    });

    if (!counter) {
      return new NextResponse("Counter not found!!", {
        status: 400,
      });
    }

    return NextResponse.json(counter);
  } catch (error) {
    console.log("[COUNTER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { counterId: string } }
) {
  try {
    const { counterId } = params;

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

    const counter = await prismadb.counter.updateMany({
      where: {
        id: counterId,
      },
      data: {
        name,
        userId,
        departmentId,
        online,
      },
    });

    return NextResponse.json(counter);
  } catch (error) {
    console.log("[COUNTER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { counterId: string } }
) {
  try {
    const { counterId } = params;

    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("UnAuthorized!!", { status: 401 });
    }

    if (!counterId) {
      return new NextResponse("Counter Id is required", { status: 400 });
    }

    const department = await prismadb.counter.deleteMany({
      where: {
        id: counterId,
      },
    });

    return NextResponse.json(department);
  } catch (error) {
    console.log("[COUNTER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
