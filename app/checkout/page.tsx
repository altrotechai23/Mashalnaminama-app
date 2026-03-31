import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export default async function CheckoutPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  
  // 1. Check if user exists in our Supabase DB via Prisma
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  // 2. If no address/phone, we must collect it (The Requirement)
  const needsOnboarding = !dbUser?.address || !dbUser?.phoneNumber;

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold uppercase italic mb-10 tracking-tighter">
          Checkout
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left: User Details & Shipping */}
          <div className="space-y-8">
            <h2 className="text-sm text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-2">
              Shipping Information
            </h2>
            
            <CheckoutForm 
              initialData={{
                email: user?.emailAddresses[0].emailAddress,
                address: dbUser?.address || "",
                phone: dbUser?.phoneNumber || "",
              }} 
              needsOnboarding={needsOnboarding}
            />
          </div>

          {/* Right: Order Summary (Cart items come from Client State) */}
          <div className="bg-zinc-900/50 p-8 border border-zinc-800 h-fit">
            <h2 className="text-sm uppercase mb-6 font-bold">Order Summary</h2>
            <div id="cart-summary-placeholder">
               {/* We will inject the Zustand cart items here via a Client Component */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
