"use client"

import { useEffect, useState } from "react"
import { StatsCards } from "@/components/provider/stats-cards"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye, Edit, MoreHorizontal } from "lucide-react"
import Link from "next/link"

interface Stats {
  totalPackages: number
  activePackages: number
  totalSales: number
  netEarnings: number
  upcomingAppointments: number
  completedAppointments: number
  averageRating: number
  totalReviews: number
}

interface Package {
  id: string
  title: string
  price: number
  sessionCount: number
  isActive: boolean
  isFeatured: boolean
}

export default function ProviderDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentPackages, setRecentPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, packagesRes] = await Promise.all([
          fetch("/api/provider/stats"),
          fetch("/api/provider/packages"),
        ])

        if (statsRes.ok) {
          const statsData = await statsRes.json()
          setStats(statsData.stats)
        }

        if (packagesRes.ok) {
          const packagesData = await packagesRes.json()
          setRecentPackages(packagesData.packages.slice(0, 3))
        }
      } catch (error) {
        console.error("Dashboard data fetch error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Hizmet sağlayıcı panelinize hoş geldiniz</p>
        </div>
        <Button asChild>
          <Link href="/provider/packages/new">
            <Plus className="mr-2 h-4 w-4" />
            Yeni Paket
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      {stats && <StatsCards stats={stats} />}

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Packages */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Son Paketler</CardTitle>
              <CardDescription>En son oluşturduğunuz paketler</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/provider/packages">
                <Eye className="mr-2 h-4 w-4" />
                Tümünü Gör
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPackages.length > 0 ? (
              recentPackages.map((pkg) => (
                <div key={pkg.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{pkg.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-600">₺{pkg.price.toLocaleString()}</span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-600">{pkg.sessionCount} seans</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {pkg.isFeatured && <Badge variant="secondary">Öne Çıkan</Badge>}
                    <Badge variant={pkg.isActive ? "default" : "secondary"}>{pkg.isActive ? "Aktif" : "Pasif"}</Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Henüz paket oluşturmadınız</p>
                <Button className="mt-2" asChild>
                  <Link href="/provider/packages/new">İlk Paketinizi Oluşturun</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Hızlı İşlemler</CardTitle>
            <CardDescription>Sık kullanılan işlemler</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
              <Link href="/provider/packages/new">
                <Plus className="mr-2 h-4 w-4" />
                Yeni Paket Oluştur
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
              <Link href="/provider/appointments">
                <Eye className="mr-2 h-4 w-4" />
                Randevuları Görüntüle
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
              <Link href="/provider/profile">
                <Edit className="mr-2 h-4 w-4" />
                Profili Düzenle
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
              <Link href="/provider/stats">
                <MoreHorizontal className="mr-2 h-4 w-4" />
                Detaylı İstatistikler
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
