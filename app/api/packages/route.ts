import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { mockCustomerPackages, mockCategories } from "@/lib/mock-data"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const featured = searchParams.get("featured")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")

    let packages = mockCustomerPackages.filter((pkg) => pkg.isActive)

    // Apply filters
    if (category && category !== "all") {
      packages = packages.filter((pkg) => pkg.categoryId === category)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      packages = packages.filter(
        (pkg) =>
          pkg.title.toLowerCase().includes(searchLower) ||
          pkg.description?.toLowerCase().includes(searchLower) ||
          pkg.serviceProvider?.businessName?.toLowerCase().includes(searchLower),
      )
    }

    if (featured === "true") {
      packages = packages.filter((pkg) => pkg.isFeatured)
    }

    if (minPrice) {
      packages = packages.filter((pkg) => pkg.price >= Number.parseFloat(minPrice))
    }

    if (maxPrice) {
      packages = packages.filter((pkg) => pkg.price <= Number.parseFloat(maxPrice))
    }

    return NextResponse.json({
      packages,
      categories: mockCategories.filter((cat) => cat.isActive),
    })
  } catch (error) {
    console.error("Packages fetch error:", error)
    return NextResponse.json({ error: "Paketler yüklenirken hata oluştu" }, { status: 500 })
  }
}
