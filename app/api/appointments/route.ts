import { type NextRequest, NextResponse } from "next/server"
import { mockProviderAppointments, mockAvailableSlots } from "@/lib/mock-data"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const providerId = searchParams.get("providerId")
  const customerId = searchParams.get("customerId")
  const date = searchParams.get("date")

  try {
    if (date && providerId) {
      // Get available slots for a specific date and provider
      const availableSlot = mockAvailableSlots.find((slot) => slot.date === date)
      return NextResponse.json({
        success: true,
        data: availableSlot?.slots || [],
      })
    }

    // Filter appointments based on user type
    let appointments = mockProviderAppointments

    if (providerId) {
      appointments = appointments.filter((apt) => apt.serviceProviderId === providerId)
    }

    if (customerId) {
      appointments = appointments.filter((apt) => apt.customerId === customerId)
    }

    return NextResponse.json({
      success: true,
      data: appointments,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch appointments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { packagePurchaseId, customerId, serviceProviderId, appointmentDate, startTime, endTime, notes } = body

    // Validate required fields
    if (!packagePurchaseId || !customerId || !serviceProviderId || !appointmentDate || !startTime || !endTime) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Create new appointment
    const newAppointment = {
      id: `apt_${Date.now()}`,
      packagePurchaseId,
      customerId,
      serviceProviderId,
      appointmentDate,
      startTime,
      endTime,
      status: "pending" as const,
      notes: notes || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: newAppointment,
      message: "Randevu başarıyla oluşturuldu",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create appointment" }, { status: 500 })
  }
}
