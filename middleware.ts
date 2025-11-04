import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public routes - giriş gerektirmeyen sayfalar
  const publicRoutes = ["/", "/auth", "/packages", "/api/auth/login", "/api/auth/register", "/api/auth/me"]

  // API routes için özel kontrol
  if (pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  // Public route ise devam et
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Diğer tüm route'lar için devam et (auth kontrolü yok)
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
