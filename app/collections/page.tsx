// app/gallery/page.tsx
import { prisma } from "@/lib/prisma";
import Footer from "@/components/Footer";
import GalleryClient from "@/components/GalleryClient";

export default async function CollectionsPage() {
  const rawCollections = await prisma.collection.findMany({
    include: {
      products: {
        take: 5,
        select: {
          id: true,
          name: true,
          price: true,
          images: true,
        }
      }
    }
  });

  // 1. SERIALISE: Convert Decimal objects to Numbers
  const serialisedCollections = rawCollections.map((collection) => ({
    ...collection,
    products: collection.products.map((product) => ({
      ...product,
      price: Number(product.price), // This fixes the "Decimal" error
    })),
  }));

  return (
    <div className="pt-14 min-h-screen bg-background flex flex-col">
      <div className="px-4 sm:px-6 max-w-[1400px] mx-auto w-full flex-1">
        {/* 2. Pass the serialised data to the Client Component */}
        <GalleryClient initialCollections={serialisedCollections} />
      </div>
      <Footer />
    </div>
  );
}
