import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { mockPackages, mockCategories } from "@/lib/mock-data"

export async function GET() {
  try {
    const user = await getAuthUser()

    if (!user || user.userType !== "service_provider") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 })
    }

    // In real app, filter by service provider ID
    const packages = mockPackages.map((pkg) => ({
      ...pkg,
      category: mockCategories.find((cat) => cat.id === pkg.categoryId),
    }))

    return NextResponse.json({ packages })
  } catch (error) {
    console.error("Packages fetch error:", error)
    return NextResponse.json({ error: "Paketler yüklenirken hata oluştu" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthUser()

    if (!user || user.userType !== "service_provider") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 })
    }

    const packageData = await request.json()

    // Validation
    if (!packageData.title || !packageData.price || !packageData.sessionCount) {
      return NextResponse.json({ error: "Gerekli alanları doldurun" }, { status: 400 })
    }

    // In real app, save to database
    const newPackage = {
      id: (mockPackages.length + 1).toString(),
      serviceProviderId: "1", // Should be user's service provider ID
      ...packageData,
      isActive: true,
      isFeatured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockPackages.push(newPackage)

    return NextResponse.json({ package: newPackage })
  } catch (error) {
    console.error("Package creation error:", error)
    return NextResponse.json({ error: "Paket oluşturulurken hata oluştu" }, { status: 500 })
  }
}
