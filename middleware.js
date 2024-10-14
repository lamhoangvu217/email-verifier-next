import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/",
};

export function middleware(req) {
  if (req.nextUrl.pathname === "/") {
    const response = NextResponse.redirect(new URL("/email-verifier", req.url));
    return response;
  }

  return NextResponse.next();
}
