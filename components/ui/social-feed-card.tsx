"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, MapPin, Clock, Star, Bookmark } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface SocialFeedCardProps {
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
    avatar?: string
  }
  category: {
    name: string
  }
  image?: string
  isLiked?: boolean
  isBookmarked?: boolean
  likesCount?: number
  commentsCount?: number
  onLike?: () => void
  onBookmark?: () => void
  onComment?: () => void
  onShare?: () => void
  onBook?: () => void
}

export function SocialFeedCard({
  id,
  title,
  description,
  price,
  sessionCount,
  durationMinutes,
  serviceProvider,
  category,
  image,
  isLiked = false,
  isBookmarked = false,
  likesCount = 0,
  commentsCount = 0,
  onLike,
  onBookmark,
  onComment,
  onShare,
  onBook,
}: SocialFeedCardProps) {
  const [liked, setLiked] = useState(isLiked)
  const [bookmarked, setBookmarked] = useState(isBookmarked)

  const handleLike = () => {
    setLiked(!liked)
    onLike?.()
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
    onBookmark?.()
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-card border-border shadow-sm hover:shadow-md transition-shadow">
      {/* Header with provider info */}
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={serviceProvider.avatar || "/placeholder.svg"} alt={serviceProvider.businessName} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {serviceProvider.businessName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-sm text-foreground">{serviceProvider.businessName}</h3>
              <div className="flex items-center text-xs text-muted-foreground">
                <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" />
                {serviceProvider.rating}
              </div>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin className="w-3 h-3 mr-1" />
              {serviceProvider.locationCity}, {serviceProvider.locationDistrict}
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {category.name}
          </Badge>
        </div>
      </CardHeader>

      {/* Package image */}
      {image && (
        <div className="relative">
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />
          <div className="absolute top-2 right-2">
            <Button
              variant="ghost"
              size="sm"
              className={cn("h-8 w-8 p-0 rounded-full bg-background/80 backdrop-blur-sm", bookmarked && "text-primary")}
              onClick={handleBookmark}
            >
              <Bookmark className={cn("h-4 w-4", bookmarked && "fill-current")} />
            </Button>
          </div>
        </div>
      )}

      {/* Content */}
      <CardContent className="pt-3">
        <div className="space-y-3">
          <div>
            <CardTitle className="text-lg font-bold text-foreground line-clamp-2">{title}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground line-clamp-2 mt-1">{description}</CardDescription>
          </div>

          {/* Package details */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {sessionCount} seans × {durationMinutes}dk
              </div>
            </div>
            <div className="text-xl font-bold text-primary">₺{price.toLocaleString()}</div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 px-2 text-muted-foreground hover:text-foreground",
                  liked && "text-red-500 hover:text-red-600",
                )}
                onClick={handleLike}
              >
                <Heart className={cn("h-4 w-4 mr-1", liked && "fill-current")} />
                <span className="text-xs">{likesCount + (liked ? 1 : 0)}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-muted-foreground hover:text-foreground"
                onClick={onComment}
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                <span className="text-xs">{commentsCount}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-muted-foreground hover:text-foreground"
                onClick={onShare}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={onBook}>
              Rezervasyon Yap
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
