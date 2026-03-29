"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { products, collections } from "@/data/products";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function GalleryPage() {
  return (
    <div className="pt-14 min-h-screen bg-background flex flex-col">
      <div className="px-4 sm:px-6 max-w-[1400px] mx-auto w-full flex-1">
        {/* Header Section */}
        <div className="pt-10 sm:pt-16 pb-8 sm:pb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fossil-display text-foreground"
          >
            Collections
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="fossil-body text-muted-foreground mt-3 max-w-[500px]"
          >
            Curated selections from the Mashalnaminema universe — each collection tells its own story.
          </motion.p>
        </div>

        {/* Collections Feed */}
        <div className="space-y-24 sm:space-y-40 mb-24">
          {collections.map((collection, ci) => {
            // Note: Update your products data to include a 'collection' string property
            const collectionProducts = products.filter((p) => (p as any).collection === collection.id);
            if (collectionProducts.length === 0) return null;

            const heroProduct = collectionProducts[0];
            const gridProducts = collectionProducts.slice(1, 5);

            return (
              <section key={collection.id} className="animate-fade-in">
                {/* Collection Title & Meta */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <span className="fossil-label text-muted-foreground mb-2 block font-medium">({collection.subtitle})</span>
                    <h2 className="fossil-heading text-foreground">{collection.title}</h2>
                  </motion.div>
                  <Link
                    href="/shop"
                    className="fossil-label text-muted-foreground hover:text-foreground transition-all flex items-center gap-2 group shrink-0"
                  >
                    Shop Collection <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Editorial Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-[2px] sm:gap-4 lg:gap-6">
                  {/* Hero Product Column */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                  >
                    <Link href={`/product/${heroProduct.id}`} className="group block">
                      <div className="relative aspect-[3/4] bg-card overflow-hidden">
                        <Image
                          src={heroProduct.image}
                          alt={heroProduct.name}
                          fill
                          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                          sizes="(max-width: 1024px) 100vw, 60vw"
                        />
                      </div>
                      <div className="flex items-center justify-between py-4 sm:py-5 border-b border-border/40">
                        <div>
                          <h3 className="fossil-label text-foreground text-[11px] sm:text-[12px]">{heroProduct.name}</h3>
                          <span className="fossil-body text-muted-foreground text-[14px]">R {heroProduct.price.toLocaleString()}</span>
                        </div>
                        <div className="h-10 w-10 flex items-center justify-end">
                          <ArrowRight size={18} className="text-foreground transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>

                  {/* Secondary Product Grid Column */}
                  <div className="grid grid-cols-2 gap-[2px] sm:gap-4 lg:gap-6">
                    {gridProducts.map((product, i) => (
                      <motion.div 
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (i + 1) * 0.1 }}
                      >
                        <Link href={`/product/${product.id}`} className="group block">
                          <div className="relative aspect-[3/4] bg-card overflow-hidden">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                              sizes="(max-width: 768px) 50vw, 25vw"
                            />
                          </div>
                          <div className="py-3 sm:py-4">
                            <h3 className="fossil-label text-foreground text-[10px] sm:text-[11px] truncate">{product.name}</h3>
                            <span className="fossil-body text-muted-foreground text-[13px]">R {product.price.toLocaleString()}</span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Collection Footer / Narrative */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="fossil-body text-muted-foreground mt-8 max-w-xl leading-relaxed italic border-l border-border pl-6">
                    {collection.description}
                  </p>
                </motion.div>
              </section>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
