"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Minus, Plus, Check } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);
  
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!product) {
    return (
      <div className="pt-24 min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center space-y-6">
          <h2 className="fossil-heading text-foreground">Product not found</h2>
          <Link href="/shop" className="fossil-label text-muted-foreground hover:text-foreground transition-colors inline-block border-b border-muted-foreground/30 pb-1">
            ← Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  // Mock sizes and details since they weren't in the base data object
  const sizes = ["XS", "S", "M", "L", "XL"];
  const details = [
    "Ethically sourced premium materials",
    "Hand-finished structural detailing",
    "Tailored for a contemporary silhouette",
    "Dry clean only"
  ];

  const recommended = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    
    for (let i = 0; i < quantity; i++) {
      addToCart({ 
        id: product.id, 
        name: `${product.name} (${selectedSize})`, 
        price: product.price, 
        image: product.image 
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pt-14 min-h-screen bg-background flex flex-col">
      <div className="px-4 sm:px-6 max-w-[1400px] mx-auto w-full flex-1">
        {/* Back navigation */}
        <div className="pt-4 sm:pt-6 pb-4">
          <button
            onClick={() => router.back()}
            className="fossil-label text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 active:scale-95 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-16">
          {/* Main Image Container */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-[3/4] bg-card overflow-hidden"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </motion.div>

          {/* Info Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-8 py-2 lg:py-8 lg:sticky lg:top-20 h-fit"
          >
            <div>
              {product.isNew && (
                <span className="fossil-label text-muted-foreground mb-3 block">New Arrival</span>
              )}
              <h1 className="fossil-heading text-foreground mb-3">
                {product.name}
              </h1>
              <p className="fossil-body text-foreground tabular-nums text-xl">
                R {product.price.toLocaleString()}
              </p>
            </div>

            <p className="fossil-body text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="space-y-4">
              <span className="fossil-label text-foreground block">Size</span>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 min-w-[3.5rem] px-4 border fossil-label transition-all duration-300 active:scale-95 ${
                      selectedSize === size
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background text-foreground border-border hover:border-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <span className="fossil-label text-foreground block">Quantity</span>
              <div className="flex items-center border border-border w-fit bg-background">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-zinc-50 transition-colors active:scale-90"
                >
                  <Minus size={14} />
                </button>
                <span className="w-14 h-12 flex items-center justify-center fossil-body tabular-nums border-x border-border">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-zinc-50 transition-colors active:scale-90"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Add to Cart CTA */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={`w-full h-14 fossil-label tracking-[0.2em] uppercase transition-all duration-500 active:scale-[0.98] flex items-center justify-center gap-3 ${
                added
                  ? "bg-zinc-900 text-white"
                  : selectedSize
                  ? "bg-foreground text-background hover:opacity-90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.div key="added" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
                    <Check size={16} /> Added to Bag
                  </motion.div>
                ) : (
                  <motion.span key="normal" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {selectedSize ? "Add to Bag" : "Select a Size"}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Product Details Accourdion-style */}
            <div className="border-t border-border pt-8 mt-4 space-y-6">
              <div>
                <span className="fossil-label text-foreground block mb-4 underline decoration-border underline-offset-8">Details</span>
                <ul className="space-y-3">
                  {details.map((detail, idx) => (
                    <li key={idx} className="fossil-body text-muted-foreground flex items-start gap-3">
                      <span className="w-1 h-1 rounded-full bg-zinc-300 mt-[0.6em] shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-border pt-8 space-y-3">
                <span className="fossil-label text-foreground block underline decoration-border underline-offset-8 mb-4">Shipping & Care</span>
                <p className="fossil-body text-muted-foreground text-sm italic">
                  Cape Town: 2-3 business days. International: 7-10 business days. Hand wash recommended for long-term preservation.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recommended Items Grid */}
        {recommended.length > 0 && (
          <div className="mt-24 sm:mt-32 pb-16">
            <div className="flex items-center justify-between mb-8 sm:mb-12">
              <span className="fossil-label text-muted-foreground">(You may also like)</span>
              <Link href="/shop" className="fossil-label hover:opacity-60 transition-opacity">
                View Shop →
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-[2px] sm:gap-4">
              {recommended.map((item, i) => (
                <Link key={item.id} href={`/product/${item.id}`} className="group block animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="relative aspect-[3/4] bg-card overflow-hidden mb-4">
                    <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="fossil-label text-[10px] sm:text-[11px] truncate">{item.name}</span>
                    <span className="fossil-body text-[13px] sm:text-[14px]">R {item.price.toLocaleString()}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
