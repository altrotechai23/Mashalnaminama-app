"use client";

import { CartProvider } from "@/context/CartContext";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </CartProvider>
  );
}
