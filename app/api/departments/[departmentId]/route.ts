import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET(
  req: Request,
  { params }: { params: { departmentId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthenticated!!", { status: 401 });
    }

    const { departmentId } = params;

    if (!departmentId) {
      return new NextResponse("Department Id is required", { status: 400 });
    }

    const department = await prismadb.department.findUnique({
      where: {
        id: departmentId,
      },
    });

    return NextResponse.json(department);
  } catch (error) {
    console.log("[DEPARTMENT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { departmentId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthenticated!!", { status: 401 });
    }

    const { departmentId } = params;
    const body = await req.json();

    const { departmentName, schoolName, code } = body;

    if (!departmentName) {
      return new NextResponse("Department Name required", {
        status: 400,
      });
    }

    if (!schoolName) {
      return new NextResponse("School Name is required", {
        status: 400,
      });
    }

    if (!code) {
      return new NextResponse("Code is required", {
        status: 400,
      });
    }

    const department = await prismadb.department.updateMany({
      where: {
        id: departmentId,
      },
      data: {
        departmentName,
        schoolName,
        code,
      },
    });

    return NextResponse.json(department);
  } catch (error) {
    console.log("[DEPARTMENT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { departmentId: string } }
) {
  try {
    const { departmentId } = params;

    if (!departmentId) {
      return new NextResponse("Department Id is required", { status: 400 });
    }

    const department = await prismadb.department.deleteMany({
      where: {
        id: departmentId,
      },
    });

    return NextResponse.json(department);
  } catch (error) {
    console.log("[DEPARTMENT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
