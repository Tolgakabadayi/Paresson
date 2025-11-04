"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Clock, Zap, Shield, Heart, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useState, useMemo } from "react"
import { mockCustomerPackages, mockTrendingPackages, mockCities } from "@/lib/mock-data"

export default function HomePage() {
  const [selectedCity, setSelectedCity] = useState("Tümü")

  const filteredPackages = useMemo(() => {
    const packages = mockCustomerPackages.filter((pkg) => pkg.isActive)
    if (selectedCity === "Tümü") return packages.slice(0, 6)
    return packages.filter((pkg) => pkg.serviceProvider?.locationCity === selectedCity).slice(0, 6)
  }, [selectedCity])

  const trendingPackages = mockTrendingPackages.slice(0, 6)

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-rose-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Pares</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#packages" className="text-gray-600 hover:text-gray-900">
                Keşfet
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">
                Nasıl Çalışır
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Hizmet Ver
              </a>
            </nav>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" asChild>
                <Link href="/auth">Giriş Yap</Link>
              </Button>
              <Button asChild>
                <Link href="/auth">Üye Ol</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
            Paket Halinde{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600">Randevu Al</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 text-pretty max-w-2xl mx-auto">
            Pilates, masaj, eğitim ve daha fazlası için uzmanlardan paket halinde hizmet alın. Daha uygun fiyatlarla,
            daha fazla seans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="#packages">Paketleri Keşfet</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent" asChild>
              <Link href="/auth">Hizmet Sağlayıcısı Ol</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="how-it-works" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Neden Pares?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Paket sistemi ile hem tasarruf edin hem de uzun vadeli hizmet alın
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>Uygun Fiyatlar</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Paket halinde alarak tek seans fiyatına göre %20-40 tasarruf edin</CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-rose-600" />
                </div>
                <CardTitle>Güvenli Ödeme</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>256-bit SSL şifreleme ile güvenli ödeme sistemi</CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>Kaliteli Hizmet</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Doğrulanmış uzmanlardan kaliteli hizmet garantisi</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popüler Kategoriler</h2>
            <p className="text-gray-600">Hangi alanda hizmet almak istiyorsunuz?</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Pilates", icon: "🧘‍♀️", count: "120+ paket" },
              { name: "Masaj", icon: "💆‍♀️", count: "85+ paket" },
              { name: "Eğitim", icon: "📚", count: "200+ paket" },
              { name: "Güzellik", icon: "💄", count: "95+ paket" },
              { name: "Turizm", icon: "🗺️", count: "45+ paket" },
              { name: "Etkinlik", icon: "🎉", count: "60+ paket" },
            ].map((category) => (
              <Card key={category.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Packages */}
      <section id="packages" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Paketleri Keşfet</h2>
            <p className="text-gray-600">Size en uygun paketleri bulun</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <Tabs defaultValue="active" className="w-full sm:w-auto">
              <TabsList className="grid w-full grid-cols-2 sm:w-auto">
                <TabsTrigger value="active">Aktif Paketler</TabsTrigger>
                <TabsTrigger value="trending" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Trend Paketler
                </TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <TabsContent value="active" className="mt-0">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Aktif Paketler</h3>
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Şehir seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPackages.map((pkg) => (
                      <Card key={pkg.id} className="hover:shadow-xl transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start mb-2">
                            {pkg.isFeatured && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                Öne Çıkan
                              </Badge>
                            )}
                            <div className="flex items-center text-sm text-gray-600">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                              {pkg.serviceProvider?.rating || 4.5}
                            </div>
                          </div>
                          <CardTitle className="text-lg text-balance">{pkg.title}</CardTitle>
                          <CardDescription className="flex items-center text-sm">
                            <MapPin className="w-4 h-4 mr-1" />
                            {pkg.serviceProvider?.businessName} • {pkg.serviceProvider?.locationCity}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="w-4 h-4 mr-1" />
                              {pkg.sessionCount} seans
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900">₺{pkg.price}</div>
                              <div className="text-sm text-gray-500">
                                ₺{Math.round(pkg.price / pkg.sessionCount)} / seans
                              </div>
                            </div>
                          </div>
                          <Button className="w-full" asChild>
                            <Link href={`/packages/${pkg.id}`}>Paketi İncele</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="trending" className="mt-0">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-orange-500" />
                      En Çok Satılan Paketler
                    </h3>
                    <p className="text-gray-600 mt-1">Diğer kullanıcıların en çok tercih ettiği paketler</p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trendingPackages.map((pkg, index) => (
                      <Card key={pkg.id} className="hover:shadow-xl transition-shadow relative">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                                #{index + 1} Trend
                              </Badge>
                              {pkg.isFeatured && (
                                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                  Öne Çıkan
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                              {pkg.serviceProvider?.rating || 4.5}
                            </div>
                          </div>
                          <CardTitle className="text-lg text-balance">{pkg.title}</CardTitle>
                          <CardDescription className="flex items-center text-sm">
                            <MapPin className="w-4 h-4 mr-1" />
                            {pkg.serviceProvider?.businessName} • {pkg.serviceProvider?.locationCity}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="w-4 h-4 mr-1" />
                              {pkg.sessionCount} seans
                            </div>
                            <div className="text-sm text-orange-600 font-medium">{pkg.salesCount} satış</div>
                          </div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900">₺{pkg.price}</div>
                              <div className="text-sm text-gray-500">
                                ₺{Math.round(pkg.price / pkg.sessionCount)} / seans
                              </div>
                            </div>
                          </div>
                          <Button className="w-full" asChild>
                            <Link href={`/packages/${pkg.id}`}>Paketi İncele</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link href="/packages">Tüm Paketleri Görüntüle</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-600 to-rose-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Hizmet Sağlayıcısı mısınız?</h2>
          <p className="text-xl mb-8 text-red-100 max-w-2xl mx-auto">
            Paketlerinizi oluşturun, müşterilerinize ulaşın ve gelirinizi artırın
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
            <Link href="/auth">Hemen Başlayın</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-rose-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <span className="text-xl font-bold">Pares</span>
              </div>
              <p className="text-gray-400">Paket halinde randevu almanın en kolay yolu</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Nasıl Çalışır
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Güvenlik
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Yardım
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Hizmet Sağlayıcılar</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Kayıt Ol
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Komisyon Oranları
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Destek
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">İletişim</h3>
              <ul className="space-y-2 text-gray-400">
                <li>destek@paresapp.online</li>
                <li>+90 (212) 123 45 67</li>
                <li>İstanbul, Türkiye</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Pares. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
