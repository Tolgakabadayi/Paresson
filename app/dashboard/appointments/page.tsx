"use client"

import { AppointmentCalendar } from "@/components/appointments/appointment-calendar"

export default function CustomerAppointmentsPage() {
  // In a real app, get this from auth context
  const customerId = "3"

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Randevularım</h1>
        <p className="text-gray-600">Randevularınızı görüntüleyin ve yönetin</p>
      </div>

      <AppointmentCalendar userType="customer" userId={customerId} />
    </div>
  )
}
