"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

interface BookAppointmentProps {
  packagePurchaseId: string
  serviceProviderId: string
  customerId: string
  onSuccess?: () => void
}

export function BookAppointment({ packagePurchaseId, serviceProviderId, customerId, onSuccess }: BookAppointmentProps) {
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [notes, setNotes] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [availableDates, setAvailableDates] = useState<string[]>([])

  useEffect(() => {
    // Generate next 7 days as available dates
    const dates = []
    for (let i = 1; i <= 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      dates.push(date.toISOString().split("T")[0])
    }
    setAvailableDates(dates)
  }, [])

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots()
    }
  }, [selectedDate])

  const fetchAvailableSlots = async () => {
    try {
      const response = await fetch(`/api/appointments?providerId=${serviceProviderId}&date=${selectedDate}`)
      const result = await response.json()

      if (result.success) {
        setAvailableSlots(result.data)
      }
    } catch (error) {
      console.error("Failed to fetch available slots:", error)
    }
  }

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Lütfen tarih ve saat seçiniz")
      return
    }

    setLoading(true)
    try {
      const endTime = `${Number.parseInt(selectedTime.split(":")[0]) + 1}:${selectedTime.split(":")[1]}`

      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packagePurchaseId,
          customerId,
          serviceProviderId,
          appointmentDate: selectedDate,
          startTime: selectedTime,
          endTime,
          notes,
        }),
      })

      const result = await response.json()
      if (result.success) {
        alert("Randevu başarıyla oluşturuldu!")
        setSelectedDate("")
        setSelectedTime("")
        setNotes("")
        onSuccess?.()
      } else {
        alert("Randevu oluşturulurken hata oluştu")
      }
    } catch (error) {
      console.error("Failed to book appointment:", error)
      alert("Randevu oluşturulurken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Randevu Al
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Tarih Seçin</label>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Tarih seçiniz</option>
            {availableDates.map((date) => (
              <option key={date} value={date}>
                {new Date(date).toLocaleDateString("tr-TR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </option>
            ))}
          </select>
        </div>

        {selectedDate && (
          <div>
            <label className="block text-sm font-medium mb-2">Saat Seçin</label>
            <div className="grid grid-cols-3 gap-2">
              {availableSlots.map((slot) => (
                <Button
                  key={slot}
                  variant={selectedTime === slot ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTime(slot)}
                  className={selectedTime === slot ? "bg-orange-600 hover:bg-orange-700" : ""}
                >
                  <Clock className="h-4 w-4 mr-1" />
                  {slot}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">Not (Opsiyonel)</label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Randevu ile ilgili özel notlarınızı yazabilirsiniz..."
            className="min-h-[80px]"
          />
        </div>

        <Button
          onClick={handleBookAppointment}
          disabled={!selectedDate || !selectedTime || loading}
          className="w-full bg-orange-600 hover:bg-orange-700"
        >
          {loading ? "Randevu Oluşturuluyor..." : "Randevu Al"}
        </Button>
      </CardContent>
    </Card>
  )
}
