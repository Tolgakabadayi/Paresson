import { NextResponse } from "next/server"
import { mockCustomerPackages } from "@/lib/mock-data"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const packageId = params.id
    const packageData = mockCustomerPackages.find((pkg) => pkg.id === packageId)

    if (!packageData) {
      return NextResponse.json({ error: "Paket bulunamadı" }, { status: 404 })
    }

    return NextResponse.json({ package: packageData })
  } catch (error) {
    console.error("Package fetch error:", error)
    return NextResponse.json({ error: "Paket yüklenirken hata oluştu" }, { status: 500 })
  }
}
