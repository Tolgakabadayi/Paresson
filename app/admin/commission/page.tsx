"use client"

import { useEffect, useState } from "react"
import { CommissionSettingsComponent } from "@/components/admin/commission-settings"

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

export default function AdminCommissionPage() {
  const [settings, setSettings] = useState<CommissionSettings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/admin/commission")
        if (response.ok) {
          const data = await response.json()
          setSettings(data.settings)
        }
      } catch (error) {
        console.error("Commission settings fetch error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const handleUpdate = async (newSettings: CommissionSettings) => {
    const response = await fetch("/api/admin/commission", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSettings),
    })

    if (!response.ok) {
      throw new Error("Ayarlar güncellenemedi")
    }

    const data = await response.json()
    setSettings(data.settings)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (!settings) return null

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Komisyon Yönetimi</h1>
        <p className="text-gray-600">Platform komisyon ayarlarını yönetin</p>
      </div>

      <CommissionSettingsComponent settings={settings} onUpdate={handleUpdate} />
    </div>
  )
}
