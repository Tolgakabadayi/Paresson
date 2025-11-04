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

    // Return provider settings or defaults
    const settings = user.providerSettings || {
      autoAcceptBookings: false,
      requireAdvanceBooking: true,
      advanceBookingHours: 24,
      maxBookingsPerDay: 8,
      workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      workingHours: {
        start: "09:00",
        end: "18:00",
      },
      emailNotifications: true,
      smsNotifications: false,
      bookingReminders: true,
      marketingEmails: false,
      bankName: "",
      accountNumber: "",
      iban: "",
      showPhoneNumber: true,
      showEmail: false,
      allowDirectMessages: true,
      profileVisibility: "public",
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
    const userIndex = mockUsers.findIndex((u) => u.id === decoded.userId && u.userType === "service_provider")
    if (userIndex === -1) {
      return NextResponse.json({ error: "Provider not found" }, { status: 404 })
    }

    // Update provider settings
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      providerSettings: body,
    }

    return NextResponse.json({ message: "Settings updated successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
