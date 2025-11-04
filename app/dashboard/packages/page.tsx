"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, Clock, MapPin, User, Eye, CalendarPlus } from "lucide-react"
import Link from "next/link"
import { BookAppointment } from "@/components/appointments/book-appointment"
import { useAuth } from "@/hooks/use-auth"
import type { PackagePurchase, Package, ServiceProvider } from "@/lib/types"

interface PurchaseWithDetails extends PackagePurchase {
  package?: Package
  serviceProvider?: ServiceProvider
}

export default function CustomerPackages() {
  const { user } = useAuth()
  const [purchases, setPurchases] = useState<PurchaseWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [openDialogId, setOpenDialogId] = useState<string | null>(null)

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await fetch("/api/customer/purchases")
        if (response.ok) {
          const data = await response.json()
          setPurchases(data.purchases)
        }
      } catch (error) {
        console.error("Purchases fetch error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPurchases()
  }, [])

  const handleBookingSuccess = () => {
    setOpenDialogId(null)
    // Refresh purchases to update session count
    const fetchPurchases = async () => {
      try {
        const response = await fetch("/api/customer/purchases")
        if (response.ok) {
          const data = await response.json()
          setPurchases(data.purchases)
        }
      } catch (error) {
        console.error("Purchases fetch error:", error)
      }
    }
    fetchPurchases()
  }

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
          <p className="text-gray-600">Satın aldığınız paketleri yönetin</p>
        </div>
        <Button asChild>
          <Link href="/packages">Yeni Paket Keşfet</Link>
        </Button>
      </div>

      {/* Packages */}
      {purchases.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {purchases.map((purchase) => {
            const progressPercentage = (purchase.sessionsUsed / purchase.sessionsTotal) * 100
            const isExpiringSoon =
              purchase.expiryDate && new Date(purchase.expiryDate).getTime() - Date.now() < 30 * 24 * 60 * 60 * 1000 // 30 days
            const canBookAppointment = purchase.status === "active" && purchase.sessionsRemaining > 0

            return (
              <Card key={purchase.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={purchase.status === "active" ? "default" : "secondary"}>
                      {purchase.status === "active"
                        ? "Aktif"
                        : purchase.status === "expired"
                          ? "Süresi Dolmuş"
                          : purchase.status === "completed"
                            ? "Tamamlandı"
                            : "İptal Edildi"}
                    </Badge>
                    {isExpiringSoon && purchase.status === "active" && (
                      <Badge variant="outline" className="text-orange-600 border-orange-600">
                        Yakında Sona Eriyor
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg text-balance">{purchase.package?.title}</CardTitle>
                  <CardDescription className="space-y-1">
                    <div className="flex items-center text-sm">
                      <User className="w-4 h-4 mr-1" />
                      {purchase.serviceProvider?.businessName}
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {purchase.serviceProvider?.locationDistrict}, {purchase.serviceProvider?.locationCity}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Kullanılan Seans</span>
                      <span>
                        {purchase.sessionsUsed} / {purchase.sessionsTotal}
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                    <div className="text-xs text-gray-500">{purchase.sessionsRemaining} seans kaldı</div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-medium">Satın Alma</p>
                        <p className="text-gray-600">{new Date(purchase.purchaseDate).toLocaleDateString("tr-TR")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-medium">Son Kullanma</p>
                        <p className="text-gray-600">
                          {purchase.expiryDate ? new Date(purchase.expiryDate).toLocaleDateString("tr-TR") : "Belirsiz"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex justify-between items-center pt-2 border-t">
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">₺{purchase.finalPrice.toLocaleString()}</div>
                      {purchase.originalPrice !== purchase.finalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          ₺{purchase.originalPrice.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    {canBookAppointment && user && (
                      <Dialog
                        open={openDialogId === purchase.id}
                        onOpenChange={(open) => setOpenDialogId(open ? purchase.id : null)}
                      >
                        <DialogTrigger asChild>
                          <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                            <CalendarPlus className="mr-2 h-4 w-4" />
                            Randevu Al
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Randevu Oluştur</DialogTitle>
                          </DialogHeader>
                          <BookAppointment
                            packagePurchaseId={purchase.id}
                            serviceProviderId={purchase.serviceProviderId}
                            customerId={user.id}
                            onSuccess={handleBookingSuccess}
                          />
                        </DialogContent>
                      </Dialog>
                    )}
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Eye className="mr-2 h-4 w-4" />
                      Detaylar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-gray-500 mb-4">Henüz paket satın almadınız</div>
            <Button asChild>
              <Link href="/packages">Paketleri Keşfedin</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
