"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, UserCheck, UserX, Shield, ShieldOff } from "lucide-react"

interface User {
  id: string
  email: string
  userType: "customer" | "service_provider" | "admin"
  firstName: string
  lastName: string
  isActive: boolean
  emailVerified: boolean
  createdAt: string
  serviceProvider?: {
    businessName: string
    isVerified: boolean
    rating: number
    totalSales: number
    commission: number
  }
  totalSpent?: number
  packageCount?: number
}

interface UserManagementProps {
  users: User[]
  onUserUpdate: (userId: string, action: string) => void
}

export function UserManagement({ users, onUserUpdate }: UserManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [userTypeFilter, setUserTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = userTypeFilter === "all" || user.userType === userTypeFilter
    const matchesStatus = statusFilter === "all" || (statusFilter === "active" ? user.isActive : !user.isActive)

    return matchesSearch && matchesType && matchesStatus
  })

  const getUserTypeLabel = (type: string) => {
    switch (type) {
      case "customer":
        return "Müşteri"
      case "service_provider":
        return "Hizmet Sağlayıcı"
      case "admin":
        return "Yönetici"
      default:
        return type
    }
  }

  const getUserTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "admin":
        return "destructive"
      case "service_provider":
        return "default"
      default:
        return "secondary"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kullanıcı Yönetimi</CardTitle>
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Kullanıcı ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Kullanıcılar</SelectItem>
              <SelectItem value="customer">Müşteriler</SelectItem>
              <SelectItem value="service_provider">Hizmet Sağlayıcılar</SelectItem>
              <SelectItem value="admin">Yöneticiler</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tümü</SelectItem>
              <SelectItem value="active">Aktif</SelectItem>
              <SelectItem value="inactive">Pasif</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-medium">
                    {user.firstName} {user.lastName}
                  </h4>
                  <Badge variant={getUserTypeBadgeVariant(user.userType)}>{getUserTypeLabel(user.userType)}</Badge>
                  <Badge variant={user.isActive ? "default" : "secondary"}>{user.isActive ? "Aktif" : "Pasif"}</Badge>
                  {user.serviceProvider?.isVerified && (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Doğrulanmış
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-1">{user.email}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>Kayıt: {new Date(user.createdAt).toLocaleDateString("tr-TR")}</span>
                  {user.serviceProvider && (
                    <>
                      <span>İşletme: {user.serviceProvider.businessName}</span>
                      <span>Satış: ₺{user.serviceProvider.totalSales.toLocaleString()}</span>
                      <span>Komisyon: ₺{user.serviceProvider.commission.toLocaleString()}</span>
                    </>
                  )}
                  {user.totalSpent && (
                    <>
                      <span>Harcama: ₺{user.totalSpent.toLocaleString()}</span>
                      <span>Paket: {user.packageCount}</span>
                    </>
                  )}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {user.isActive ? (
                    <DropdownMenuItem onClick={() => onUserUpdate(user.id, "deactivate")}>
                      <UserX className="mr-2 h-4 w-4" />
                      Devre Dışı Bırak
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem onClick={() => onUserUpdate(user.id, "activate")}>
                      <UserCheck className="mr-2 h-4 w-4" />
                      Aktif Et
                    </DropdownMenuItem>
                  )}
                  {user.userType === "service_provider" && (
                    <>
                      {user.serviceProvider?.isVerified ? (
                        <DropdownMenuItem onClick={() => onUserUpdate(user.id, "unverify")}>
                          <ShieldOff className="mr-2 h-4 w-4" />
                          Doğrulamayı Kaldır
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => onUserUpdate(user.id, "verify")}>
                          <Shield className="mr-2 h-4 w-4" />
                          Doğrula
                        </DropdownMenuItem>
                      )}
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
