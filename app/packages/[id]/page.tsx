"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Star, MapPin, Clock, User, Calendar, Shield, ArrowLeft, ShoppingCart } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import type { Package, ServiceProvider, Category } from "@/lib/types"

interface PackageWithDetails extends Package {
  serviceProvider?: ServiceProvider
  category?: Category
}

export default function PackageDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [packageData, setPackageData] = useState<PackageWithDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await fetch(`/api/packages/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setPackageData(data.package)
        } else {
          setError("Paket bulunamadı")
        }
      } catch (error) {
        console.error("Package fetch error:", error)
        setError("Paket yüklenirken hata oluştu")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchPackage()
    }
  }, [params.id])

  const handlePurchase = async () => {
    if (!user) {
      router.push("/auth")
      return
    }

    if (user.userType !== "customer") {
      setError("Sadece müşteriler paket satın alabilir")
      return
    }

    setPurchasing(true)
    setError("")

    try {
      const response = await fetch("/api/customer/purchases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: params.id }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Satın alma işlemi başarısız")
      }

      // Redirect to customer dashboard
      router.push("/dashboard/packages")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Satın alma işlemi sırasında hata oluştu")
    } finally {
      setPurchasing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (error && !packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <p className="text-gray-500 mb-4">{error}</p>
            <Button onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Geri Dön
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!packageData) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Geri Dön
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Package Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-2">
                    {packageData.isFeatured && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                        Öne Çıkan
                      </Badge>
                    )}
                    <CardTitle className="text-2xl text-balance">{packageData.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {packageData.serviceProvider?.businessName}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        {packageData.serviceProvider?.rating} ({packageData.serviceProvider?.totalReviews}{" "}
                        değerlendirme)
                      </div>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base">{packageData.description}</CardDescription>
              </CardHeader>
            </Card>

            {/* Package Details */}
            <Card>
              <CardHeader>
                <CardTitle>Paket Detayları</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Seans Sayısı</p>
                      <p className="text-sm text-gray-600">{packageData.sessionCount} seans</p>
                    </div>
                  </div>
                  {packageData.durationMinutes && (
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium">Seans Süresi</p>
                        <p className="text-sm text-gray-600">{packageData.durationMinutes} dakika</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Geçerlilik Süresi</p>
                      <p className="text-sm text-gray-600">{packageData.validityDays} gün</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Konum</p>
                      <p className="text-sm text-gray-600">
                        {packageData.serviceProvider?.locationDistrict}, {packageData.serviceProvider?.locationCity}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Provider Info */}
            <Card>
              <CardHeader>
                <CardTitle>Hizmet Sağlayıcı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{packageData.serviceProvider?.businessName}</h3>
                      <p className="text-sm text-gray-600 mb-2">{packageData.serviceProvider?.specialization}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                          {packageData.serviceProvider?.rating}
                        </div>
                        <span>{packageData.serviceProvider?.totalReviews} değerlendirme</span>
                        {packageData.serviceProvider?.isVerified && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Doğrulanmış
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  {packageData.serviceProvider?.description && (
                    <p className="text-sm text-gray-600">{packageData.serviceProvider.description}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <Card className="sticky top-6">
              <CardHeader>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">₺{packageData.price.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">
                    Seans başı ₺{Math.round(packageData.price / packageData.sessionCount).toLocaleString()}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button className="w-full" size="lg" onClick={handlePurchase} disabled={purchasing}>
                  {purchasing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Satın Alınıyor...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Paketi Satın Al
                    </>
                  )}
                </Button>

                <div className="text-xs text-gray-500 text-center">Güvenli ödeme ile korunuyorsunuz</div>
              </CardContent>
            </Card>

            {/* Package Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bu Pakette</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>{packageData.sessionCount} seans garantisi</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <span>{packageData.validityDays} gün geçerlilik</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-green-600" />
                  <span>Uzman eğitmen</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Para iade garantisi</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
