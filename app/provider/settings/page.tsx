"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Shield, CreditCard, Calendar, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ProviderSettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    // Business Settings
    autoAcceptBookings: false,
    requireAdvanceBooking: true,
    advanceBookingHours: 24,
    maxBookingsPerDay: 8,
    workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    workingHours: {
      start: "09:00",
      end: "18:00",
    },

    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    bookingReminders: true,
    marketingEmails: false,

    // Payment Settings
    bankName: "",
    accountNumber: "",
    iban: "",

    // Privacy Settings
    showPhoneNumber: true,
    showEmail: false,
    allowDirectMessages: true,
    profileVisibility: "public",
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/provider/settings")
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error)
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/provider/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        toast({
          title: "Başarılı",
          description: "Ayarlarınız güncellendi.",
        })
      } else {
        throw new Error("Failed to update settings")
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: "Ayarlar güncellenirken bir hata oluştu.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleWorkingDayToggle = (day: string) => {
    const newWorkingDays = settings.workingDays.includes(day)
      ? settings.workingDays.filter((d) => d !== day)
      : [...settings.workingDays, day]

    setSettings((prev) => ({ ...prev, workingDays: newWorkingDays }))
  }

  const weekDays = [
    { key: "monday", label: "Pazartesi" },
    { key: "tuesday", label: "Salı" },
    { key: "wednesday", label: "Çarşamba" },
    { key: "thursday", label: "Perşembe" },
    { key: "friday", label: "Cuma" },
    { key: "saturday", label: "Cumartesi" },
    { key: "sunday", label: "Pazar" },
  ]

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Ayarlar</h1>
        <p className="text-gray-600">İşletme ayarlarınızı yönetin</p>
      </div>

      <div className="space-y-6">
        {/* Business Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Randevu Ayarları
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoAcceptBookings">Randevuları Otomatik Onayla</Label>
                <p className="text-sm text-gray-500">Yeni randevular manuel onay beklemez</p>
              </div>
              <Switch
                id="autoAcceptBookings"
                checked={settings.autoAcceptBookings}
                onCheckedChange={(checked) => handleSettingChange("autoAcceptBookings", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="requireAdvanceBooking">Önceden Rezervasyon Zorunlu</Label>
                <p className="text-sm text-gray-500">Randevular en az belirtilen süre önceden alınmalı</p>
              </div>
              <Switch
                id="requireAdvanceBooking"
                checked={settings.requireAdvanceBooking}
                onCheckedChange={(checked) => handleSettingChange("requireAdvanceBooking", checked)}
              />
            </div>

            {settings.requireAdvanceBooking && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="advanceBookingHours">Minimum Önceden Rezervasyon (Saat)</Label>
                  <Input
                    id="advanceBookingHours"
                    type="number"
                    value={settings.advanceBookingHours}
                    onChange={(e) => handleSettingChange("advanceBookingHours", Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="maxBookingsPerDay">Günlük Maksimum Randevu</Label>
                  <Input
                    id="maxBookingsPerDay"
                    type="number"
                    value={settings.maxBookingsPerDay}
                    onChange={(e) => handleSettingChange("maxBookingsPerDay", Number(e.target.value))}
                  />
                </div>
              </div>
            )}

            <div>
              <Label>Çalışma Günleri</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {weekDays.map((day) => (
                  <Button
                    key={day.key}
                    variant={settings.workingDays.includes(day.key) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleWorkingDayToggle(day.key)}
                    className="justify-start"
                  >
                    {day.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="workingHoursStart">Çalışma Saati Başlangıç</Label>
                <Input
                  id="workingHoursStart"
                  type="time"
                  value={settings.workingHours.start}
                  onChange={(e) =>
                    handleSettingChange("workingHours", { ...settings.workingHours, start: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="workingHoursEnd">Çalışma Saati Bitiş</Label>
                <Input
                  id="workingHoursEnd"
                  type="time"
                  value={settings.workingHours.end}
                  onChange={(e) =>
                    handleSettingChange("workingHours", { ...settings.workingHours, end: e.target.value })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Bildirim Ayarları
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications">E-posta Bildirimleri</Label>
                <p className="text-sm text-gray-500">Yeni randevular ve mesajlar için e-posta alın</p>
              </div>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="smsNotifications">SMS Bildirimleri</Label>
                <p className="text-sm text-gray-500">Önemli bildirimler için SMS alın</p>
              </div>
              <Switch
                id="smsNotifications"
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="bookingReminders">Randevu Hatırlatmaları</Label>
                <p className="text-sm text-gray-500">Yaklaşan randevular için hatırlatma alın</p>
              </div>
              <Switch
                id="bookingReminders"
                checked={settings.bookingReminders}
                onCheckedChange={(checked) => handleSettingChange("bookingReminders", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketingEmails">Pazarlama E-postaları</Label>
                <p className="text-sm text-gray-500">Yeni özellikler ve promosyonlar hakkında bilgi alın</p>
              </div>
              <Switch
                id="marketingEmails"
                checked={settings.marketingEmails}
                onCheckedChange={(checked) => handleSettingChange("marketingEmails", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Ödeme Bilgileri
            </CardTitle>
            <CardDescription>Kazançlarınızın aktarılacağı banka hesap bilgileri</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bankName">Banka Adı</Label>
                <Input
                  id="bankName"
                  value={settings.bankName}
                  onChange={(e) => handleSettingChange("bankName", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="accountNumber">Hesap Numarası</Label>
                <Input
                  id="accountNumber"
                  value={settings.accountNumber}
                  onChange={(e) => handleSettingChange("accountNumber", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="iban">IBAN</Label>
              <Input
                id="iban"
                value={settings.iban}
                onChange={(e) => handleSettingChange("iban", e.target.value)}
                placeholder="TR12 3456 7890 1234 5678 9012 34"
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Gizlilik Ayarları
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="showPhoneNumber">Telefon Numarasını Göster</Label>
                <p className="text-sm text-gray-500">Müşteriler telefon numaranızı görebilir</p>
              </div>
              <Switch
                id="showPhoneNumber"
                checked={settings.showPhoneNumber}
                onCheckedChange={(checked) => handleSettingChange("showPhoneNumber", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="showEmail">E-posta Adresini Göster</Label>
                <p className="text-sm text-gray-500">Müşteriler e-posta adresinizi görebilir</p>
              </div>
              <Switch
                id="showEmail"
                checked={settings.showEmail}
                onCheckedChange={(checked) => handleSettingChange("showEmail", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="allowDirectMessages">Direkt Mesajlara İzin Ver</Label>
                <p className="text-sm text-gray-500">Müşteriler size direkt mesaj gönderebilir</p>
              </div>
              <Switch
                id="allowDirectMessages"
                checked={settings.allowDirectMessages}
                onCheckedChange={(checked) => handleSettingChange("allowDirectMessages", checked)}
              />
            </div>

            <div>
              <Label htmlFor="profileVisibility">Profil Görünürlüğü</Label>
              <Select
                value={settings.profileVisibility}
                onValueChange={(value) => handleSettingChange("profileVisibility", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Herkese Açık</SelectItem>
                  <SelectItem value="customers">Sadece Müşteriler</SelectItem>
                  <SelectItem value="private">Gizli</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Kaydediliyor...
              </>
            ) : (
              "Ayarları Kaydet"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
