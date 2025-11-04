"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Settings, Shield, DollarSign, Bell } from "lucide-react"

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "Pares",
    siteDescription: "Paket randevu satış platformu",
    supportEmail: "destek@paresapp.online",
    adminEmail: "admin@paresapp.online",
    defaultCommissionRate: 10,
    featuredPackageFee: 50,
    verificationFee: 100,
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false,
    allowNewRegistrations: true,
    requireEmailVerification: true,
    autoApproveProviders: false,
  })

  const handleSave = () => {
    console.log("Saving settings:", settings)
    // API call to save settings
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Platform Ayarları</h1>
        <p className="text-gray-600">Platform genelindeki ayarları yönetin</p>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Genel Ayarlar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="siteName">Site Adı</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => handleSettingChange("siteName", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="supportEmail">Destek E-postası</Label>
                <Input
                  id="supportEmail"
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => handleSettingChange("supportEmail", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="siteDescription">Site Açıklaması</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => handleSettingChange("siteDescription", e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Commission Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Komisyon Ayarları
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="defaultCommissionRate">Varsayılan Komisyon Oranı (%)</Label>
                <Input
                  id="defaultCommissionRate"
                  type="number"
                  value={settings.defaultCommissionRate}
                  onChange={(e) => handleSettingChange("defaultCommissionRate", Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="featuredPackageFee">Öne Çıkarma Ücreti (₺)</Label>
                <Input
                  id="featuredPackageFee"
                  type="number"
                  value={settings.featuredPackageFee}
                  onChange={(e) => handleSettingChange("featuredPackageFee", Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="verificationFee">Doğrulama Ücreti (₺)</Label>
                <Input
                  id="verificationFee"
                  type="number"
                  value={settings.verificationFee}
                  onChange={(e) => handleSettingChange("verificationFee", Number(e.target.value))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Güvenlik Ayarları
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="requireEmailVerification">E-posta Doğrulaması Zorunlu</Label>
                <p className="text-sm text-gray-500">Yeni kullanıcılar e-postalarını doğrulamalı</p>
              </div>
              <Switch
                id="requireEmailVerification"
                checked={settings.requireEmailVerification}
                onCheckedChange={(checked) => handleSettingChange("requireEmailVerification", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoApproveProviders">Hizmet Sağlayıcıları Otomatik Onayla</Label>
                <p className="text-sm text-gray-500">Yeni hizmet sağlayıcıları manuel onay beklemez</p>
              </div>
              <Switch
                id="autoApproveProviders"
                checked={settings.autoApproveProviders}
                onCheckedChange={(checked) => handleSettingChange("autoApproveProviders", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="allowNewRegistrations">Yeni Kayıtlara İzin Ver</Label>
                <p className="text-sm text-gray-500">Platform yeni kullanıcı kayıtlarını kabul eder</p>
              </div>
              <Switch
                id="allowNewRegistrations"
                checked={settings.allowNewRegistrations}
                onCheckedChange={(checked) => handleSettingChange("allowNewRegistrations", checked)}
              />
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
                <p className="text-sm text-gray-500">Sistem e-posta bildirimleri gönderir</p>
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
                <p className="text-sm text-gray-500">Sistem SMS bildirimleri gönderir</p>
              </div>
              <Switch
                id="smsNotifications"
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Sistem Ayarları</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenanceMode">Bakım Modu</Label>
                <p className="text-sm text-gray-500">Site bakım modunda, sadece adminler erişebilir</p>
              </div>
              <Switch
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg">
            Ayarları Kaydet
          </Button>
        </div>
      </div>
    </div>
  )
}
