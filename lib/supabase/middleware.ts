import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  // IMPORTANT: Do not remove getUser() - prevents random logouts
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get user profile to check user_type
  let userType: string | null = null
  if (user) {
    const { data: profile } = await supabase.from("profiles").select("user_type").eq("id", user.id).single()

    userType = profile?.user_type || null
  }

  const isAuthPage = request.nextUrl.pathname.startsWith("/auth")
  const isPublicPage = request.nextUrl.pathname === "/" || request.nextUrl.pathname.startsWith("/packages")
  const isAdminPage = request.nextUrl.pathname.startsWith("/admin")
  const isProviderPage = request.nextUrl.pathname.startsWith("/provider")
  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard")

  // Redirect logic
  if (!user && !isAuthPage && !isPublicPage) {
    const url = request.nextUrl.clone()
    url.pathname = "/auth"
    return NextResponse.redirect(url)
  }

  if (user && isAuthPage) {
    const url = request.nextUrl.clone()
    if (userType === "admin") {
      url.pathname = "/admin"
    } else if (userType === "service_provider") {
      url.pathname = "/provider"
    } else {
      url.pathname = "/dashboard"
    }
    return NextResponse.redirect(url)
  }

  // Role-based access control
  if (isAdminPage && userType !== "admin") {
    const url = request.nextUrl.clone()
    url.pathname = "/auth"
    return NextResponse.redirect(url)
  }

  if (isProviderPage && userType !== "service_provider") {
    const url = request.nextUrl.clone()
    url.pathname = "/auth"
    return NextResponse.redirect(url)
  }

  if (isDashboardPage && userType !== "customer") {
    const url = request.nextUrl.clone()
    url.pathname = "/auth"
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
