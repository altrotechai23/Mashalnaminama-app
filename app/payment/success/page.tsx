import { Suspense } from "react";
import PaymentSuccess from "./PaymentSuccess";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-zinc-400 uppercase text-xs tracking-widest">Confirming payment...</p>
      </div>
    }>
      <PaymentSuccess />
    </Suspense>
  );
}