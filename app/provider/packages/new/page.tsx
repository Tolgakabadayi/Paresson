"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PackageForm } from "@/components/provider/package-form"
import type { Category } from "@/lib/types"

export default function NewPackagePage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories")
        if (response.ok) {
          const data = await response.json()
          setCategories(data.categories)
        }
      } catch (error) {
        console.error("Categories fetch error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleSuccess = () => {
    router.push("/provider/packages")
  }

  const handleCancel = () => {
    router.back()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Yeni Paket Oluştur</h1>
          <p className="text-gray-600">Müşterileriniz için yeni bir hizmet paketi oluşturun</p>
        </div>
        <PackageForm categories={categories} onSuccess={handleSuccess} onCancel={handleCancel} />
      </div>
    </div>
  )
}
