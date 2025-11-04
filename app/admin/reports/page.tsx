"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { FileText, Download, Filter, CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { cn } from "@/lib/utils"

export default function AdminReportsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [reportType, setReportType] = useState<string>("")
  const [category, setCategory] = useState<string>("")

  const reportTypes = [
    { value: "sales", label: "Satış Raporu" },
    { value: "commission", label: "Komisyon Raporu" },
    { value: "users", label: "Kullanıcı Raporu" },
    { value: "packages", label: "Paket Raporu" },
    { value: "providers", label: "Hizmet Sağlayıcı Raporu" },
  ]

  const categories = [
    { value: "all", label: "Tüm Kategoriler" },
    { value: "sports", label: "Spor ve Fitness" },
    { value: "health", label: "Sağlık ve Wellness" },
    { value: "education", label: "Eğitim" },
  ]

  const handleGenerateReport = () => {
    console.log("Generating report:", { reportType, category, dateRange })
    // API call to generate report
  }

  const handleDownloadReport = (format: string) => {
    console.log("Downloading report in format:", format)
    // API call to download report
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Raporlar</h1>
        <p className="text-gray-600">Detaylı raporlar oluşturun ve indirin</p>
      </div>

      {/* Report Generation */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Rapor Oluştur
          </CardTitle>
          <CardDescription>Filtreleri seçerek özelleştirilmiş raporlar oluşturun</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Rapor Türü</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Rapor türü seçin" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Kategori</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Kategori seçin" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Tarih Aralığı</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !dateRange && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "dd MMM yyyy", { locale: tr })} -{" "}
                          {format(dateRange.to, "dd MMM yyyy", { locale: tr })}
                        </>
                      ) : (
                        format(dateRange.from, "dd MMM yyyy", { locale: tr })
                      )
                    ) : (
                      <span>Tarih seçin</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="range" selected={dateRange} onSelect={setDateRange} numberOfMonths={2} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button onClick={handleGenerateReport} disabled={!reportType}>
              <Filter className="w-4 h-4 mr-2" />
              Rapor Oluştur
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Günlük Satış Raporu</CardTitle>
            <CardDescription>Bugünün satış özeti</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Toplam Satış:</span>
                <span className="font-medium">₺12,450</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">İşlem Sayısı:</span>
                <span className="font-medium">23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Komisyon:</span>
                <span className="font-medium">₺1,245</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-4 bg-transparent"
              onClick={() => handleDownloadReport("daily-sales")}
            >
              <Download className="w-4 h-4 mr-2" />
              İndir
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Haftalık Kullanıcı Raporu</CardTitle>
            <CardDescription>Son 7 günün kullanıcı aktivitesi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Yeni Kayıtlar:</span>
                <span className="font-medium">45</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Aktif Kullanıcı:</span>
                <span className="font-medium">1,234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Dönüşüm Oranı:</span>
                <span className="font-medium">%12.5</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-4 bg-transparent"
              onClick={() => handleDownloadReport("weekly-users")}
            >
              <Download className="w-4 h-4 mr-2" />
              İndir
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Aylık Komisyon Raporu</CardTitle>
            <CardDescription>Bu ayın komisyon özeti</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Toplam Komisyon:</span>
                <span className="font-medium">₺8,750</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Ortalama Oran:</span>
                <span className="font-medium">%12.3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Sağlayıcı Sayısı:</span>
                <span className="font-medium">89</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-4 bg-transparent"
              onClick={() => handleDownloadReport("monthly-commission")}
            >
              <Download className="w-4 h-4 mr-2" />
              İndir
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
