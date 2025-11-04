"use client"

import type React from "react"
import { MobileNav } from "@/components/ui/mobile-nav"
import { AdminSidebar } from "@/components/admin/sidebar"
import { useAuth } from "@/hooks/use-auth"
import { redirect } from "next/navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-foreground">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!user || user.userType !== "admin") {
    redirect("/auth?message=Admin%20paneline%20erişim%20için%20admin%20hesabı%20gereklidir")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-card border-b border-border lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <MobileNav>
            <AdminSidebar />
          </MobileNav>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-destructive to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">A</span>
            </div>
            <span className="text-lg font-bold text-foreground">Pares Admin</span>
          </div>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="flex">
        <div className="hidden lg:block">
          <AdminSidebar />
        </div>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
