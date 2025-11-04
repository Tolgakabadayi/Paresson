"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, X, SlidersHorizontal } from "lucide-react"
import type { Category } from "@/lib/types"

interface PackageFiltersProps {
  categories: Category[]
  filters: {
    search: string
    category: string
    featured: boolean
    minPrice: string
    maxPrice: string
  }
  onFiltersChange: (filters: any) => void
  onClearFilters: () => void
}

export function PackageFilters({ categories, filters, onFiltersChange, onClearFilters }: PackageFiltersProps) {
  const hasActiveFilters =
    filters.search || filters.category !== "all" || filters.featured || filters.minPrice || filters.maxPrice

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Paket, hizmet sağlayıcı ara..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="pl-10"
        />
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap gap-3">
        <Select value={filters.category} onValueChange={(value) => onFiltersChange({ ...filters, category: value })}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Kategoriler</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Min fiyat"
          value={filters.minPrice}
          onChange={(e) => onFiltersChange({ ...filters, minPrice: e.target.value })}
          className="w-32"
        />

        <Input
          type="number"
          placeholder="Max fiyat"
          value={filters.maxPrice}
          onChange={(e) => onFiltersChange({ ...filters, maxPrice: e.target.value })}
          className="w-32"
        />

        <Button
          variant={filters.featured ? "default" : "outline"}
          onClick={() => onFiltersChange({ ...filters, featured: !filters.featured })}
          className="bg-transparent"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Öne Çıkanlar
        </Button>

        {hasActiveFilters && (
          <Button variant="ghost" onClick={onClearFilters}>
            <X className="mr-2 h-4 w-4" />
            Temizle
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <Badge variant="secondary">
              Arama: {filters.search}
              <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => onFiltersChange({ ...filters, search: "" })} />
            </Badge>
          )}
          {filters.category !== "all" && (
            <Badge variant="secondary">
              {categories.find((c) => c.id === filters.category)?.name}
              <X
                className="ml-1 h-3 w-3 cursor-pointer"
                onClick={() => onFiltersChange({ ...filters, category: "all" })}
              />
            </Badge>
          )}
          {filters.featured && (
            <Badge variant="secondary">
              Öne Çıkanlar
              <X
                className="ml-1 h-3 w-3 cursor-pointer"
                onClick={() => onFiltersChange({ ...filters, featured: false })}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
