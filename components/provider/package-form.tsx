"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import type { Category } from "@/lib/types"

interface PackageFormProps {
  categories: Category[]
  onSuccess?: () => void
  onCancel?: () => void
}

export function PackageForm({ categories, onSuccess, onCancel }: PackageFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    price: "",
    sessionCount: "",
    durationMinutes: "",
    validityDays: "90",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/provider/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number.parseFloat(formData.price),
          sessionCount: Number.parseInt(formData.sessionCount),
          durationMinutes: formData.durationMinutes ? Number.parseInt(formData.durationMinutes) : undefined,
          validityDays: Number.parseInt(formData.validityDays),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Paket oluşturulamadı")
      }

      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Paket oluşturulurken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Yeni Paket Oluştur</CardTitle>
        <CardDescription>Müşterileriniz için yeni bir hizmet paketi oluşturun</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Paket Adı</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => updateFormData("title", e.target.value)}
              placeholder="Örn: 10 Seans Pilates Paketi"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Açıklama</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateFormData("description", e.target.value)}
              placeholder="Paket hakkında detaylı bilgi verin"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Kategori</Label>
              <Select value={formData.categoryId} onValueChange={(value) => updateFormData("categoryId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Kategori seçin" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Fiyat (₺)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => updateFormData("price", e.target.value)}
                placeholder="1200"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sessionCount">Seans Sayısı</Label>
              <Input
                id="sessionCount"
                type="number"
                value={formData.sessionCount}
                onChange={(e) => updateFormData("sessionCount", e.target.value)}
                placeholder="10"
                min="1"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="durationMinutes">Süre (Dakika)</Label>
              <Input
                id="durationMinutes"
                type="number"
                value={formData.durationMinutes}
                onChange={(e) => updateFormData("durationMinutes", e.target.value)}
                placeholder="60"
                min="15"
                step="15"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="validityDays">Geçerlilik (Gün)</Label>
              <Input
                id="validityDays"
                type="number"
                value={formData.validityDays}
                onChange={(e) => updateFormData("validityDays", e.target.value)}
                placeholder="90"
                min="30"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Paketi Oluştur
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                İptal
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
