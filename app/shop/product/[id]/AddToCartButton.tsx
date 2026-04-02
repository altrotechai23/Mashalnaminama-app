"use client";
import { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ productId, name, price, image }: { productId: string; name: string; price: number; image: string;  }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
   const { addToCart } = useCart();

  const handleAdd = async () => {
    setStatus('loading');
    // Simulate API logic or Cart Context update
    addToCart({ id: productId, name: name, price, image: image })
    setStatus('success');
    setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={status !== 'idle'}
      className={`group relative w-full py-5 font-bold tracking-widest text-sm transition-all duration-300 flex items-center justify-center gap-2 
        ${status === 'success' ? "bg-green-600 text-white" : "bg-black text-white hover:bg-zinc-800 active:scale-95"}`}
    >
      {status === 'loading' && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
      {status === 'success' ? <><Check size={18} /> ADDED</> : <><ShoppingBag size={18} /> ADD TO BAG</>}
    </button>
  );
}
