import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { mockPackages } from "@/lib/mock-data"

export default function PackagesPage() {
  const activePackages = mockPackages.filter((pkg) => pkg.isActive)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Pares</span>
            </Link>
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

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Tüm Paketler</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Paket ara..." className="pl-10" />
            </div>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              Filtrele
            </Button>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activePackages.map((pkg) => (
            <Card key={pkg.id} className="hover:shadow-xl transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  {pkg.promotion && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      {pkg.promotion}
                    </Badge>
                  )}
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    {pkg.rating}
                  </div>
                </div>
                <CardTitle className="text-lg text-balance">{pkg.title}</CardTitle>
                <CardDescription className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {pkg.providerName} • {pkg.location}
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
                    {pkg.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">₺{pkg.originalPrice}</div>
                    )}
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href={`/packages/${pkg.id}`}>Paketi İncele</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
