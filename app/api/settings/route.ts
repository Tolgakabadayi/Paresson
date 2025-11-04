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

    const user = mockUsers.find((u) => u.id === decoded.userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Return user settings or defaults
    const settings = user.settings || {
      emailNotifications: true,
      smsNotifications: false,
      bookingReminders: true,
      promotionalEmails: true,
      weeklyDigest: false,
      profileVisibility: "public",
      showBookingHistory: false,
      allowProviderContact: true,
      shareLocationData: true,
      preferredCity: "İstanbul",
      preferredCategories: ["Spor ve Fitness", "Sağlık ve Wellness"],
      budgetRange: "1000-2000",
      sessionDuration: "60",
      defaultPaymentMethod: "credit_card",
      savePaymentInfo: true,
      autoRenewPackages: false,
    }

    return NextResponse.json(settings)
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
    const userIndex = mockUsers.findIndex((u) => u.id === decoded.userId)
    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update user settings
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      settings: body,
    }

    return NextResponse.json({ message: "Settings updated successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
