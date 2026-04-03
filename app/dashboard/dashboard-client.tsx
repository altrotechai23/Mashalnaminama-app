"use client";

import { useState, useTransition } from "react";
import { updateProfile } from "@/lib/actions/dashboard";
import { 
  User, Package, Clock, CheckCircle, MapPin, 
  Phone, ChevronRight, Loader2, Mail, X, ShoppingBag 
} from "lucide-react";
import Image from "next/image";

export default function DashboardClient({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState<"PROFILE" | "PENDING" | "DELIVERED">("PROFILE");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isPending, startTransition] = useTransition();

  const orders = user?.orders || [];
  const pendingOrders = orders.filter((o: any) => o.status !== "DELIVERED");
  const deliveredOrders = orders.filter((o: any) => o.status === "DELIVERED");

  const handleUpdate = async (formData: FormData) => {
    startTransition(async () => {
      try {
        await updateProfile(formData);
      } catch (err) {
        console.error("Update failed", err);
      }
    });
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24 md:pb-10 pt-20">
      <div className="p-4 md:p-10 max-w-7xl mx-auto">
        
        {/* HEADER */}
        <header className="mb-12">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-2">My Account</h1>
          <div className="flex items-center gap-2 text-zinc-500 text-[10px] uppercase tracking-[0.2em]">
            <Mail size={12} /> {user.email}
          </div>
        </header>

        {/* TAB NAV */}
        <div className="flex gap-1 mb-10 bg-zinc-950 p-1 border border-zinc-900 rounded-2xl overflow-x-auto no-scrollbar">
          <TabBtn active={activeTab === "PROFILE"} onClick={() => setActiveTab("PROFILE")} label="Settings" icon={<User size={16}/>} />
          <TabBtn active={activeTab === "PENDING"} onClick={() => setActiveTab("PENDING")} label="Pending" icon={<Clock size={16}/>} />
          <TabBtn active={activeTab === "DELIVERED"} onClick={() => setActiveTab("DELIVERED")} label="History" icon={<CheckCircle size={16}/>} />
        </div>

        {/* CONTENT AREA */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* PROFILE TAB */}
          {activeTab === "PROFILE" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7">
                <form action={handleUpdate} className="space-y-8 bg-zinc-950/50 p-6 md:p-10 border border-zinc-900 rounded-3xl">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-[10px] uppercase text-zinc-600 font-black tracking-widest"><MapPin size={12}/> Address</label>
                      <input name="address" defaultValue={user.address || ""} className="w-full bg-black border-b border-zinc-800 py-4 outline-none focus:border-white transition" placeholder="Shipping Address" />
                    </div>
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-[10px] uppercase text-zinc-600 font-black tracking-widest"><Phone size={12}/> Contact</label>
                      <input name="phoneNumber" defaultValue={user.phoneNumber || ""} className="w-full bg-black border-b border-zinc-800 py-4 outline-none focus:border-white transition" placeholder="Phone Number" />
                    </div>
                  </div>
                  <button disabled={isPending} className="w-full bg-white text-black py-5 rounded-full font-black uppercase text-xs hover:invert disabled:opacity-50 transition flex items-center justify-center gap-2">
                    {isPending ? <Loader2 className="animate-spin" size={16} /> : "Update Account"}
                  </button>
                </form>
              </div>
              <div className="lg:col-span-5 bg-zinc-900/20 border border-zinc-900 rounded-3xl p-8 flex flex-col justify-center items-center text-center">
                <Package size={48} className="text-zinc-800 mb-4" />
                <h3 className="font-black uppercase italic text-xl">{orders.length} Orders</h3>
                <p className="text-zinc-500 text-[10px] uppercase mt-1 tracking-widest">Lifetime activity</p>
              </div>
            </div>
          )}

          {/* ORDERS TABS */}
          {(activeTab === "PENDING" || activeTab === "DELIVERED") && (
            <div className="grid gap-3">
              {(activeTab === "PENDING" ? pendingOrders : deliveredOrders).length === 0 ? (
                <div className="py-32 border border-dashed border-zinc-900 rounded-3xl flex flex-col items-center text-zinc-700 uppercase text-[10px] tracking-widest">
                  <ShoppingBag size={32} className="mb-4 opacity-20" /> No {activeTab} orders
                </div>
              ) : (
                (activeTab === "PENDING" ? pendingOrders : deliveredOrders).map((order: any) => (
                  <div key={order.id} onClick={() => setSelectedOrder(order)} className="group bg-zinc-950 border border-zinc-900 p-6 rounded-2xl flex items-center justify-between hover:bg-zinc-900 transition cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="text-[10px] font-mono text-zinc-600 uppercase">#{order.id.slice(-6)}</div>
                      <div className="text-sm font-black uppercase italic tracking-tighter">{new Date(order.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="font-mono text-lg">${Number(order.totalAmount).toFixed(2)}</span>
                      <ChevronRight size={18} className="text-zinc-800 group-hover:text-white transition group-hover:translate-x-1" />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* ORDER MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-100 flex items-end md:items-center justify-center p-0 md:p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-zinc-950 w-full max-w-xl border-t md:border border-zinc-800 rounded-t-[2rem] md:rounded-[2rem] max-h-[85vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-zinc-900 flex justify-between items-center bg-zinc-950">
              <h2 className="text-xl font-black uppercase italic tracking-tighter">Order #{selectedOrder.id.slice(-6)}</h2>
              <button onClick={() => setSelectedOrder(null)} className="p-2 bg-zinc-900 rounded-full hover:bg-white hover:text-black transition"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {selectedOrder.items.map((item: any) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="relative w-14 h-16 bg-black rounded-lg border border-zinc-800 overflow-hidden">
                    <Image src={item.product.images[0]} alt="" fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase">{item.product.name}</p>
                    <p className="text-[9px] text-zinc-500 uppercase">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-mono text-xs">${Number(item.price).toFixed(2)}</p>
                </div>
              ))}
              <div className="p-6 bg-black rounded-2xl border border-zinc-900 mt-4 space-y-2">
                <div className="flex justify-between text-[10px] uppercase font-black text-zinc-500"><span>Status</span><span className="text-white">{selectedOrder.status}</span></div>
                <div className="flex justify-between text-[10px] uppercase font-black text-zinc-500"><span>Total</span><span className="text-xl text-white font-mono">${Number(selectedOrder.totalAmount).toFixed(2)}</span></div>
              </div>
            </div>
            <div className="p-6"><button onClick={() => setSelectedOrder(null)} className="w-full bg-zinc-900 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-zinc-800 transition">Back to List</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

function TabBtn({ active, onClick, label, icon }: any) {
  return (
    <button onClick={onClick} className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl transition-all ${active ? "bg-white text-black" : "text-zinc-600 hover:text-zinc-400"}`}>
      {icon} <span className="hidden md:block text-[10px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}
