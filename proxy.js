import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(request) {

  const token = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup")
  ) {

    if (token) {
      return NextResponse.redirect(new URL("/shortme", request.url));
    }

    return NextResponse.next();
  }

  if (pathname.startsWith("/shortme") || pathname.startsWith("/") ) {
  
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {

      jwt.verify(token, process.env.JWT_SECRET);

      return NextResponse.next();

    } catch {

      return NextResponse.redirect(new URL("/login", request.url));

    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/","/login", "/signup", "/shortme/:path*"],
};