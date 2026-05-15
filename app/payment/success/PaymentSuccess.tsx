"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function PaymentSuccess() {
  const cart = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const paypalOrderId = searchParams.get("token");
    const orderId = searchParams.get("orderId");

    if (!paypalOrderId || !orderId) {
      const t = setTimeout(() => setStatus("error"), 0);
      return () => clearTimeout(t);
    }

    fetch("/api/paypal/capture-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paypalOrderId, orderId }),
    })
      .then(res => res.json())
      .then((data )=>{ 
        cart.clearCart();
        setStatus(data.success ? "success" : "error")})
      .catch(() => setStatus("error"));
  }, [searchParams, cart]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white gap-4">
      {status === "loading" && (
        <p className="text-zinc-400 uppercase text-xs tracking-widest">Confirming payment...</p>
      )}
      {status === "success" && (
        <>
          <p className="text-2xl font-black uppercase">Payment Confirmed</p>
          <button onClick={() => router.push("/")} className="text-xs text-zinc-500 uppercase tracking-widest hover:text-white">
            Back to Store
          </button>
        </>
      )}
      {status === "error" && (
        <>
          <p className="text-2xl font-black uppercase text-red-500">Payment Failed</p>
          <button onClick={() => router.push("/checkout")} className="text-xs text-zinc-500 uppercase tracking-widest hover:text-white">
            Try Again
          </button>
        </>
      )}
    </div>
  );
}