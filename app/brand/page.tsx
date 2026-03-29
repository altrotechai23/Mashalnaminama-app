"use client";

import Image from "next/image";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const BrandPage = () => {
  const values = [
    { 
      label: "(Heritage)", 
      text: "Our designs serve as a bridge between worlds — honoring the deep heritage of traditional craftsmanship while pushing the boundaries of modern silhouette and technical precision." 
    },
    { 
      label: "(Craftsmanship)", 
      text: "Every stitch is crafted by culture, drawing from a rich tapestry of history to create something entirely new for the contemporary world." 
    },
    { 
      label: "(Passion)", 
      text: "From the initial sketch to the final fitting, our commitment to excellence ensures that every garment tells a story of identity, resilience, and the beauty of the unexpected." 
    },
  ];

  return (
    <div className="pt-14 min-h-screen bg-background flex flex-col">
      <div className="px-4 sm:px-6 max-w-[1400px] mx-auto w-full flex-1">
        {/* Page Header */}
        <div className="pt-10 sm:pt-16 pb-8 sm:pb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fossil-display text-foreground"
          >
            Our Brand
          </motion.h1>
        </div>

        {/* Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 md:gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[3/4] bg-card overflow-hidden"
          >
            <Image
              src="/brand/hero-denim.webp"
              alt="Mashalnaminema collection — studded denim set"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="pb-4 md:pb-8"
          >
            <span className="fossil-label text-muted-foreground mb-4 sm:mb-6 block">
              (The Vision)
            </span>
            <p className="fossil-heading text-foreground leading-[1.35]">
              Mashalnaminema is more than a label; it is a journey of self-discovery told through the art of construction. We believe that true style emerges when you stop following the crowd and start doing the unusual.
            </p>
          </motion.div>
        </div>

        {/* Full Width Editorial */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-32 relative aspect-[4/3] sm:aspect-[16/9] bg-card overflow-hidden"
        >
          <Image
            src="/brand/duo-editorial.webp"
            alt="Mashalnaminema — editorial duo in handcrafted garments"
            fill
            className="object-cover object-top"
            sizes="100vw"
          />
        </motion.div>

        {/* Heritage / Values Grid */}
        <div className="mt-16 sm:mt-32 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
          {values.map((item, i) => (
            <motion.div 
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="fossil-label text-muted-foreground">{item.label}</span>
              <p className="fossil-body text-foreground mt-3 sm:mt-4">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Secondary Image Grid */}
        <div className="mt-16 sm:mt-32 grid grid-cols-2 gap-[2px] sm:gap-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[3/4] bg-card overflow-hidden"
          >
            <Image src="/brand/studded-denim.webp" alt="Studded denim collection" fill className="object-cover" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative aspect-[3/4] bg-card overflow-hidden"
          >
            <Image src="/brand/sherpa-set.webp" alt="Sherpa lounge set" fill className="object-cover" />
          </motion.div>
        </div>

        {/* Brand Quote */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-32 max-w-3xl"
        >
          <p className="fossil-heading text-foreground leading-[1.4]">
            &quot;True style emerges when you stop following the crowd and start doing the unusual. Every garment we create is a bridge between heritage and the future.&quot;
          </p>
          <span className="fossil-label text-muted-foreground mt-4 sm:mt-6 block">
            — Mashalnaminema
          </span>
        </motion.div>

        {/* Final Editorial */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-32 mb-16 relative aspect-[4/3] sm:aspect-[16/9] bg-card overflow-hidden"
        >
          <Image
            src="/brand/footer-editorial.webp"
            alt="Mashalnaminema — fringed coat editorial"
            fill
            className="object-cover object-top"
            sizes="100vw"
          />
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default BrandPage;
