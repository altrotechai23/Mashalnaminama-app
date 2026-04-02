"use client";
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductGallery({ images, name }: { images: string[], name: string }) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Vertical Thumbnails List */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible no-scrollbar">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 border-2 transition-all ${
              activeIdx === i ? "border-black" : "border-transparent opacity-50 hover:opacity-100"
            }`}
          >
            <Image src={img} alt={`${name} thumb ${i}`} fill className="object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 aspect-[4/5] bg-zinc-50 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <Image src={images[activeIdx]} alt={name} fill priority className="object-cover" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
