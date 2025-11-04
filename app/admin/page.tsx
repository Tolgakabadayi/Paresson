"use client"

import { useEffect, useState } from "react"
import { StatsOverview } from "@/components/admin/stats-overview"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface AdminStats {
  totalUsers: number
  totalServiceProviders: number
  totalCustomers: number
  totalPackages: number
  activePackages: number
  totalSales: number
  totalCommission: number
  monthlyGrowth: number
  topCategories: Array<{
    name: string
    count: number
    percentage: number
  }>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats")
        if (response.ok) {
          const data = await response.json()
          setStats(data.stats)
        }
      } catch (error) {
        console.error("Admin stats fetch error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Platform yönetim paneline hoş geldiniz</p>
        </div>
      </div>

      {/* Stats Overview */}
      <StatsOverview stats={stats} />

      {/* Additional Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Popüler Kategoriler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.topCategories.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{category.name}</span>
                  <span>{category.count} paket</span>
                </div>
                <Progress value={category.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Hızlı İşlemler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-3">
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium text-sm">Bekleyen Doğrulamalar</h4>
                <p className="text-xs text-gray-600">3 hizmet sağlayıcı doğrulama bekliyor</p>
              </div>
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium text-sm">Yeni Kayıtlar</h4>
                <p className="text-xs text-gray-600">Bu hafta 12 yeni kullanıcı kaydı</p>
              </div>
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium text-sm">Komisyon Ödemeleri</h4>
                <p className="text-xs text-gray-600">₺2,340 ödeme bekliyor</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
