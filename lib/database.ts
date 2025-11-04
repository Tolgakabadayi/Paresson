import type { User, ServiceProvider } from "./types"

// Mock database - replace with real database connection
const mockUsers: (User & { passwordHash: string })[] = [
  {
    id: "1",
    email: "admin@paresapp.online",
    passwordHash: "$2b$12$LQv3c1yqBwEHFl5aMKnOse.hdEpKbmC07vmPjVhpC6LmFJqOpVSO2", // admin123
    userType: "admin",
    firstName: "Admin",
    lastName: "User",
    isActive: true,
    emailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const mockServiceProviders: ServiceProvider[] = []

export async function findUserByEmail(email: string): Promise<(User & { passwordHash: string }) | null> {
  return mockUsers.find((user) => user.email === email) || null
}

export async function findUserById(id: string): Promise<User | null> {
  const user = mockUsers.find((user) => user.id === id)
  if (!user) return null

  const { passwordHash, ...userWithoutPassword } = user
  return userWithoutPassword
}

export async function createUser(userData: {
  email: string
  passwordHash: string
  userType: "customer" | "service_provider" | "admin"
  firstName: string
  lastName: string
  phone?: string
}): Promise<User> {
  const newUser = {
    id: (mockUsers.length + 1).toString(),
    ...userData,
    isActive: true,
    emailVerified: false,
    avatarUrl: undefined,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  mockUsers.push(newUser)

  // If service provider, create service provider profile
  if (userData.userType === "service_provider") {
    const serviceProvider: ServiceProvider = {
      id: (mockServiceProviders.length + 1).toString(),
      userId: newUser.id,
      rating: 0,
      totalReviews: 0,
      isVerified: false,
      isFeatured: false,
      commissionRate: 10.0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockServiceProviders.push(serviceProvider)
  }

  const { passwordHash, ...userWithoutPassword } = newUser
  return userWithoutPassword
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
  const userIndex = mockUsers.findIndex((user) => user.id === id)
  if (userIndex === -1) return null

  mockUsers[userIndex] = {
    ...mockUsers[userIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  }

  const { passwordHash, ...userWithoutPassword } = mockUsers[userIndex]
  return userWithoutPassword
}
