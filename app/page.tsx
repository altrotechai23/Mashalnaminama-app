"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function IndexPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Force play in case the browser blocks initial autoPlay
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Autoplay was prevented:", error);
      });
    }
  }, []);

  const navItems = [
    { label: "Shop", path: "/shop" },
    { label: "New Arrivals", path: "/shop" },
    { label: "Brand", path: "/brand" },
    { label: "Gallery", path: "/gallery" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-zinc-950">
      {/* 
          CRITICAL ATTRIBUTES: 
          - muted: Browsers block autoplay with sound.
          - playsInline: Required for iOS Safari background playback.
          - autoPlay: Standard autoplay trigger.
      */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover opacity-0 animate-fade-in [animation-fill-mode:forwards]"
      >
        <source src="/hero.mp4" type="video/mp4" />
        {/* Optional fallback for older browsers */}
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <div className="mb-10 text-center animate-fade-up">
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
        </div>

        <div className="mb-8 h-[1px] w-8 bg-white/30 animate-fade-up stagger-1" />

        <nav className="flex flex-col items-center gap-3">
          {navItems.map((item, i) => (
            <Link
              key={item.label}
              href={item.path}
              className={`text-[13px] font-light uppercase tracking-[0.18em] text-white/80 transition-all duration-500 hover:tracking-[0.25em] hover:text-white animate-fade-up stagger-${i + 1}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="absolute right-0 bottom-0 left-0 z-10 flex items-center justify-center px-6 py-8">
        <span className="fossil-label text-white opacity-40 animate-fade-up stagger-5">
          Cape Town
        </span>
      </div>
    </div>
  );
}
