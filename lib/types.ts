// Type definitions for Pares Platform

export type UserType = "customer" | "service_provider" | "admin"

export interface User {
  id: string
  email: string
  userType: UserType
  firstName: string
  lastName: string
  phone?: string
  avatarUrl?: string
  isActive: boolean
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  isActive: boolean
  createdAt: string
}

export interface ServiceProvider {
  id: string
  userId: string
  businessName?: string
  description?: string
  specialization?: string
  locationCity?: string
  locationDistrict?: string
  locationAddress?: string
  latitude?: number
  longitude?: number
  rating: number
  totalReviews: number
  isVerified: boolean
  isFeatured: boolean
  commissionRate: number
  createdAt: string
  updatedAt: string
  user?: User
  categories?: Category[]
}

export interface Package {
  id: string
  serviceProviderId: string
  categoryId?: string
  title: string
  description?: string
  price: number
  sessionCount: number
  durationMinutes?: number
  validityDays: number
  isActive: boolean
  isFeatured: boolean
  createdAt: string
  updatedAt: string
  serviceProvider?: ServiceProvider
  category?: Category
  promotions?: Promotion[]
}

export interface Promotion {
  id: string
  packageId: string
  title: string
  description?: string
  promotionType: "buy_x_get_y" | "percentage_discount" | "fixed_discount"
  buyQuantity?: number
  getQuantity?: number
  discountPercentage?: number
  discountAmount?: number
  startDate?: string
  endDate?: string
  isActive: boolean
  createdAt: string
}

export interface PackagePurchase {
  id: string
  customerId: string
  packageId: string
  serviceProviderId: string
  promotionId?: string
  originalPrice: number
  finalPrice: number
  commissionAmount: number
  sessionsTotal: number
  sessionsUsed: number
  sessionsRemaining: number
  purchaseDate: string
  expiryDate?: string
  status: "active" | "expired" | "completed" | "cancelled"
  paymentStatus: "pending" | "completed" | "failed" | "refunded"
  paymentMethod?: string
  transactionId?: string
  createdAt: string
  updatedAt: string
  customer?: User
  package?: Package
  serviceProvider?: ServiceProvider
  promotion?: Promotion
}

export interface Appointment {
  id: string
  packagePurchaseId: string
  customerId: string
  serviceProviderId: string
  appointmentDate: string
  startTime: string
  endTime: string
  status: "pending" | "confirmed" | "completed" | "cancelled" | "no_show"
  notes?: string
  customerNotes?: string
  providerNotes?: string
  createdAt: string
  updatedAt: string
  customer?: User
  serviceProvider?: ServiceProvider
  packagePurchase?: PackagePurchase
}

export interface Message {
  id: string
  senderId: string
  recipientId: string
  packagePurchaseId?: string
  appointmentId?: string
  message: string
  isRead: boolean
  createdAt: string
  sender?: User
  recipient?: User
}

export interface Review {
  id: string
  customerId: string
  serviceProviderId: string
  packagePurchaseId?: string
  rating: number
  comment?: string
  isVisible: boolean
  createdAt: string
  customer?: User
  serviceProvider?: ServiceProvider
}

export interface Conversation {
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

export interface MessageNew {
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

export interface AvailableSlot {
  date: string
  slots: string[]
}

export interface AdminStats {
  totalUsers: number
  totalServiceProviders: number
  totalCustomers: number
  totalPackages: number
  activePackages: number
  totalSales: number
  totalCommission: number
  monthlyGrowth: number
  topCategories: {
    name: string
    count: number
    percentage: number
  }[]
}

export interface AdminUser {
  id: string
  email: string
  userType: UserType
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

export interface CommissionSettings {
  defaultRate: number
  minimumRate: number
  maximumRate: number
  featuredPackageFee: number
  verificationFee: number
  customRates: {
    serviceProviderId: string
    rate: number
    reason: string
  }[]
}

export interface Transaction {
  id: string
  type: "commission" | "featured_fee" | "verification_fee"
  amount: number
  serviceProviderId: string
  serviceProviderName: string
  packageTitle?: string
  customerName?: string
  date: string
  status: "pending" | "completed" | "failed"
}
