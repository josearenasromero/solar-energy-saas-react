import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: "next-auth.session-token",
  });

  if (!session && req.nextUrl.pathname.startsWith("/home")) {
    //return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    session &&
    (req.nextUrl.pathname.startsWith("/auth") || req.nextUrl.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}
