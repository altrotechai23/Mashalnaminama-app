// import { PrismaClient } from '@prisma/client'
import { prisma } from "../lib/prisma"

// const prisma = new PrismaClient()

const collectionsData = [
  {
    id: "new-arrivals",
    title: "New Arrivals",
    subtitle: "Fresh drops for the season",
    description: "The latest additions to the Mashalnaminema universe — pieces that push boundaries while honoring the craft.",
  },
  {
    id: "editorial",
    title: "Editorial",
    subtitle: "Statement pieces, crafted for impact",
    description: "Bold, sculptural garments born from the intersection of couture technique and streetwear rebellion.",
  },
  {
    id: "essentials",
    title: "Essentials",
    subtitle: "The foundation of every wardrobe",
    description: "Timeless staples engineered for longevity — heavyweight fabrics, clean lines, and impeccable construction.",
  },
]

const productsData = [
  {
    id: "1",
    name: "NAVY TACK PANT",
    price: 79,
    image: "/products/product-navy-pant.jpg",
    category: "bottoms",
    description: "A relaxed-fit trouser with articulated tack detailing...",
    details: ["100% heavyweight cotton twill", "Made in Cape Town"],
    sizes: ["XS", "S", "M", "L", "XL"],
    collectionId: "essentials",
  },
  // ... Add remaining products from your Vite data here
]

async function main() {
  console.log("Start seeding...")

  // 1. Seed Collections First (Parents)
  for (const collection of collectionsData) {
    await prisma.collection.upsert({
      where: { id: collection.id },
      update: {},
      create: collection,
    })
  }

  // 2. Seed Products (Children)
  for (const product of productsData) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {},
      create: product,
    })
  }

  console.log("Seeding finished.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
