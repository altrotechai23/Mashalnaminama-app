"use client";

import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function ContactPage() {
  const [isPending, setIsPending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    
    // Simulate a server action delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success("Message Sent", {
      description: "We'll get back to you as soon as possible.",
    });
    
    setForm({ name: "", email: "", message: "" });
    setIsPending(false);
  };

  return (
    <div className="pt-14 min-h-screen bg-background flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 flex-1">
        {/* Left Side: Form */}
        <div className="px-6 md:px-16 flex flex-col justify-center py-12 sm:py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="fossil-display text-foreground mb-10 sm:mb-14">Contact</h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <form className="space-y-8 sm:space-y-10 max-w-md" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
                <div className="relative group">
                  <label className="fossil-label text-muted-foreground block mb-3">NAME</label>
                  <input
                    required
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent border-b border-border pb-3 fossil-body text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-foreground transition-all duration-300"
                  />
                </div>
                <div className="relative group">
                  <label className="fossil-label text-muted-foreground block mb-3">EMAIL</label>
                  <input
                    required
                    type="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-transparent border-b border-border pb-3 fossil-body text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-foreground transition-all duration-300"
                  />
                </div>
              </div>
              <div className="relative group">
                <label className="fossil-label text-muted-foreground block mb-3">MESSAGE</label>
                <textarea
                  required
                  placeholder="How can we help?"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-transparent border-b border-border pb-3 fossil-body text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-foreground transition-all duration-300 resize-none"
                />
              </div>
              <button
                disabled={isPending}
                type="submit"
                className="fossil-label bg-foreground text-background px-12 py-4 tracking-[0.2em] transition-all duration-300 hover:opacity-90 active:scale-[0.98] w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "SENDING..." : "SEND MESSAGE"}
              </button>
            </form>
          </motion.div>

          {/* Contact Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-8 mt-16 sm:mt-24 max-w-md border-t border-border pt-10"
          >
            <div>
              <span className="fossil-label text-muted-foreground block mb-3">(Location)</span>
              <p className="fossil-body text-foreground text-[13px] sm:text-[15px] leading-relaxed">
                Cape Town<br />South Africa
              </p>
            </div>
            <div>
              <span className="fossil-label text-muted-foreground block mb-3">(Email)</span>
              <p className="fossil-body text-foreground text-[13px] sm:text-[15px] break-all leading-relaxed">
                info@mashalnaminema.com
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Image (Desktop only) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="hidden md:block relative bg-zinc-100"
        >
          <Image
            src="/contact-store.jpg"
            alt="Mashalnaminema store interior"
            fill
            priority
            className="object-cover"
            sizes="50vw"
          />
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
