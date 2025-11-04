import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { mockTransactions } from "@/lib/mock-data"

export async function GET() {
  try {
    const user = await getAuthUser()

    if (!user || user.userType !== "admin") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 })
    }

    return NextResponse.json({ transactions: mockTransactions })
  } catch (error) {
    console.error("Transactions fetch error:", error)
    return NextResponse.json({ error: "İşlemler yüklenirken hata oluştu" }, { status: 500 })
  }
}
