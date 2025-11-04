import type React from "react"
import { MobileNav } from "@/components/ui/mobile-nav"
import { CustomerSidebar } from "@/components/customer/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-card border-b border-border lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <MobileNav>
            <CustomerSidebar />
          </MobileNav>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">P</span>
            </div>
            <span className="text-lg font-bold text-foreground">Pares</span>
          </div>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="flex">
        <div className="hidden lg:block">
          <CustomerSidebar />
        </div>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
