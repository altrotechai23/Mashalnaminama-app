"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Shimmer } from "./GalleryShimmer";

export default function GalleryClient({ initialCollections }: { initialCollections: any[] }) {
  return (
    <>
      {/* Header Section */}
      <div className="pt-10 sm:pt-16 pb-8 sm:pb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fossil-display text-foreground text-5xl font-bold"
        >
          Collections
        </motion.h1>
      </div>

      <div className="space-y-24 sm:space-y-40 mb-24">
        {initialCollections.map((collection) => (
          <section key={collection.id} className="group">
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="text-muted-foreground text-sm uppercase tracking-widest">({collection.name})</span>
                <h2 className="text-3xl font-medium mt-2">{collection.name}</h2>
              </div>
              <Link href="/shop" className="flex items-center gap-2 text-sm hover:underline">
                Shop Collection <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-4">
              {/* Hero Product */}
              <ProductCard product={collection.products[0]} isHero />
              
              {/* Grid Products */}
              <div className="grid grid-cols-2 gap-4">
                {collection.products.slice(1, 5).map((p: any) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

function ProductCard({ product, isHero = false }: { product: any; isHero?: boolean }) {
  const [isLoading, setIsLoading] = useState(true);

  if (!product) return null;

  return (
    <Link href={`/product/${product.id}`} className="block group">
      <div className={`relative overflow-hidden bg-muted ${isHero ? 'aspect-[3/4]' : 'aspect-[3/4]'}`}>
        {isLoading && <Shimmer />}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className={`object-cover transition-all duration-700 ${isLoading ? 'opacity-0' : 'opacity-100 group-hover:scale-105'}`}
          onLoadingComplete={() => setIsLoading(false)}
        />
      </div>
      <div className="mt-4 flex justify-between items-start">
        <div>
          <p className="text-[11px] uppercase tracking-tighter">{product.name}</p>
          <p className="text-muted-foreground text-sm">R {Number(product.price).toLocaleString()}</p>
        </div>
      </div>
    </Link>
  );
}
