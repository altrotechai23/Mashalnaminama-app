import { prisma } from "@/lib/prisma";
import { checkRole } from "@/lib/roles";
import { redirect } from "next/navigation";
import Link from "next/link";

const STATUS_STYLES: Record<string, string> = {
  PENDING:    "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  PAID:       "bg-green-500/10 text-green-400 border-green-500/20",
  SHIPPED:    "bg-blue-500/10 text-blue-400 border-blue-500/20",
  DELIVERED:  "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  CANCELLED:  "bg-red-500/10 text-red-400 border-red-500/20",
};

export default async function AdminOrdersPage() {
  const isAdmin = await checkRole("admin");
  if (!isAdmin) redirect("/dashboard");

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold uppercase italic">Orders</h1>
          <p className="text-zinc-500 text-sm">{orders.length} Total Orders</p>
        </div>
        <Link href="/admin" className="text-xs text-zinc-500 uppercase tracking-widest hover:text-white transition">
          ← Back to Inventory
        </Link>
      </div>

      {orders.length === 0 && (
        <p className="text-zinc-600 uppercase text-xs tracking-widest text-center py-20">No orders yet</p>
      )}

      {/* Mobile */}
      <div className="flex flex-col gap-4 md:hidden">
        {orders.map(order => (
          <div key={order.id} className="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase text-white">{order.user.email}</p>
                <p className="text-[10px] text-zinc-500 mt-1">{new Date(order.createdAt).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })}</p>
              </div>
              <span className={`text-[10px] font-bold uppercase px-2 py-1 border ${STATUS_STYLES[order.status] ?? "bg-zinc-800 text-zinc-400"}`}>
                {order.status}
              </span>
            </div>
            <div className="space-y-1">
              {order.items.map(item => (
                <div key={item.id} className="flex justify-between text-[10px] text-zinc-500">
                  <span>{item.product.name} × {item.quantity}</span>
                  <span>R{(Number(item.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-2 border-t border-zinc-800">
              <span className="text-[10px] uppercase text-zinc-600 font-bold">Total</span>
              <span className="font-mono text-sm text-white">R{Number(order.totalAmount).toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop */}
      <table className="hidden md:table w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="text-zinc-500 text-[10px] uppercase tracking-[0.2em]">
            <th className="pb-4 pl-4">Order ID</th>
            <th className="pb-4">Customer</th>
            <th className="pb-4">Items</th>
            <th className="pb-4">Total</th>
            <th className="pb-4">Date</th>
            <th className="pb-4 text-right pr-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="bg-zinc-900 hover:bg-zinc-800 transition duration-200">
              <td className="py-4 pl-4 font-mono text-[10px] text-zinc-500">
                #{order.id.slice(-8).toUpperCase()}
              </td>
              <td className="text-xs text-zinc-300">
                <p>{order.user.email}</p>
                {order.user.phoneNumber && (
                  <p className="text-zinc-600 text-[10px]">{order.user.phoneNumber}</p>
                )}
              </td>
              <td className="text-xs text-zinc-400 max-w-200">
                {order.items.map(item => (
                  <div key={item.id} className="text-[10px] text-zinc-500">
                    {item.product.name} × {item.quantity}
                  </div>
                ))}
              </td>
              <td className="font-mono text-sm text-white">
                R{Number(order.totalAmount).toFixed(2)}
              </td>
              <td className="text-[10px] text-zinc-500">
                {new Date(order.createdAt).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })}
              </td>
              <td className="text-right pr-4">
                <span className={`text-[10px] font-bold uppercase px-3 py-1 border ${STATUS_STYLES[order.status] ?? "bg-zinc-800 text-zinc-400"}`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}