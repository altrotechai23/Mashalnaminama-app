"use client";

import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";

const CartSidebar = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, isOpen, setIsOpen } = useCart();
  const { isSignedIn } = useUser();
  const { openSignUp } = useClerk();
  const router = useRouter();

  const handleCheckout = () => {
    setIsOpen(false);
    
    if (!isSignedIn) {
      // Gate the user: They must sign up to proceed to checkout
      // Clerk will handle redirecting back to /checkout after auth
      openSignUp({
        afterSignUpUrl: "/checkout",
        afterSignInUrl: "/checkout",
      });
    } else {
      router.push("/checkout");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent 
        side="right" 
        className="flex flex-col bg-background border-l border-border w-full sm:max-w-[420px] p-0 outline-none"
      >
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="fossil-label text-foreground tracking-[0.15em]">
              YOUR CART ({items.length})
            </SheetTitle>
            
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 gap-4">
            <ShoppingBag size={32} strokeWidth={1} className="text-muted-foreground opacity-20" />
            <p className="fossil-body text-muted-foreground text-center max-w-[240px]">
              Your cart is empty. Explore the collection to find something extraordinary.
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 no-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 animate-fade-up">
                  <div className="relative w-20 h-[106px] bg-card flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <p className="fossil-label text-foreground text-[11px]">{item.name}</p>
                      <p className="fossil-body text-foreground tabular-nums mt-1">
                        ${item.price}.00
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-muted-foreground hover:text-foreground transition-colors active:scale-90"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="fossil-label tabular-nums w-4 text-center text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-muted-foreground hover:text-foreground transition-colors active:scale-90"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-foreground transition-colors active:scale-90"
                        aria-label="Remove item"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border px-6 pt-6 pb-safe space-y-4">
              <div className="flex justify-between items-center">
                <span className="fossil-label text-foreground">TOTAL</span>
                <span className="fossil-body text-foreground tabular-nums">
                  ${totalPrice}.00
                </span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-foreground text-background py-4 fossil-label tracking-[0.15em] hover:opacity-90 transition-all active:scale-[0.98] duration-300"
              >
                {isSignedIn ? "PROCEED TO CHECKOUT" : "SIGN IN TO CHECKOUT"}
              </button>
              <p className="text-[9px] uppercase tracking-[0.1em] text-muted-foreground text-center">
                Tax and shipping calculated at next step
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
