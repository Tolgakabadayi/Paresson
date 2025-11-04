import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { mockAdminStats } from "@/lib/mock-data"

export async function GET() {
  try {
    const user = await getAuthUser()

    if (!user || user.userType !== "admin") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 })
    }

    return NextResponse.json({ stats: mockAdminStats })
  } catch (error) {
    console.error("Admin stats fetch error:", error)
    return NextResponse.json({ error: "İstatistikler yüklenirken hata oluştu" }, { status: 500 })
  }
}
