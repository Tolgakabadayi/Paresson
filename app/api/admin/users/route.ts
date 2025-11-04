import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { mockAdminUsers } from "@/lib/mock-data"

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser()

    if (!user || user.userType !== "admin") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const userType = searchParams.get("userType")
    const search = searchParams.get("search")
    const status = searchParams.get("status")

    let users = [...mockAdminUsers]

    // Apply filters
    if (userType && userType !== "all") {
      users = users.filter((u) => u.userType === userType)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      users = users.filter(
        (u) =>
          u.firstName.toLowerCase().includes(searchLower) ||
          u.lastName.toLowerCase().includes(searchLower) ||
          u.email.toLowerCase().includes(searchLower),
      )
    }

    if (status && status !== "all") {
      users = users.filter((u) => (status === "active" ? u.isActive : !u.isActive))
    }

    return NextResponse.json({ users })
  } catch (error) {
    console.error("Admin users fetch error:", error)
    return NextResponse.json({ error: "Kullanıcılar yüklenirken hata oluştu" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getAuthUser()

    if (!user || user.userType !== "admin") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 })
    }

    const { userId, action } = await request.json()

    if (!userId || !action) {
      return NextResponse.json({ error: "Gerekli parametreler eksik" }, { status: 400 })
    }

    const userIndex = mockAdminUsers.findIndex((u) => u.id === userId)
    if (userIndex === -1) {
      return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 })
    }

    // Apply action
    switch (action) {
      case "activate":
        mockAdminUsers[userIndex].isActive = true
        break
      case "deactivate":
        mockAdminUsers[userIndex].isActive = false
        break
      case "verify":
        if (mockAdminUsers[userIndex].serviceProvider) {
          mockAdminUsers[userIndex].serviceProvider!.isVerified = true
        }
        break
      case "unverify":
        if (mockAdminUsers[userIndex].serviceProvider) {
          mockAdminUsers[userIndex].serviceProvider!.isVerified = false
        }
        break
      default:
        return NextResponse.json({ error: "Geçersiz işlem" }, { status: 400 })
    }

    return NextResponse.json({ user: mockAdminUsers[userIndex] })
  } catch (error) {
    console.error("Admin user update error:", error)
    return NextResponse.json({ error: "Kullanıcı güncellenirken hata oluştu" }, { status: 500 })
  }
}
