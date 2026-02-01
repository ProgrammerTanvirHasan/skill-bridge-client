import { NextRequest, NextResponse } from "next/server";

import { userService } from "@/components/service/user.service";
import { Roles } from "./types/roles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log(pathname, "pathname");

  let isAuthenticated = false;
  let isAdmin = false;
  let isTutor = false;

  const { data } = await userService.getSession();

  if (data) {
    isAuthenticated = true;
    isAdmin = data.data.role === Roles.ADMIN;
    isTutor = data.data.role === Roles.TUTOR;
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    (isAdmin && pathname.startsWith("/dashboard")) ||
    pathname.startsWith("/tutor")
  ) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (
    isTutor &&
    (pathname.startsWith("/dashboard") || pathname.startsWith("/admin"))
  ) {
    return NextResponse.redirect(new URL("/tutor", request.url));
  }

  if (
    !isAdmin &&
    !isTutor &&
    (pathname.startsWith("/tutor") || pathname.startsWith("/admin"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin",
    "/admin/:path*",
    "/tutor",
    "/tutor/:path*",
  ],
};
