import { type NextRequest, NextResponse } from "next/server"
import { findUserByEmail, verifyPassword, createToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email ve şifre gereklidir" }, { status: 400 })
    }

    // Find user by email
    const user = await findUserByEmail(email)
    if (!user) {
      return NextResponse.json({ error: "Geçersiz email veya şifre" }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password) // Use user.password instead of user.passwordHash
    if (!isValidPassword) {
      return NextResponse.json({ error: "Geçersiz email veya şifre" }, { status: 401 })
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json({ error: "Hesabınız devre dışı bırakılmış" }, { status: 403 })
    }

    // Create JWT token
    const token = await createToken({
      id: user.id,
      email: user.email,
      userType: user.userType,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
    })

    // Set cookie
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        userType: user.userType,
        firstName: user.firstName,
        lastName: user.lastName,
        isActive: user.isActive,
      },
    })

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Giriş yapılırken bir hata oluştu" }, { status: 500 })
  }
}
