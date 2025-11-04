"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Package, DollarSign, TrendingUp } from "lucide-react"

interface StatsOverviewProps {
  stats: {
    totalUsers: number
    totalServiceProviders: number
    totalCustomers: number
    totalPackages: number
    activePackages: number
    totalSales: number
    totalCommission: number
    monthlyGrowth: number
  }
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Toplam Kullanıcı</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {stats.totalServiceProviders} hizmet sağlayıcı, {stats.totalCustomers} müşteri
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Aktif Paket</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activePackages}</div>
          <p className="text-xs text-muted-foreground">Toplam {stats.totalPackages} paket</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Toplam Satış</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₺{stats.totalSales.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Komisyon: ₺{stats.totalCommission.toLocaleString()}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Aylık Büyüme</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">%{stats.monthlyGrowth}</div>
          <p className="text-xs text-muted-foreground">Önceki aya göre artış</p>
        </CardContent>
      </Card>
    </div>
  )
}
