import { NextRequest, NextResponse } from "next/server";

import { userService } from "@/components/service/user.service";
import { Roles } from "./types/roles";

export async function middleware(request: NextRequest) {
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

  //* User in not authenticated at all
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //* User is authenticated and role = ADMIN
  //* User can not visit user dashboard
  if (isAdmin && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  //* User is authenticated and role = USER
  //* User can not visit admin-dashboard
  if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
  ],
};
