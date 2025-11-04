"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, TrendingUp, Calendar, Star } from "lucide-react"

interface StatsCardsProps {
  stats: {
    totalPackages: number
    activePackages: number
    totalSales: number
    netEarnings: number
    upcomingAppointments: number
    completedAppointments: number
    averageRating: number
    totalReviews: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Toplam Paket</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalPackages}</div>
          <p className="text-xs text-muted-foreground">{stats.activePackages} aktif paket</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Kazanç</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₺{stats.netEarnings.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Toplam satış: ₺{stats.totalSales.toLocaleString()}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Yaklaşan Randevu</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.upcomingAppointments}</div>
          <p className="text-xs text-muted-foreground">{stats.completedAppointments} tamamlanan</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Değerlendirme</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.averageRating}</div>
          <p className="text-xs text-muted-foreground">{stats.totalReviews} değerlendirme</p>
        </CardContent>
      </Card>
    </div>
  )
}
