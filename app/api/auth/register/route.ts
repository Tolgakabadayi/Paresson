import { type NextRequest, NextResponse } from "next/server"
import { findUserByEmail, createUser, createToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, userType, phone } = await request.json()

    // Validation
    if (!email || !password || !firstName || !lastName || !userType) {
      return NextResponse.json({ error: "Tüm gerekli alanları doldurun" }, { status: 400 })
    }

    if (!["customer", "service_provider"].includes(userType)) {
      return NextResponse.json({ error: "Geçersiz kullanıcı tipi" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Şifre en az 6 karakter olmalıdır" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "Bu email adresi zaten kullanılıyor" }, { status: 409 })
    }

    // Create user
    const newUser = await createUser({
      email,
      password, // Pass plain password, createUser will hash it internally
      userType,
      firstName,
      lastName,
      phone,
    })

    // Create JWT token
    const token = await createToken({
      id: newUser.id,
      email: newUser.email,
      userType: newUser.userType,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      isActive: newUser.isActive,
    })

    // Set cookie
    const response = NextResponse.json({
      user: {
        id: newUser.id,
        email: newUser.email,
        userType: newUser.userType,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        isActive: newUser.isActive,
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
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Kayıt olurken bir hata oluştu" }, { status: 500 })
  }
}
