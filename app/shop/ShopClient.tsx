"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Tops", "Bottoms", "Sets", "New"];

export default function ShopClient({ initialProducts }: { initialProducts: any[] }) {
  const [active, setActive] = useState("All");
  const { addToCart } = useCart();

  const filtered = initialProducts.filter((p) => {
    if (active === "All") return true;
    if (active === "New") return p.isNew;
    return p.category?.toLowerCase() === active.toLowerCase();
  });

  return (
    <div className="pt-14 min-h-screen bg-background flex flex-col">
      <div className="px-4 sm:px-6 max-w-[1400px] mx-auto w-full flex-1">
        {/* Header Section */}
        <div className="flex flex-col gap-4 pt-10 sm:pt-16 pb-8 sm:pb-12 md:flex-row md:items-end md:justify-between md:gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="fossil-display text-foreground">Shop</h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="fossil-body text-muted-foreground max-w-[420px]">
              Explore Mashalnaminema&apos;s contemporary collection — where traditional craftsmanship meets modern silhouette.
            </p>
          </motion.div>
        </div>

        {/* Filter Bar */}
        <div className="flex gap-4 sm:gap-6 mb-6 sm:mb-8 overflow-x-auto no-scrollbar sm:justify-end border-b border-border/40 pb-2 sm:border-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`fossil-nav-link whitespace-nowrap transition-all duration-300 relative py-2 ${
                active === cat ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
              {active === cat && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-foreground"
                />
              )}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-[2px] sm:gap-4 mb-20">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="group block"
              >
                <div className="relative bg-card aspect-[3/4] overflow-hidden">
                  <Link href={`/product/${product.id}`} className="block h-full w-full">
                    {product.isNew && (
                      <span className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 fossil-label bg-background text-foreground px-1.5 py-0.5 sm:px-2 sm:py-1 text-[9px] sm:text-[11px] border border-border/50">
                        NEW
                      </span>
                    )}
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.05]"
                      sizes="(max-width: 768px) 50vw, 33vw"
                      priority={i < 3}
                    />
                  </Link>

                  {/* Quick Add Actions */}
                  <button
                    onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}
                    className="hidden lg:block absolute bottom-0 left-0 right-0 bg-foreground text-background py-4 fossil-label tracking-[0.15em] text-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-zinc-800"
                  >
                    ADD TO CART
                  </button>

                  <button
                    onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}
                    className="lg:hidden absolute bottom-3 right-3 bg-background/90 backdrop-blur-md text-foreground w-10 h-10 flex items-center justify-center rounded-full active:scale-90 transition-all border border-border/50 shadow-sm"
                  >
                    <span className="text-[20px] font-light leading-none">+</span>
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline py-3 sm:py-4 gap-1">
                  <Link href={`/product/${product.id}`}>
                    <span className="fossil-label text-foreground text-[10px] sm:text-[12px] hover:opacity-60 transition-opacity uppercase">
                      {product.name}
                    </span>
                  </Link>
                  <span className="fossil-body text-foreground/80 tabular-nums text-[13px] sm:text-[14px]">
                    ${product.price}.00
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  );
}
