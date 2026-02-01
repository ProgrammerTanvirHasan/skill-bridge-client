import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/components/service/user.service";
import { Roles } from "./types/roles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let isAuthenticated = false;
  let isAdmin = false;
  let isTutor = false;

  const session = await userService.getSession();

  if (!session?.data?.data?.role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = session.data.data.role;
  console.log(role, "rolekkkkk");

  isAuthenticated = true;
  isAdmin = role === Roles.ADMIN;
  isTutor = role === Roles.TUTOR;

  if (isAdmin && pathname.startsWith("/tutor")) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (isTutor && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/tutor", request.url));
  }

  if (
    !isAdmin &&
    !isTutor &&
    (pathname.startsWith("/admin") || pathname.startsWith("/tutor"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/tutor/:path*"],
};
