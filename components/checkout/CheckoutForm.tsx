"use client";
import { completeUserOnboarding } from "@/lib/actions/checkout";

export default function CheckoutForm({ initialData, needsOnboarding }: any) {
  return (
    <form action={completeUserOnboarding} className="space-y-6">
      <div className="space-y-4">
        <input 
          readOnly 
          value={initialData.email} 
          className="w-full bg-zinc-900 p-4 border border-zinc-800 text-zinc-500 cursor-not-allowed" 
        />
        
        <input 
          name="phone" 
          defaultValue={initialData.phone}
          placeholder="PHONE NUMBER" 
          className="w-full bg-zinc-900 p-4 border border-zinc-800 focus:border-white outline-none"
          required 
        />

        <textarea 
          name="address" 
          defaultValue={initialData.address}
          placeholder="SHIPPING ADDRESS (STREET, CITY, POSTAL CODE)" 
          className="w-full bg-zinc-900 p-4 border border-zinc-800 h-32 focus:border-white outline-none"
          required 
        />
      </div>

      <button className="w-full bg-white text-black py-5 font-bold uppercase tracking-tighter hover:invert transition">
        {needsOnboarding ? "Save & Continue" : "Confirm Order"}
      </button>
    </form>
  );
}
