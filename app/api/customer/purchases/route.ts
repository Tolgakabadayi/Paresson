import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { mockCustomerPurchases, mockCustomerPackages } from "@/lib/mock-data"

export async function GET() {
  try {
    const user = await getAuthUser()

    if (!user || user.userType !== "customer") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 })
    }

    // In real app, filter by customer ID
    const purchases = mockCustomerPurchases

    return NextResponse.json({ purchases })
  } catch (error) {
    console.error("Purchases fetch error:", error)
    return NextResponse.json({ error: "Satın alımlar yüklenirken hata oluştu" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthUser()

    if (!user || user.userType !== "customer") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 })
    }

    const { packageId } = await request.json()

    if (!packageId) {
      return NextResponse.json({ error: "Paket ID gereklidir" }, { status: 400 })
    }

    // Find package
    const packageData = mockCustomerPackages.find((pkg) => pkg.id === packageId)
    if (!packageData) {
      return NextResponse.json({ error: "Paket bulunamadı" }, { status: 404 })
    }

    // Create purchase (mock)
    const newPurchase = {
      id: (mockCustomerPurchases.length + 1).toString(),
      customerId: user.id,
      packageId: packageData.id,
      serviceProviderId: packageData.serviceProviderId,
      originalPrice: packageData.price,
      finalPrice: packageData.price,
      commissionAmount: packageData.price * 0.1,
      sessionsTotal: packageData.sessionCount,
      sessionsUsed: 0,
      sessionsRemaining: packageData.sessionCount,
      purchaseDate: new Date().toISOString(),
      expiryDate: new Date(Date.now() + packageData.validityDays * 24 * 60 * 60 * 1000).toISOString(),
      status: "active" as const,
      paymentStatus: "completed" as const,
      paymentMethod: "credit_card",
      transactionId: `tx_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      package: packageData,
      serviceProvider: packageData.serviceProvider,
    }

    mockCustomerPurchases.push(newPurchase)

    return NextResponse.json({ purchase: newPurchase })
  } catch (error) {
    console.error("Purchase creation error:", error)
    return NextResponse.json({ error: "Satın alma işlemi sırasında hata oluştu" }, { status: 500 })
  }
}
