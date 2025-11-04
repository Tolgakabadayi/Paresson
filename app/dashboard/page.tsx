"use client"

import { useEffect, useState } from "react"
import { SocialFeedCard } from "@/components/ui/social-feed-card"
import { StoryCarousel } from "@/components/ui/story-carousel"
import { PackageFilters } from "@/components/customer/package-filters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import type { Package, ServiceProvider, Category } from "@/lib/types"

interface PackageWithDetails extends Package {
  serviceProvider?: ServiceProvider
  category?: Category
  salesCount?: number
}

interface StoryItem {
  id: string
  title: string
  image: string
  provider: {
    name: string
    avatar?: string
  }
  category: string
  isNew?: boolean
  isFeatured?: boolean
}

export default function CustomerDashboard() {
  const [packages, setPackages] = useState<PackageWithDetails[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [stories, setStories] = useState<StoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    featured: false,
    minPrice: "",
    maxPrice: "",
  })

  const convertPackagesToStories = (packages: PackageWithDetails[]): StoryItem[] => {
    return packages.slice(0, 8).map((pkg) => ({
      id: pkg.id,
      title: pkg.title,
      image: `/placeholder.svg?height=80&width=80&query=${encodeURIComponent(pkg.title)}`,
      provider: {
        name: pkg.serviceProvider?.businessName || "Provider",
        avatar: `/placeholder.svg?height=40&width=40&query=${encodeURIComponent(pkg.serviceProvider?.businessName || "P")}`,
      },
      category: pkg.category?.name || "Kategori",
      isNew: Math.random() > 0.7,
      isFeatured: pkg.isFeatured,
    }))
  }

  const fetchPackages = async () => {
    try {
      const params = new URLSearchParams()
      if (filters.search) params.append("search", filters.search)
      if (filters.category !== "all") params.append("category", filters.category)
      if (filters.featured) params.append("featured", "true")
      if (filters.minPrice) params.append("minPrice", filters.minPrice)
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice)

      const response = await fetch(`/api/packages?${params}`)
      if (response.ok) {
        const data = await response.json()
        setPackages(data.packages)
        setCategories(data.categories)

        // Convert featured packages to stories
        const featuredPackages = data.packages.filter((pkg: PackageWithDetails) => pkg.isFeatured)
        setStories(convertPackagesToStories(featuredPackages))
      }
    } catch (error) {
      console.error("Packages fetch error:", error)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await fetchPackages()
      setLoading(false)
    }
    loadData()
  }, [])

  useEffect(() => {
    fetchPackages()
  }, [filters])

  const handleSearch = () => {
    setFilters((prev) => ({ ...prev, search: searchQuery }))
  }

  const handleLike = (packageId: string) => {
    console.log("Liked package:", packageId)
  }

  const handleBookmark = (packageId: string) => {
    console.log("Bookmarked package:", packageId)
  }

  const handleComment = (packageId: string) => {
    console.log("Comment on package:", packageId)
  }

  const handleShare = (packageId: string) => {
    console.log("Share package:", packageId)
  }

  const handleBook = (packageId: string) => {
    console.log("Book package:", packageId)
  }

  const handleStoryClick = (story: StoryItem) => {
    console.log("Story clicked:", story)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 bg-card border-b border-border backdrop-blur-sm bg-card/80">
        <div className="px-4 py-3 space-y-3">
          {/* Search bar */}
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Paket, hizmet veya konum ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10 bg-muted/50 border-0 focus:bg-background"
              />
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)} className="h-10 w-10 p-0">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="border-t border-border pt-3">
              <PackageFilters
                categories={categories}
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={() =>
                  setFilters({
                    search: "",
                    category: "all",
                    featured: false,
                    minPrice: "",
                    maxPrice: "",
                  })
                }
              />
            </div>
          )}
        </div>
      </div>

      <div className="pb-6">
        {stories.length > 0 && (
          <div className="px-4 py-6 bg-card border-b border-border">
            <StoryCarousel stories={stories} onStoryClick={handleStoryClick} />
          </div>
        )}

        <div className="px-4 py-6 space-y-6">
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <SocialFeedCard
                key={pkg.id}
                id={pkg.id}
                title={pkg.title}
                description={pkg.description}
                price={pkg.price}
                sessionCount={pkg.sessionCount}
                durationMinutes={pkg.durationMinutes}
                serviceProvider={{
                  businessName: pkg.serviceProvider?.businessName || "Provider",
                  locationCity: pkg.serviceProvider?.locationCity || "Şehir",
                  locationDistrict: pkg.serviceProvider?.locationDistrict || "İlçe",
                  rating: pkg.serviceProvider?.rating || 4.5,
                  avatar: `/placeholder.svg?height=40&width=40&query=${encodeURIComponent(pkg.serviceProvider?.businessName || "P")}`,
                }}
                category={{
                  name: pkg.category?.name || "Kategori",
                }}
                image={`/placeholder.svg?height=300&width=400&query=${encodeURIComponent(pkg.title)}`}
                likesCount={Math.floor(Math.random() * 50) + 10}
                commentsCount={Math.floor(Math.random() * 20) + 2}
                onLike={() => handleLike(pkg.id)}
                onBookmark={() => handleBookmark(pkg.id)}
                onComment={() => handleComment(pkg.id)}
                onShare={() => handleShare(pkg.id)}
                onBook={() => handleBook(pkg.id)}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">Arama kriterlerinize uygun paket bulunamadı</div>
              <Button
                onClick={() =>
                  setFilters({
                    search: "",
                    category: "all",
                    featured: false,
                    minPrice: "",
                    maxPrice: "",
                  })
                }
                variant="outline"
              >
                Filtreleri Temizle
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
