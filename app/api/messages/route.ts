import { type NextRequest, NextResponse } from "next/server"
import { mockMessages, mockConversations } from "@/lib/mock-data"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const conversationId = searchParams.get("conversationId")
  const userId = searchParams.get("userId")

  try {
    if (conversationId) {
      // Get messages for a specific conversation
      const messages = mockMessages.filter((msg) => msg.conversationId === conversationId)
      return NextResponse.json({
        success: true,
        data: messages,
      })
    }

    if (userId) {
      // Get conversations for a user
      const conversations = mockConversations.filter(
        (conv) => conv.customerId === userId || conv.serviceProviderId === userId,
      )
      return NextResponse.json({
        success: true,
        data: conversations,
      })
    }

    return NextResponse.json({
      success: true,
      data: mockConversations,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch messages" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { conversationId, senderId, receiverId, senderType, receiverType, content } = body

    // Validate required fields
    if (!senderId || !receiverId || !content) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Create new message
    const newMessage = {
      id: `msg_${Date.now()}`,
      conversationId: conversationId || `conv_${Date.now()}`,
      senderId,
      receiverId,
      senderType,
      receiverType,
      content,
      timestamp: new Date().toISOString(),
      isRead: false,
    }

    return NextResponse.json({
      success: true,
      data: newMessage,
      message: "Mesaj başarıyla gönderildi",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 })
  }
}
