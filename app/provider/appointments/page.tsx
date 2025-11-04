"use client"

import { AppointmentCalendar } from "@/components/appointments/appointment-calendar"

export default function ProviderAppointmentsPage() {
  // In a real app, get this from auth context
  const providerId = "1"

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Randevularım</h1>
        <p className="text-gray-600">Randevularınızı görüntüleyin ve yönetin</p>
      </div>

      <AppointmentCalendar userType="provider" userId={providerId} />
    </div>
  )
}
