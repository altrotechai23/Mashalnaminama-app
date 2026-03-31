"use client";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useCart } from "@/hooks/use-cart";

export default function CheckoutButton() {
  const { items } = useCart();
  
  if (items.length === 0) return null;

  return (
    <div className="mt-6">
      <SignedIn>
        <button 
          onClick={() => window.location.href = '/checkout'}
          className="w-full bg-white text-black py-4 font-bold uppercase"
        >
          Proceed to Checkout
        </button>
      </SignedIn>
      
      <SignedOut>
        <SignInButton mode="modal">
          <button className="w-full bg-zinc-800 text-white py-4 font-bold uppercase">
            Sign In to Checkout
          </button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}
