import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const protectedPaths = [
    "/admin/dashboard",
    "/admin/users",
    "/admin/departments",
    "/admin/tokens",
    "/admin/counters",
  ];
  const isPathProtected = protectedPaths?.some((path) => pathname == path);
  const res = NextResponse.next();
  if (isPathProtected) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_JWT_SECRET,
    });

    // console.log("Middleware");
    // console.log(token);

    if (!token) {
      const url = new URL(`/`, req.url);
      url.searchParams.set("callbackUrl", encodeURI(pathname));
      return NextResponse.redirect(url);
    }
  }
  return res;
}
