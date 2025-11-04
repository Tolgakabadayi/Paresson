"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Save } from "lucide-react"

interface CommissionSettings {
  defaultRate: number
  minimumRate: number
  maximumRate: number
  featuredPackageFee: number
  verificationFee: number
  customRates: Array<{
    serviceProviderId: string
    rate: number
    reason: string
  }>
}

interface CommissionSettingsProps {
  settings: CommissionSettings
  onUpdate: (settings: CommissionSettings) => Promise<void>
}

export function CommissionSettingsComponent({ settings, onUpdate }: CommissionSettingsProps) {
  const [formData, setFormData] = useState(settings)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      await onUpdate(formData)
      setMessage("Komisyon ayarları başarıyla güncellendi")
    } catch (error) {
      setMessage("Ayarlar güncellenirken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  const updateFormData = (field: string, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Komisyon Ayarları</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {message && (
            <Alert>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="defaultRate">Varsayılan Komisyon Oranı (%)</Label>
              <Input
                id="defaultRate"
                type="number"
                value={formData.defaultRate}
                onChange={(e) => updateFormData("defaultRate", Number.parseFloat(e.target.value))}
                min="0"
                max="100"
                step="0.1"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="featuredPackageFee">Öne Çıkarma Ücreti (₺)</Label>
              <Input
                id="featuredPackageFee"
                type="number"
                value={formData.featuredPackageFee}
                onChange={(e) => updateFormData("featuredPackageFee", Number.parseFloat(e.target.value))}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="minimumRate">Minimum Komisyon Oranı (%)</Label>
              <Input
                id="minimumRate"
                type="number"
                value={formData.minimumRate}
                onChange={(e) => updateFormData("minimumRate", Number.parseFloat(e.target.value))}
                min="0"
                max="100"
                step="0.1"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maximumRate">Maksimum Komisyon Oranı (%)</Label>
              <Input
                id="maximumRate"
                type="number"
                value={formData.maximumRate}
                onChange={(e) => updateFormData("maximumRate", Number.parseFloat(e.target.value))}
                min="0"
                max="100"
                step="0.1"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="verificationFee">Doğrulama Ücreti (₺)</Label>
              <Input
                id="verificationFee"
                type="number"
                value={formData.verificationFee}
                onChange={(e) => updateFormData("verificationFee", Number.parseFloat(e.target.value))}
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Save className="mr-2 h-4 w-4" />
            Ayarları Kaydet
          </Button>
        </form>

        {/* Custom Rates */}
        {formData.customRates.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Özel Komisyon Oranları</h3>
            <div className="space-y-3">
              {formData.customRates.map((rate, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Hizmet Sağlayıcı ID: {rate.serviceProviderId}</p>
                    <p className="text-sm text-gray-600">{rate.reason}</p>
                  </div>
                  <Badge variant="outline">%{rate.rate}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
