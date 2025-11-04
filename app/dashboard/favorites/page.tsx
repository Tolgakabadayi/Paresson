"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Clock, Star, Trash2 } from "lucide-react"
import Link from "next/link"

interface FavoritePackage {
  id: string
  title: string
  description: string
  price: number
  sessionCount: number
  durationMinutes: number
  serviceProvider: {
    businessName: string
    locationCity: string
    locationDistrict: string
    rating: number
  }
  category: {
    name: string
  }
  addedDate: string
}

export default function CustomerFavoritesPage() {
  const [favorites, setFavorites] = useState<FavoritePackage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - replace with actual API call
    setTimeout(() => {
      setFavorites([
        {
          id: "1",
          title: "10 Seans Pilates Paketi",
          description:
            "Profesyonel pilates eğitimi ile vücut şekillendirme. Uzman eğitmenler eşliğinde kişiselleştirilmiş antrenman programı.",
          price: 1200,
          sessionCount: 10,
          durationMinutes: 60,
          serviceProvider: {
            businessName: "Wellness Studio",
            locationCity: "İstanbul",
            locationDistrict: "Kadıköy",
            rating: 4.8,
          },
          category: {
            name: "Spor ve Fitness",
          },
          addedDate: "2024-01-10",
        },
        {
          id: "3",
          title: "8 Seans Masaj Terapisi",
          description: "Rahatlatıcı İsveç masajı ile kas gerginliklerini giderin. Profesyonel terapi uzmanı eşliğinde.",
          price: 2400,
          sessionCount: 8,
          durationMinutes: 90,
          serviceProvider: {
            businessName: "Wellness Spa Center",
            locationCity: "İstanbul",
            locationDistrict: "Beşiktaş",
            rating: 4.9,
          },
          category: {
            name: "Sağlık ve Wellness",
          },
          addedDate: "2024-01-08",
        },
        {
          id: "4",
          title: "12 Ders İngilizce Paketi",
          description:
            "Birebir İngilizce dersleri ile konuşma becerinizi geliştirin. Online veya yüz yüze seçenekleri mevcut.",
          price: 800,
          sessionCount: 12,
          durationMinutes: 50,
          serviceProvider: {
            businessName: "English Academy",
            locationCity: "Online",
            locationDistrict: "Online",
            rating: 4.7,
          },
          category: {
            name: "Eğitim",
          },
          addedDate: "2024-01-05",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const removeFavorite = (packageId: string) => {
    setFavorites(favorites.filter((fav) => fav.id !== packageId))
    // API call to remove from favorites
    console.log("Removing from favorites:", packageId)
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Favorilerim</h1>
        <p className="text-gray-600">Beğendiğiniz paketleri buradan takip edin</p>
      </div>

      {favorites.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz favori paketiniz yok</h3>
            <p className="text-gray-500 text-center mb-4">
              Beğendiğiniz paketleri favorilere ekleyerek daha sonra kolayca ulaşabilirsiniz.
            </p>
            <Link href="/packages">
              <Button>Paketleri Keşfet</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {favorites.map((favorite) => (
            <Card key={favorite.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-lg">{favorite.title}</CardTitle>
                      <Badge variant="secondary">{favorite.category.name}</Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {favorite.serviceProvider.locationCity}, {favorite.serviceProvider.locationDistrict}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {favorite.sessionCount} seans × {favorite.durationMinutes} dk
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                        {favorite.serviceProvider.rating}
                      </div>
                    </div>
                    <CardDescription className="text-sm">{favorite.serviceProvider.businessName}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">₺{favorite.price.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">
                        Favorilere eklendi: {new Date(favorite.addedDate).toLocaleDateString("tr-TR")}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFavorite(favorite.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{favorite.description}</p>
                <div className="flex space-x-2">
                  <Link href={`/packages/${favorite.id}`}>
                    <Button variant="outline">Detayları Görüntüle</Button>
                  </Link>
                  <Button>Satın Al</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
