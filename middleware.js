import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET
);

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("jwt")?.value;
  let isLoggedIn = false;

  console.log("Middleware invoked for path:", pathname);
  console.log("JWT Token:", token ? "Present" : "Not Present", "this is the token:",token);

 

  if (token) {
    try {
      await jwtVerify(token, SECRET, {
        algorithms: ["HS256"],
      });
      isLoggedIn = true;
    } catch {
      // ❗ Do NOT log out user here
      isLoggedIn = false;
    }
  }

  const authPages = ["/signin", "/signup"];
  const protectedPrefixes = [
    "/updatePassword",
    "/food",
    "/household",
    "/toiletries",
    "/cleaning",
    "/other",
  ];

  // Logged-in users → block auth pages
  if (isLoggedIn && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Not logged-in → block protected routes
  if (!isLoggedIn) {
    const isProtected = protectedPrefixes.some(
      (prefix) => pathname === prefix || pathname.startsWith(prefix + "/")
    );

    if (isProtected) {
      return NextResponse.redirect(
        new URL("/signin", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/signin",
    "/signup",
    "/updatePassword",
    "/food/:path*",
    "/household/:path*",
    "/toiletries/:path*",
    "/cleaning/:path*",
    "/other/:path*",
  ],
};