import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { mockPackages, mockPurchases, mockAppointments } from "@/lib/mock-data"

export async function GET() {
  try {
    const user = await getAuthUser()

    if (!user || user.userType !== "service_provider") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 })
    }

    // Calculate stats from mock data
    const totalPackages = mockPackages.length
    const activePackages = mockPackages.filter((pkg) => pkg.isActive).length
    const totalSales = mockPurchases.reduce((sum, purchase) => sum + purchase.finalPrice, 0)
    const totalCommission = mockPurchases.reduce((sum, purchase) => sum + purchase.commissionAmount, 0)
    const netEarnings = totalSales - totalCommission

    const upcomingAppointments = mockAppointments.filter(
      (apt) => apt.status === "confirmed" && new Date(apt.appointmentDate) >= new Date(),
    ).length

    const completedAppointments = mockAppointments.filter((apt) => apt.status === "completed").length

    const stats = {
      totalPackages,
      activePackages,
      totalSales,
      netEarnings,
      upcomingAppointments,
      completedAppointments,
      averageRating: 4.8,
      totalReviews: 156,
    }

    return NextResponse.json({ stats })
  } catch (error) {
    console.error("Stats fetch error:", error)
    return NextResponse.json({ error: "İstatistikler yüklenirken hata oluştu" }, { status: 500 })
  }
}
