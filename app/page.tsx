"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const HERO_IMAGES = [
  "/hero-1.jpg",
  "/hero-2.jpg",
  "/hero-3.jpg",
  "/hero-4.jpg",
];

export default function IndexPage() {
  const [index, setIndex] = useState(0);

  // Auto-cycle images every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { label: "Shop", path: "/shop" },
    { label: "New Arrivals", path: "/shop" },
    { label: "Brand", path: "/brand" },
    { label: "Collections", path: "/collections" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-zinc-950">
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={HERO_IMAGES[index]}
            src={HERO_IMAGES[index]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 2, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="absolute inset-0 h-full w-full object-cover"
            alt="Hero Background"
          />
        </AnimatePresence>
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-10 text-center"
        >
          <h1
            className="font-light uppercase leading-none tracking-[0.25em] text-white"
            style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)" }}
          >
            Mashal
          </h1>
          <p
            className="mt-1 font-light uppercase tracking-[0.5em] text-white/70"
            style={{ fontSize: "clamp(0.65rem, 2.5vw, 1.1rem)" }}
          >
            naminema
          </p>
        </motion.div>

        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "2rem" }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8 h-[1px] bg-white/30" 
        />

        <nav className="flex flex-col items-center gap-3">
          {navItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              <Link
                href={item.path}
                className="text-[13px] font-light uppercase tracking-[0.18em] text-white/80 transition-all duration-500 hover:tracking-[0.3em] hover:text-white"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>

      {/* Footer Location Label */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5 }}
        className="absolute right-0 bottom-0 left-0 z-10 flex items-center justify-center px-6 py-8"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-white font-light">
          Cape Town
        </span>
      </motion.div>
    </div>
  );
}
