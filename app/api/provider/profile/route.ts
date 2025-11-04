import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { mockUsers } from "@/lib/mock-data"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const user = mockUsers.find((u) => u.id === decoded.userId && u.userType === "service_provider")
    if (!user) {
      return NextResponse.json({ error: "Provider not found" }, { status: 404 })
    }

    return NextResponse.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || "+90 555 000 0000",
      city: user.city || "İstanbul",
      district: user.district || "Merkez",
      address: user.address || "",
      profession: user.profession || "",
      experience: user.experience || "0",
      bio: user.bio || "",
      specialties: user.specialties || "",
      avatar: user.avatar || null,
    })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const body = await request.json()
    const { firstName, lastName, phone, city, district, address, profession, experience, bio, specialties } = body

    // In real app, update database
    const userIndex = mockUsers.findIndex((u) => u.id === decoded.userId && u.userType === "service_provider")
    if (userIndex === -1) {
      return NextResponse.json({ error: "Provider not found" }, { status: 404 })
    }

    // Update mock user data
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      firstName,
      lastName,
      phone,
      city,
      district,
      address,
      profession,
      experience,
      bio,
      specialties,
    }

    return NextResponse.json({ message: "Profile updated successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
