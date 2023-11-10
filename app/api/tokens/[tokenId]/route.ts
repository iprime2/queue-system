import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET(
  req: Request,
  { params }: { params: { tokenId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthenticated!!", { status: 401 });
    }

    const { tokenId } = params;

    if (!tokenId) {
      return new NextResponse("Token Id is required", { status: 400 });
    }

    const token = await prismadb.token.findUnique({
      where: {
        id: tokenId,
      },
    });

    if (!token) {
      return new NextResponse("Token not found!!", {
        status: 400,
      });
    }

    return NextResponse.json(token);
  } catch (error) {
    console.log("[TOKEN_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { tokenId: string } }
) {
  try {
    const { tokenId } = params;

    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthenticated!!", { status: 401 });
    }

    const {
      title,
      description,
      tokenNo,
      status,
      isCompleted,
      departmentId,
      counterId,
      userId,
    } = await req.json();

    if (
      !title ||
      !description ||
      !tokenNo ||
      !status ||
      !isCompleted ||
      !counterId ||
      !departmentId ||
      !userId
    ) {
      return new NextResponse("Some input data is missing!!", { status: 400 });
    }

    const counter = await prismadb.counter.findUnique({
      where: {
        id: counterId,
      },
    });

    if (!counter) {
      return new NextResponse("Counter does not exist!!", {
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

    const token = await prismadb.token.updateMany({
      where: {
        id: tokenId,
      },
      data: {
        title,
        description,
        tokenNo,
        status,
        isCompleted,
        counterId,
        departmentId,
        userId,
      },
    });

    return NextResponse.json(token);
  } catch (error) {
    console.log("[TOKEN_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { tokenId: string } }
) {
  try {
    const { tokenId } = params;

    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("UnAuthorized!!", { status: 401 });
    }

    if (!tokenId) {
      return new NextResponse("Token Id is required", { status: 400 });
    }

    const token = await prismadb.token.deleteMany({
      where: {
        id: tokenId,
      },
    });

    return NextResponse.json(token);
  } catch (error) {
    console.log("[TOKEN_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
