"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { Search, ShoppingBag, Calendar, MessageSquare, User, Settings, LogOut, Heart } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Keşfet", href: "/dashboard", icon: Search },
  { name: "Paketlerim", href: "/dashboard/packages", icon: ShoppingBag },
  { name: "Randevularım", href: "/dashboard/appointments", icon: Calendar },
  { name: "Favoriler", href: "/dashboard/favorites", icon: Heart },
  { name: "Mesajlar", href: "/dashboard/messages", icon: MessageSquare },
  { name: "Profil", href: "/dashboard/profile", icon: User },
  { name: "Ayarlar", href: "/dashboard/settings", icon: Settings },
]

export function CustomerSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Pares</span>
        </div>
      </div>

      {/* User Info */}
      <div className="px-6 py-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-500">Müşteri</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t">
        <Button variant="ghost" className="w-full justify-start text-gray-600" onClick={handleLogout}>
          <LogOut className="mr-3 h-5 w-5" />
          Çıkış Yap
        </Button>
      </div>
    </div>
  )
}
