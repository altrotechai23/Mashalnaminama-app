// lib/prisma.ts
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// 1. Create a pg Pool with your Supabase connection string
const pool = new Pool({ connectionString: process.env.DATABASE_URL })

// 2. Initialize the PrismaPg adapter
const adapter = new PrismaPg(pool)

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter, // Pass the adapter here to fix the Error
    log: ["error", "warn"],
  })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
