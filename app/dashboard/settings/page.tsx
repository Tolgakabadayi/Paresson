"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Shield, CreditCard, MapPin, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CustomerSettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    bookingReminders: true,
    promotionalEmails: true,
    weeklyDigest: false,

    // Privacy Settings
    profileVisibility: "public",
    showBookingHistory: false,
    allowProviderContact: true,
    shareLocationData: true,

    // Preference Settings
    preferredCity: "İstanbul",
    preferredCategories: ["Spor ve Fitness", "Sağlık ve Wellness"],
    budgetRange: "1000-2000",
    sessionDuration: "60",

    // Payment Settings
    defaultPaymentMethod: "credit_card",
    savePaymentInfo: true,
    autoRenewPackages: false,
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/settings")
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
      const response = await fetch("/api/settings", {
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

  const categories = ["Spor ve Fitness", "Sağlık ve Wellness", "Eğitim", "Sanat ve Müzik", "Turizm ve Etkinlik"]

  const toggleCategory = (category: string) => {
    const newCategories = settings.preferredCategories.includes(category)
      ? settings.preferredCategories.filter((c) => c !== category)
      : [...settings.preferredCategories, category]

    setSettings((prev) => ({ ...prev, preferredCategories: newCategories }))
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Ayarlar</h1>
        <p className="text-gray-600">Hesap ayarlarınızı ve tercihlerinizi yönetin</p>
      </div>

      <div className="space-y-6">
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
                <p className="text-sm text-gray-500">Randevu onayları ve güncellemeler için e-posta alın</p>
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
                <p className="text-sm text-gray-500">Yaklaşan randevularınız için hatırlatma alın</p>
              </div>
              <Switch
                id="bookingReminders"
                checked={settings.bookingReminders}
                onCheckedChange={(checked) => handleSettingChange("bookingReminders", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="promotionalEmails">Promosyon E-postaları</Label>
                <p className="text-sm text-gray-500">Özel teklifler ve indirimler hakkında bilgi alın</p>
              </div>
              <Switch
                id="promotionalEmails"
                checked={settings.promotionalEmails}
                onCheckedChange={(checked) => handleSettingChange("promotionalEmails", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="weeklyDigest">Haftalık Özet</Label>
                <p className="text-sm text-gray-500">Yeni paketler ve öneriler hakkında haftalık e-posta alın</p>
              </div>
              <Switch
                id="weeklyDigest"
                checked={settings.weeklyDigest}
                onCheckedChange={(checked) => handleSettingChange("weeklyDigest", checked)}
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
                  <SelectItem value="providers">Sadece Hizmet Sağlayıcılar</SelectItem>
                  <SelectItem value="private">Gizli</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="showBookingHistory">Rezervasyon Geçmişini Göster</Label>
                <p className="text-sm text-gray-500">Hizmet sağlayıcılar geçmiş rezervasyonlarınızı görebilir</p>
              </div>
              <Switch
                id="showBookingHistory"
                checked={settings.showBookingHistory}
                onCheckedChange={(checked) => handleSettingChange("showBookingHistory", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="allowProviderContact">Hizmet Sağlayıcı İletişimine İzin Ver</Label>
                <p className="text-sm text-gray-500">Hizmet sağlayıcılar size direkt mesaj gönderebilir</p>
              </div>
              <Switch
                id="allowProviderContact"
                checked={settings.allowProviderContact}
                onCheckedChange={(checked) => handleSettingChange("allowProviderContact", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="shareLocationData">Konum Verilerini Paylaş</Label>
                <p className="text-sm text-gray-500">
                  Yakınınızdaki hizmetleri önerebilmemiz için konum verilerinizi kullanın
                </p>
              </div>
              <Switch
                id="shareLocationData"
                checked={settings.shareLocationData}
                onCheckedChange={(checked) => handleSettingChange("shareLocationData", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preference Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Tercih Ayarları
            </CardTitle>
            <CardDescription>Size uygun paketleri önerebilmemiz için tercihlerinizi belirtin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="preferredCity">Tercih Edilen Şehir</Label>
                <Select
                  value={settings.preferredCity}
                  onValueChange={(value) => handleSettingChange("preferredCity", value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="İstanbul">İstanbul</SelectItem>
                    <SelectItem value="Ankara">Ankara</SelectItem>
                    <SelectItem value="İzmir">İzmir</SelectItem>
                    <SelectItem value="Online">Online</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="budgetRange">Bütçe Aralığı (₺)</Label>
                <Select
                  value={settings.budgetRange}
                  onValueChange={(value) => handleSettingChange("budgetRange", value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-500">0 - 500 ₺</SelectItem>
                    <SelectItem value="500-1000">500 - 1.000 ₺</SelectItem>
                    <SelectItem value="1000-2000">1.000 - 2.000 ₺</SelectItem>
                    <SelectItem value="2000+">2.000 ₺ ve üzeri</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="sessionDuration">Tercih Edilen Seans Süresi (dakika)</Label>
              <Select
                value={settings.sessionDuration}
                onValueChange={(value) => handleSettingChange("sessionDuration", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 dakika</SelectItem>
                  <SelectItem value="45">45 dakika</SelectItem>
                  <SelectItem value="60">60 dakika</SelectItem>
                  <SelectItem value="90">90 dakika</SelectItem>
                  <SelectItem value="120">120 dakika</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>İlgi Alanları</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={settings.preferredCategories.includes(category) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleCategory(category)}
                    className="justify-start"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Ödeme Ayarları
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="defaultPaymentMethod">Varsayılan Ödeme Yöntemi</Label>
              <Select
                value={settings.defaultPaymentMethod}
                onValueChange={(value) => handleSettingChange("defaultPaymentMethod", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit_card">Kredi Kartı</SelectItem>
                  <SelectItem value="debit_card">Banka Kartı</SelectItem>
                  <SelectItem value="bank_transfer">Havale/EFT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="savePaymentInfo">Ödeme Bilgilerini Kaydet</Label>
                <p className="text-sm text-gray-500">
                  Gelecekteki ödemeler için kart bilgilerinizi güvenli şekilde saklayın
                </p>
              </div>
              <Switch
                id="savePaymentInfo"
                checked={settings.savePaymentInfo}
                onCheckedChange={(checked) => handleSettingChange("savePaymentInfo", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoRenewPackages">Paketleri Otomatik Yenile</Label>
                <p className="text-sm text-gray-500">Süresi dolan paketler otomatik olarak yenilensin</p>
              </div>
              <Switch
                id="autoRenewPackages"
                checked={settings.autoRenewPackages}
                onCheckedChange={(checked) => handleSettingChange("autoRenewPackages", checked)}
              />
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
