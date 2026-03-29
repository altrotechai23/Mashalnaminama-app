"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { CartProvider } from "@/context/CartContext";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          {children}
          {/* Sonner replaces the deprecated Toaster */}
          <Sonner 
            position="top-center" 
            expand={false} 
            richColors 
            closeButton
            theme="light"
          />
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}
