"use client"

import { useEffect, useState } from "react"
import { UserManagement } from "@/components/admin/user-management"

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

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/users")
        if (response.ok) {
          const data = await response.json()
          setUsers(data.users)
        }
      } catch (error) {
        console.error("Users fetch error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleUserUpdate = async (userId: string, action: string) => {
    try {
      const response = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action }),
      })

      if (response.ok) {
        const data = await response.json()
        setUsers((prev) => prev.map((user) => (user.id === userId ? data.user : user)))
      }
    } catch (error) {
      console.error("User update error:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Kullanıcı Yönetimi</h1>
        <p className="text-gray-600">Platform kullanıcılarını yönetin</p>
      </div>

      <UserManagement users={users} onUserUpdate={handleUserUpdate} />
    </div>
  )
}
