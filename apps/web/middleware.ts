import { NextRequest, NextResponse } from "next/server";

const isPublic = (path: string) => ["/signin", "/signup"].includes(path);

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("authentication");
  if (!authCookie?.value && !isPublic(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
