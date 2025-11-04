// Authentication utilities and types
import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import type { NextRequest } from "next/server"
import bcrypt from "bcryptjs"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-in-production")

export interface AuthUser {
  id: string
  email: string
  userType: "customer" | "service_provider" | "admin"
  firstName: string
  lastName: string
  isActive: boolean
  phone?: string
}

const mockUsers = [
  {
    id: "1",
    email: "admin@paresapp.online",
    password: Buffer.from("admin123").toString("base64"), // Updated to match mock-data hashing
    userType: "admin" as const,
    firstName: "Admin",
    lastName: "User",
    isActive: true,
  },
  {
    id: "2",
    email: "provider@example.com",
    password: Buffer.from("provider123").toString("base64"), // Updated to match mock-data hashing
    userType: "service_provider" as const,
    firstName: "Ayşe",
    lastName: "Yılmaz",
    isActive: true,
  },
  {
    id: "3",
    email: "customer@example.com",
    password: Buffer.from("customer123").toString("base64"), // Updated to match mock-data hashing
    userType: "customer" as const,
    firstName: "Mehmet",
    lastName: "Demir",
    isActive: true,
  },
]

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return Buffer.from(password).toString("base64") === hashedPassword
}

export async function findUserByEmail(email: string) {
  // In production, this would query the database
  return mockUsers.find((user) => user.email === email) || null
}

export async function createUser(userData: {
  email: string
  password: string
  userType: "customer" | "service_provider" | "admin"
  firstName: string
  lastName: string
  phone?: string
}) {
  // In production, this would insert into the database
  const hashedPassword = await hashPassword(userData.password)

  const newUser = {
    id: `user_${Date.now()}`,
    email: userData.email,
    password: hashedPassword,
    userType: userData.userType,
    firstName: userData.firstName,
    lastName: userData.lastName,
    isActive: true,
    phone: userData.phone,
  }

  // Mock: add to in-memory array (in production, save to database)
  mockUsers.push(newUser)

  return {
    id: newUser.id,
    email: newUser.email,
    userType: newUser.userType,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    isActive: newUser.isActive,
    phone: newUser.phone,
  }
}

export async function createToken(user: AuthUser): Promise<string> {
  return new SignJWT({
    sub: user.id,
    email: user.email,
    userType: user.userType,
    firstName: user.firstName,
    lastName: user.lastName,
    isActive: user.isActive,
    phone: user.phone,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return {
      id: payload.sub as string,
      email: payload.email as string,
      userType: payload.userType as "customer" | "service_provider" | "admin",
      firstName: payload.firstName as string,
      lastName: payload.lastName as string,
      isActive: payload.isActive as boolean,
      phone: payload.phone as string | undefined,
    }
  } catch {
    return null
  }
}

export async function getAuthUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")?.value

  if (!token) return null

  return verifyToken(token)
}

export async function getAuthUserFromRequest(request: NextRequest): Promise<AuthUser | null> {
  const token = request.cookies.get("auth-token")?.value

  if (!token) return null

  return verifyToken(token)
}
