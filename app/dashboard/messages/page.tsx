"use client"

import { MessageCenter } from "@/components/messages/message-center"

export default function CustomerMessagesPage() {
  // In a real app, get this from auth context
  const customerId = "3"

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mesajlar</h1>
        <p className="text-gray-600">Hizmet sağlayıcılarla mesajlaşın</p>
      </div>

      <MessageCenter userId={customerId} userType="customer" />
    </div>
  )
}
