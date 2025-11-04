"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Users, Package, DollarSign, Calendar } from "lucide-react"

interface AnalyticsData {
  totalRevenue: number
  totalUsers: number
  totalPackages: number
  monthlyGrowth: number
  categoryStats: Array<{
    name: string
    count: number
    revenue: number
  }>
  monthlyStats: Array<{
    month: string
    revenue: number
    users: number
    packages: number
  }>
}

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - replace with actual API call
    setTimeout(() => {
      setAnalytics({
        totalRevenue: 125600,
        totalUsers: 1247,
        totalPackages: 234,
        monthlyGrowth: 15.2,
        categoryStats: [
          { name: "Spor ve Fitness", count: 89, revenue: 67800 },
          { name: "Sağlık ve Wellness", count: 67, revenue: 45200 },
          { name: "Eğitim", count: 45, revenue: 12600 },
        ],
        monthlyStats: [
          { month: "Ocak", revenue: 18500, users: 156, packages: 23 },
          { month: "Şubat", revenue: 22300, users: 189, packages: 31 },
          { month: "Mart", revenue: 28900, users: 234, packages: 42 },
          { month: "Nisan", revenue: 31200, users: 267, packages: 38 },
          { month: "Mayıs", revenue: 25000, users: 201, packages: 35 },
        ],
      })
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">İstatistikler</h1>
        <p className="text-gray-600">Platform performans analizi ve detaylı raporlar</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺{analytics?.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{analytics?.monthlyGrowth}% geçen aya göre</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Kullanıcı</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Aktif kullanıcı sayısı</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Paket</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.totalPackages}</div>
            <p className="text-xs text-muted-foreground">Aktif paket sayısı</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Büyüme Oranı</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">%{analytics?.monthlyGrowth}</div>
            <p className="text-xs text-muted-foreground">Aylık büyüme oranı</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Kategori Performansı
            </CardTitle>
            <CardDescription>Kategorilere göre paket sayısı ve gelir</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics?.categoryStats.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{category.name}</p>
                    <p className="text-sm text-gray-500">{category.count} paket</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₺{category.revenue.toLocaleString()}</p>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(category.revenue / 70000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Aylık Trend
            </CardTitle>
            <CardDescription>Son 5 ayın performans özeti</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics?.monthlyStats.map((month, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{month.month}</p>
                    <p className="text-sm text-gray-500">{month.users} kullanıcı</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₺{month.revenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{month.packages} paket</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
