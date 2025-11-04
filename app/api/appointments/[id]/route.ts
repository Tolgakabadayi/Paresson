import { type NextRequest, NextResponse } from "next/server"
import { mockProviderAppointments } from "@/lib/mock-data"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { status, notes } = body
    const appointmentId = params.id

    // Find appointment
    const appointment = mockProviderAppointments.find((apt) => apt.id === appointmentId)

    if (!appointment) {
      return NextResponse.json({ success: false, error: "Appointment not found" }, { status: 404 })
    }

    // Update appointment
    const updatedAppointment = {
      ...appointment,
      status: status || appointment.status,
      notes: notes || appointment.notes,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: updatedAppointment,
      message: "Randevu başarıyla güncellendi",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update appointment" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const appointmentId = params.id

    // Find appointment
    const appointment = mockProviderAppointments.find((apt) => apt.id === appointmentId)

    if (!appointment) {
      return NextResponse.json({ success: false, error: "Appointment not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Randevu başarıyla iptal edildi",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to cancel appointment" }, { status: 500 })
  }
}
