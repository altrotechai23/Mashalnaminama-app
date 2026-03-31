import { prisma } from "@/lib/prisma";
import ShopClient from "./ShopClient";

// Force dynamic to ensure fresh data from Supabase
export const dynamic = "force-dynamic";

export default async function ShopPage() {
  // Fetch real data from Supabase
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Map Prisma Decimal to Number for the Frontend
  const serializedProducts = products.map((p) => ({
    ...p,
    price: Number(p.price),
    // Ensure we take the first image from our Cloudinary array
    image: p.images[0] || "/placeholder.jpg", 
  }));

  return <ShopClient initialProducts={serializedProducts} />;
}
