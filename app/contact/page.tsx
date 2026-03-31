"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { sendContactEmail } from "@/lib/actions/contact";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message is too short"),
});
// 1. Define the type from your schema
type ContactFormValues = z.infer<typeof schema>;

export default function ContactPage() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // 2. Pass the type to useForm
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    // 3. Recommended: Add default values to ensure internal state is initialized
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  // Now 'data' matches perfectly and the error disappears
  const onSubmit = async (data: ContactFormValues) => {
    
    setIsPending(true);
    const result = await sendContactEmail(data);

    if (result.success) {
      setIsSuccess(true);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      reset();
      
      // Auto-redirect after 4 seconds
      setTimeout(() => router.push("/shop"), 4000);
    } else {
      toast.error(result.error);
    }
    setIsPending(false);
  };

  return (
    <div className="pt-14 min-h-screen bg-background flex flex-col relative">
      <div className="grid grid-cols-1 md:grid-cols-2 flex-1">
        {/* Form Side */}
        <div className="px-6 md:px-16 flex flex-col justify-center py-12 lg:py-32">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="fossil-display text-foreground mb-14">
            Contact
          </motion.h1>

          <form className="space-y-10 max-w-md" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="relative group">
                <label className="fossil-label text-muted-foreground block mb-3">NAME</label>
                <input {...register("name")} className="w-full bg-transparent border-b border-border pb-3 outline-none focus:border-foreground transition-all" />
                {errors.name && <p className="text-red-500 text-[10px] mt-1 italic">{errors.name.message as string}</p>}
              </div>
              <div className="relative group">
                <label className="fossil-label text-muted-foreground block mb-3">EMAIL</label>
                <input {...register("email")} className="w-full bg-transparent border-b border-border pb-3 outline-none focus:border-foreground transition-all" />
                {errors.email && <p className="text-red-500 text-[10px] mt-1 italic">{errors.email.message as string}</p>}
              </div>
            </div>
            <div>
              <label className="fossil-label text-muted-foreground block mb-3">MESSAGE</label>
              <textarea {...register("message")} rows={4} className="w-full bg-transparent border-b border-border pb-3 outline-none focus:border-foreground transition-all resize-none" />
              {errors.message && <p className="text-red-500 text-[10px] mt-1 italic">{errors.message.message as string}</p>}
            </div>
            
            <button disabled={isPending} type="submit" className="fossil-label bg-foreground text-background px-12 py-4 tracking-[0.2em] hover:opacity-90 disabled:opacity-50 w-full sm:w-auto">
              {isPending ? "SENDING..." : "SEND MESSAGE"}
            </button>
          </form>
        </div>

        {/* Desktop Image */}
        <div className="hidden md:block relative bg-zinc-100">
          <Image src="/contact-store.jpg" alt="Store" fill className="object-cover" />
        </div>
      </div>

      {/* Success Dialog Overlay */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-white border p-12 max-w-sm w-full text-center shadow-2xl"
            >
              <CheckCircle2 className="mx-auto mb-6 text-green-500" size={48} strokeWidth={1} />
              <h2 className="fossil-heading mb-4">Message Received</h2>
              <p className="fossil-body text-muted-foreground mb-8">
                Thank you. We have received your inquiry and will reach out shortly.
              </p>
              <div className="flex flex-col gap-4">
                <div className="h-1 w-full bg-gray-100 relative overflow-hidden">
                  <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 4 }} className="absolute inset-0 bg-foreground" />
                </div>
                <p className="text-[10px] tracking-widest text-muted-foreground uppercase">Redirecting to shop...</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
