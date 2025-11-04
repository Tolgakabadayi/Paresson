"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

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

interface StoryCarouselProps {
  stories: StoryItem[]
  onStoryClick?: (story: StoryItem) => void
  className?: string
}

export function StoryCarousel({ stories, onStoryClick, className }: StoryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const scrollLeft = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1))
  }

  const scrollRight = () => {
    setCurrentIndex(Math.min(stories.length - 4, currentIndex + 1))
  }

  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Öne Çıkan Paketler</h2>
        <div className="flex space-x-1">
          <Button variant="ghost" size="sm" onClick={scrollLeft} disabled={currentIndex === 0} className="h-8 w-8 p-0">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollRight}
            disabled={currentIndex >= stories.length - 4}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex space-x-4 transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 25}%)` }}
        >
          {/* Add new story button */}
          <div className="flex-shrink-0 w-20">
            <Button
              variant="outline"
              className="h-20 w-20 rounded-full border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 flex flex-col items-center justify-center bg-transparent"
            >
              <Plus className="h-6 w-6 text-muted-foreground" />
            </Button>
            <p className="text-xs text-center mt-2 text-muted-foreground">Yeni</p>
          </div>

          {stories.map((story) => (
            <div key={story.id} className="flex-shrink-0 w-20">
              <div className="relative cursor-pointer" onClick={() => onStoryClick?.(story)}>
                <div
                  className={cn(
                    "h-20 w-20 rounded-full p-0.5",
                    story.isFeatured ? "bg-gradient-to-tr from-primary via-secondary to-accent" : "bg-border",
                  )}
                >
                  <div className="h-full w-full rounded-full bg-background p-0.5">
                    <img
                      src={story.image || "/placeholder.svg"}
                      alt={story.title}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                </div>

                {story.isNew && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                  >
                    !
                  </Badge>
                )}

                <div className="absolute -bottom-1 -right-1">
                  <Avatar className="h-6 w-6 border-2 border-background">
                    <AvatarImage src={story.provider.avatar || "/placeholder.svg"} alt={story.provider.name} />
                    <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                      {story.provider.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <p className="text-xs text-center mt-2 text-foreground line-clamp-2 leading-tight">{story.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
