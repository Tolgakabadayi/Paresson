"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MessageSquare, Send, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  conversationId: string
  senderId: string
  receiverId: string
  senderType: "customer" | "service_provider"
  receiverType: "customer" | "service_provider"
  content: string
  timestamp: string
  isRead: boolean
}

interface Conversation {
  id: string
  customerId: string
  serviceProviderId: string
  customerName: string
  serviceProviderName: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isActive: boolean
}

interface MessageCenterProps {
  userId: string
  userType: "customer" | "service_provider"
}

export function MessageCenter({ userId, userType }: MessageCenterProps) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchConversations()
  }, [userId])

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation)
    }
  }, [selectedConversation])

  const fetchConversations = async () => {
    try {
      const response = await fetch(`/api/messages?userId=${userId}`)
      const result = await response.json()

      if (result.success) {
        setConversations(result.data)
        if (result.data.length > 0 && !selectedConversation) {
          setSelectedConversation(result.data[0].id)
        }
      }
    } catch (error) {
      console.error("Failed to fetch conversations:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async (conversationId: string) => {
    try {
      const response = await fetch(`/api/messages?conversationId=${conversationId}`)
      const result = await response.json()

      if (result.success) {
        setMessages(result.data)
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return

    const conversation = conversations.find((c) => c.id === selectedConversation)
    if (!conversation) return

    const receiverId = userType === "customer" ? conversation.serviceProviderId : conversation.customerId
    const receiverType = userType === "customer" ? "service_provider" : "customer"

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: selectedConversation,
          senderId: userId,
          receiverId,
          senderType: userType,
          receiverType,
          content: newMessage,
        }),
      })

      const result = await response.json()
      if (result.success) {
        setNewMessage("")
        fetchMessages(selectedConversation)
        fetchConversations()
      }
    } catch (error) {
      console.error("Failed to send message:", error)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
      {/* Conversations List */}
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Mesajlar
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            {conversations.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Henüz mesaj bulunmuyor</p>
              </div>
            ) : (
              conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                    selectedConversation === conversation.id ? "bg-orange-50 border-l-4 border-l-orange-500" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <h4 className="font-medium text-sm">
                          {userType === "customer" ? conversation.serviceProviderName : conversation.customerName}
                        </h4>
                        {conversation.unreadCount > 0 && (
                          <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1 truncate">{conversation.lastMessage}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(conversation.lastMessageTime).toLocaleString("tr-TR")}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Messages */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>
            {selectedConversation && conversations.find((c) => c.id === selectedConversation)
              ? userType === "customer"
                ? conversations.find((c) => c.id === selectedConversation)?.serviceProviderName
                : conversations.find((c) => c.id === selectedConversation)?.customerName
              : "Mesaj Seçin"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {selectedConversation ? (
            <div className="flex flex-col h-[500px]">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === userId ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.senderId === userId ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.senderId === userId ? "text-orange-100" : "text-gray-500"
                          }`}
                        >
                          {new Date(message.timestamp).toLocaleString("tr-TR")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Mesajınızı yazın..."
                    className="flex-1"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[500px] text-gray-500">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Mesajlaşmaya başlamak için bir konuşma seçin</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
