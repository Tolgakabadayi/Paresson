"use client"

import { MessageCenter } from "@/components/messages/message-center"

export default function ProviderMessagesPage() {
  // In a real app, get this from auth context
  const providerId = "1"

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mesajlar</h1>
        <p className="text-gray-600">Müşterilerinizle mesajlaşın</p>
      </div>

      <MessageCenter userId={providerId} userType="service_provider" />
    </div>
  )
}
