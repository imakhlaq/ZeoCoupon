import { auth } from "@/auth";
import { NextResponse } from "next/server";

const privateRoutes = ["/dashboard"];

export default auth(async function (req) {
  const pathName = req.nextUrl.pathname;
  const isPrivate = privateRoutes.some((path) => path.startsWith(pathName));
  const authInfo = await auth();

  //if user is logged in no login page for him
  if (pathName.startsWith("/login") && authInfo?.user) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  //its not not private visite the page
  if (!isPrivate) {
    return NextResponse.next();
  }

  if (!authInfo?.user && isPrivate) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
};
