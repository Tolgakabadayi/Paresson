"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, TrendingUp, DollarSign } from "lucide-react"

interface Transaction {
  id: string
  type: "purchase" | "commission"
  amount: number
  customerName: string
  providerName: string
  packageTitle: string
  date: string
  status: "completed" | "pending" | "failed"
  commissionRate: number
  commissionAmount: number
}

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - replace with actual API call
    setTimeout(() => {
      setTransactions([
        {
          id: "1",
          type: "purchase",
          amount: 750,
          customerName: "Zeynep Demir",
          providerName: "Ayşe Yılmaz",
          packageTitle: "5 Seans Pilates Paketi",
          date: "2024-01-15",
          status: "completed",
          commissionRate: 15,
          commissionAmount: 112.5,
        },
        {
          id: "2",
          type: "purchase",
          amount: 1200,
          customerName: "Can Özkan",
          providerName: "Mehmet Kaya",
          packageTitle: "10 Masaj Seansı",
          date: "2024-01-14",
          status: "completed",
          commissionRate: 15,
          commissionAmount: 180,
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Tamamlandı"
      case "pending":
        return "Beklemede"
      case "failed":
        return "Başarısız"
      default:
        return status
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0)
  const totalCommission = transactions.reduce((sum, t) => sum + t.commissionAmount, 0)

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">İşlemler</h1>
        <p className="text-gray-600">Platform üzerindeki tüm finansal işlemleri görüntüleyin</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Ciro</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺{totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Komisyon</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺{totalCommission.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">İşlem Sayısı</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactions.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <Card key={transaction.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <div>
                    <CardTitle className="text-lg">{transaction.packageTitle}</CardTitle>
                    <CardDescription>
                      {transaction.customerName} → {transaction.providerName}
                    </CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(transaction.status)}>{getStatusText(transaction.status)}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Tutar:</span> ₺{transaction.amount}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Komisyon:</span> ₺{transaction.commissionAmount} (%
                    {transaction.commissionRate})
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Tarih:</span> {new Date(transaction.date).toLocaleDateString("tr-TR")}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
