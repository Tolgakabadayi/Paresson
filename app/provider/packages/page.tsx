"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Eye, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import type { Package, Category } from "@/lib/types"

export default function ProviderPackages() {
  const [packages, setPackages] = useState<(Package & { category?: Category })[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("/api/provider/packages")
        if (response.ok) {
          const data = await response.json()
          setPackages(data.packages)
        }
      } catch (error) {
        console.error("Packages fetch error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPackages()
  }, [])

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && pkg.isActive) ||
      (statusFilter === "inactive" && !pkg.isActive)
    return matchesSearch && matchesStatus
  })

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
          <h1 className="text-3xl font-bold text-gray-900">Paketlerim</h1>
          <p className="text-gray-600">Hizmet paketlerinizi yönetin</p>
        </div>
        <Button asChild>
          <Link href="/provider/packages/new">
            <Plus className="mr-2 h-4 w-4" />
            Yeni Paket
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Paket ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Paketler</SelectItem>
            <SelectItem value="active">Aktif Paketler</SelectItem>
            <SelectItem value="inactive">Pasif Paketler</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Packages Grid */}
      {filteredPackages.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPackages.map((pkg) => (
            <Card key={pkg.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={pkg.isActive ? "default" : "secondary"}>{pkg.isActive ? "Aktif" : "Pasif"}</Badge>
                  {pkg.isFeatured && <Badge variant="outline">Öne Çıkan</Badge>}
                </div>
                <CardTitle className="text-lg text-balance">{pkg.title}</CardTitle>
                <CardDescription className="text-sm">
                  {pkg.category?.name} • {pkg.sessionCount} seans
                  {pkg.durationMinutes && ` • ${pkg.durationMinutes} dk`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-2xl font-bold text-gray-900">₺{pkg.price.toLocaleString()}</div>
                  {pkg.description && <p className="text-sm text-gray-600 line-clamp-2">{pkg.description}</p>}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Eye className="mr-2 h-4 w-4" />
                      Görüntüle
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Edit className="mr-2 h-4 w-4" />
                      Düzenle
                    </Button>
                    <Button size="sm" variant="outline">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-gray-500 mb-4">
              {searchTerm || statusFilter !== "all"
                ? "Arama kriterlerinize uygun paket bulunamadı"
                : "Henüz paket oluşturmadınız"}
            </div>
            <Button asChild>
              <Link href="/provider/packages/new">
                <Plus className="mr-2 h-4 w-4" />
                İlk Paketinizi Oluşturun
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
