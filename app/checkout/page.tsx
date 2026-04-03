"use client";

import { useState, useEffect } from "react";
import { createOrder } from "@/lib/actions/orders";
import { Loader2, ShieldCheck, ShoppingCart, Lock } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const cart = useCart();
  const [loading, setLoading] = useState(false);
  
  // Guard to ensure we only render on the client
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate total safely using the items from context
  const totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // 1. Loading state while mounting (Fixes the "Forever Loading" if logic was missing)
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <Loader2 className="animate-spin text-zinc-800" size={24} />
      </div>
    );
  }

  // 2. Empty check (Only runs on client where localStorage is available via Context)
  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center pt-20 gap-4">
        <ShoppingCart size={40} className="text-zinc-900 opacity-20" />
        <p className="text-zinc-500 uppercase text-[10px] tracking-[0.3em]">Your cart is empty</p>
      </div>
    );
  }

  const handlePayFastRedirect = async () => {
    setLoading(true);
    try {
      // Create order via Server Action
      const { orderId, userEmail, userName } = await createOrder(cart.items, totalPrice);
      
      const res = await fetch("/api/payfast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail,
          userName: userName || "Customer",
          totalAmount: totalPrice,
          orderId,
          itemNames: cart.items.map(i => i.name).join(", ")
        }),
      });

      const { payfastUrl, payfastData } = await res.json();
      
      // Clear cart before moving to payment gateway
      cart.clearCart();

      // Submit to PayFast
      const form = document.createElement("form");
      form.method = "POST";
      form.action = payfastUrl;

      Object.entries(payfastData).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value as string;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Payment initiation failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 p-6 animate-in fade-in duration-500">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center gap-2 mb-8 text-white">
          <ShieldCheck size={20} className="text-zinc-500" />
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">Checkout</h1>
        </div>
        
        <div className="bg-zinc-950 border border-zinc-900 rounded-[2rem] p-8 space-y-8 shadow-2xl">
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b border-zinc-900/50">
                <div>
                  <p className="text-xs font-black uppercase text-white">{item.name}</p>
                  <p className="text-[10px] text-zinc-500 uppercase">Qty: {item.quantity}</p>
                </div>
                <span className="font-mono text-sm text-zinc-400">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-between items-end">
            <div>
              <p className="text-[10px] uppercase font-black text-zinc-600 tracking-widest mb-1 text-zinc-500">Total</p>
              <p className="text-4xl font-mono tracking-tighter text-white">${totalPrice.toFixed(2)}</p>
            </div>
            <div className="text-right text-[9px] text-zinc-600 uppercase font-bold tracking-widest">ZAR</div>
          </div>

          <button 
            onClick={handlePayFastRedirect}
            disabled={loading}
            className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase text-xs hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-30"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <><Lock size={16} /> Pay via PayFast</>}
          </button>
        </div>
      </div>
    </div>
  );
}
