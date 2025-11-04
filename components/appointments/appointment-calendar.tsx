"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, User, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Appointment {
  id: string
  packagePurchaseId: string
  customerId: string
  serviceProviderId: string
  appointmentDate: string
  startTime: string
  endTime: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  notes?: string
  customerName?: string
  packageTitle?: string
}

interface AppointmentCalendarProps {
  userType: "provider" | "customer"
  userId: string
}

export function AppointmentCalendar({ userType, userId }: AppointmentCalendarProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0])

  useEffect(() => {
    fetchAppointments()
  }, [userId, userType])

  const fetchAppointments = async () => {
    try {
      const params = userType === "provider" ? `providerId=${userId}` : `customerId=${userId}`
      const response = await fetch(`/api/appointments?${params}`)
      const result = await response.json()

      if (result.success) {
        setAppointments(result.data)
      }
    } catch (error) {
      console.error("Failed to fetch appointments:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateAppointmentStatus = async (appointmentId: string, status: string) => {
    try {
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      const result = await response.json()
      if (result.success) {
        fetchAppointments()
      }
    } catch (error) {
      console.error("Failed to update appointment:", error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const filteredAppointments = appointments.filter((apt) => apt.appointmentDate === selectedDate)

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Randevu Takvimi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-4">
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Seçilen tarihte randevu bulunmuyor</p>
              </div>
            ) : (
              filteredAppointments.map((appointment) => (
                <Card key={appointment.id} className="border-l-4 border-l-orange-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">
                            {appointment.startTime} - {appointment.endTime}
                          </span>
                          <Badge className={getStatusColor(appointment.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(appointment.status)}
                              {appointment.status === "pending"
                                ? "Bekliyor"
                                : appointment.status === "confirmed"
                                  ? "Onaylandı"
                                  : appointment.status === "completed"
                                    ? "Tamamlandı"
                                    : "İptal"}
                            </div>
                          </Badge>
                        </div>

                        {userType === "provider" && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <User className="h-4 w-4" />
                            <span>Müşteri: {appointment.customerName || "Mehmet Demir"}</span>
                          </div>
                        )}

                        {appointment.notes && <p className="text-sm text-gray-600">{appointment.notes}</p>}
                      </div>

                      {userType === "provider" && appointment.status === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => updateAppointmentStatus(appointment.id, "confirmed")}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Onayla
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateAppointmentStatus(appointment.id, "cancelled")}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            İptal Et
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
