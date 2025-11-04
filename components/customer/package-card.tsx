"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, User } from "lucide-react"
import type { Package, ServiceProvider, Category } from "@/lib/types"
import Link from "next/link"

interface PackageCardProps {
  package: Package & {
    serviceProvider?: ServiceProvider
    category?: Category
  }
}

export function PackageCard({ package: pkg }: PackageCardProps) {
  return (
    <Card className="hover:shadow-xl transition-shadow h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          {pkg.isFeatured && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
              Öne Çıkan
            </Badge>
          )}
          <div className="flex items-center text-sm text-gray-600">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
            {pkg.serviceProvider?.rating || 0}
          </div>
        </div>
        <CardTitle className="text-lg text-balance">{pkg.title}</CardTitle>
        <CardDescription className="space-y-1">
          <div className="flex items-center text-sm">
            <User className="w-4 h-4 mr-1" />
            {pkg.serviceProvider?.businessName}
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {pkg.serviceProvider?.locationDistrict}, {pkg.serviceProvider?.locationCity}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1">
          {pkg.description && <p className="text-sm text-gray-600 mb-4 line-clamp-3">{pkg.description}</p>}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              {pkg.sessionCount} seans
              {pkg.durationMinutes && ` • ${pkg.durationMinutes} dk`}
            </div>
            <Badge variant="outline">{pkg.category?.name}</Badge>
          </div>
        </div>
        <div className="space-y-3">
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">₺{pkg.price.toLocaleString()}</div>
            <div className="text-sm text-gray-500">
              Seans başı ₺{Math.round(pkg.price / pkg.sessionCount).toLocaleString()}
            </div>
          </div>
          <Button className="w-full" asChild>
            <Link href={`/packages/${pkg.id}`}>Paketi İncele</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
