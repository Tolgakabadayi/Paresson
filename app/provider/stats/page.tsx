"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, Users, Package, DollarSign, Star } from "lucide-react"

interface ProviderStats {
  totalRevenue: number
  totalPackages: number
  totalCustomers: number
  averageRating: number
  monthlyRevenue: Array<{
    month: string
    revenue: number
    sales: number
  }>
  topPackages: Array<{
    title: string
    sales: number
    revenue: number
  }>
  recentReviews: Array<{
    customerName: string
    rating: number
    comment: string
    date: string
  }>
}

export default function ProviderStatsPage() {
  const [stats, setStats] = useState<ProviderStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("6months")

  useEffect(() => {
    // Mock data - replace with actual API call
    setTimeout(() => {
      setStats({
        totalRevenue: 45600,
        totalPackages: 12,
        totalCustomers: 156,
        averageRating: 4.8,
        monthlyRevenue: [
          { month: "Ocak", revenue: 6800, sales: 8 },
          { month: "Şubat", revenue: 8200, sales: 12 },
          { month: "Mart", revenue: 9500, sales: 15 },
          { month: "Nisan", revenue: 7800, sales: 11 },
          { month: "Mayıs", revenue: 8900, sales: 13 },
          { month: "Haziran", revenue: 4400, sales: 6 },
        ],
        topPackages: [
          { title: "10 Seans Pilates Paketi", sales: 45, revenue: 54000 },
          { title: "5 Seans Yoga Paketi", sales: 32, revenue: 24000 },
          { title: "8 Seans Kişisel Antrenman", sales: 18, revenue: 32400 },
        ],
        recentReviews: [
          {
            customerName: "Zeynep D.",
            rating: 5,
            comment: "Harika bir deneyimdi, kesinlikle tavsiye ederim!",
            date: "2024-01-15",
          },
          {
            customerName: "Mehmet K.",
            rating: 4,
            comment: "Profesyonel yaklaşım ve etkili seanslar.",
            date: "2024-01-12",
          },
          {
            customerName: "Ayşe M.",
            rating: 5,
            comment: "Çok memnun kaldım, devam edeceğim.",
            date: "2024-01-10",
          },
        ],
      })
      setLoading(false)
    }, 1000)
  }, [timeRange])

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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">İstatistikler</h1>
          <p className="text-gray-600">İşletmenizin performans analizi</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3months">Son 3 Ay</SelectItem>
            <SelectItem value="6months">Son 6 Ay</SelectItem>
            <SelectItem value="1year">Son 1 Yıl</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺{stats?.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12.5% geçen aya göre</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Müşteri</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">Aktif müşteri sayısı</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Paket</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalPackages}</div>
            <p className="text-xs text-muted-foreground">Yayında olan paketler</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Puan</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.averageRating}</div>
            <p className="text-xs text-muted-foreground">Müşteri memnuniyeti</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Aylık Gelir Trendi
            </CardTitle>
            <CardDescription>Son 6 ayın gelir performansı</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.monthlyRevenue.map((month, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{month.month}</p>
                    <p className="text-sm text-gray-500">{month.sales} satış</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₺{month.revenue.toLocaleString()}</p>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(month.revenue / 10000) * 100}%` }}
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
              <BarChart3 className="w-5 h-5 mr-2" />
              En Popüler Paketler
            </CardTitle>
            <CardDescription>Satış performansına göre sıralama</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.topPackages.map((pkg, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{pkg.title}</p>
                    <p className="text-sm text-gray-500">{pkg.sales} satış</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₺{pkg.revenue.toLocaleString()}</p>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${(pkg.sales / 50) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reviews */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="w-5 h-5 mr-2" />
            Son Değerlendirmeler
          </CardTitle>
          <CardDescription>Müşterilerinizden gelen son yorumlar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats?.recentReviews.map((review, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{review.customerName}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString("tr-TR")}</span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
