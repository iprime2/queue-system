import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthenticated!!", { status: 401 });
    }
    const department = await prismadb.department.findMany({});

    return NextResponse.json(department);
  } catch (error) {
    console.log("[DEPARTMENTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthenticated!!", { status: 401 });
    }

    const { departmentName, schoolName, code } = await req.json();

    if (!departmentName || !schoolName || !code) {
      return new NextResponse("Some input data is missing!!", { status: 400 });
    }

    const department = await prismadb.department.create({
      data: {
        departmentName,
        schoolName,
        code,
      },
    });

    return NextResponse.json(department);
  } catch (error) {
    console.log("[DEPARTMENT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
