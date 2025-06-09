import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { isTokenExpired } from "@/lib/jwt"

const publicRoutes = [
    "/login",
    "/institutions",
    "/institutions/register",
    "/institutions/*/register",
]

export function middleware(request: NextRequest) {
    console.log('pass here');
  const { pathname } = request.nextUrl


  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  const token = request.cookies.get("auth-storage")?.value

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  try {
    const parsedStorage = JSON.parse(token)
    const authToken = parsedStorage?.state?.token

    if (!authToken || isTokenExpired(authToken)) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
