import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { mockCommissionSettings } from "@/lib/mock-data"

export async function GET() {
  try {
    const user = await getAuthUser()

    if (!user || user.userType !== "admin") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 })
    }

    return NextResponse.json({ settings: mockCommissionSettings })
  } catch (error) {
    console.error("Commission settings fetch error:", error)
    return NextResponse.json({ error: "Komisyon ayarları yüklenirken hata oluştu" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getAuthUser()

    if (!user || user.userType !== "admin") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 })
    }

    const updates = await request.json()

    // Update mock settings
    Object.assign(mockCommissionSettings, updates)

    return NextResponse.json({ settings: mockCommissionSettings })
  } catch (error) {
    console.error("Commission settings update error:", error)
    return NextResponse.json({ error: "Komisyon ayarları güncellenirken hata oluştu" }, { status: 500 })
  }
}
