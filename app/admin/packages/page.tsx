"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Eye, Star, TrendingUp } from "lucide-react"

interface PackageData {
  id: string
  title: string
  provider: string
  category: string
  price: number
  salesCount: number
  isActive: boolean
  isSponsored: boolean
}

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<PackageData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - replace with actual API call
    setTimeout(() => {
      setPackages([
        {
          id: "1",
          title: "5 Seans Pilates Paketi",
          provider: "Ayşe Yılmaz",
          category: "Spor",
          price: 750,
          salesCount: 45,
          isActive: true,
          isSponsored: false,
        },
        {
          id: "2",
          title: "10 Masaj Seansı",
          provider: "Mehmet Kaya",
          category: "Sağlık",
          price: 1200,
          salesCount: 32,
          isActive: true,
          isSponsored: true,
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const toggleSponsored = (id: string) => {
    setPackages(packages.map((pkg) => (pkg.id === id ? { ...pkg, isSponsored: !pkg.isSponsored } : pkg)))
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Paket Yönetimi</h1>
        <p className="text-gray-600">Platform üzerindeki tüm paketleri yönetin</p>
      </div>

      <div className="space-y-4">
        {packages.map((pkg) => (
          <Card key={pkg.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Package className="w-5 h-5 text-gray-600" />
                  <div>
                    <CardTitle className="text-lg">{pkg.title}</CardTitle>
                    <CardDescription>
                      {pkg.provider} • {pkg.category}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {pkg.isSponsored && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      <Star className="w-3 h-3 mr-1" />
                      Sponsorlu
                    </Badge>
                  )}
                  <Badge variant={pkg.isActive ? "default" : "secondary"}>{pkg.isActive ? "Aktif" : "Pasif"}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Fiyat:</span> ₺{pkg.price}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="font-medium">{pkg.salesCount}</span> satış
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    İncele
                  </Button>
                  <Button
                    variant={pkg.isSponsored ? "secondary" : "default"}
                    size="sm"
                    onClick={() => toggleSponsored(pkg.id)}
                  >
                    <Star className="w-4 h-4 mr-1" />
                    {pkg.isSponsored ? "Sponsorluğu Kaldır" : "Sponsorla"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
