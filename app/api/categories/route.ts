import { NextResponse } from "next/server"
import { mockCategories } from "@/lib/mock-data"

export async function GET() {
  try {
    const categories = mockCategories.filter((cat) => cat.isActive)
    return NextResponse.json({ categories })
  } catch (error) {
    console.error("Categories fetch error:", error)
    return NextResponse.json({ error: "Kategoriler yüklenirken hata oluştu" }, { status: 500 })
  }
}
