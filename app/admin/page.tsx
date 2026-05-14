// app/admin/page.tsx
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { deleteProduct } from "@/lib/actions/admin";
import { checkRole } from "@/lib/roles";
import { redirect } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

export default async function AdminDashboard() {
  const isAdmin = await checkRole("admin");
  
  if (!isAdmin) {
    redirect("/dashboard");
  }

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { sizes: true },
  });

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
      <div>
        <h1 className="text-3xl font-bold uppercase italic">Inventory</h1>
        <p className="text-zinc-500 text-sm">{products.length} Products Live</p>
      </div>
      <div className="flex gap-3 w-full md:w-auto">
        <SignOutButton>
          <button className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-zinc-400 px-4 py-3 font-bold text-xs uppercase hover:border-red-500 hover:text-red-500 transition duration-300">
            <LogOut size={14} /> Logout
          </button>
        </SignOutButton>
        <Link href="/admin/orders" className="w-full md:w-auto bg-zinc-800 text-white px-8 py-3 font-bold text-center hover:bg-zinc-700 transition duration-300 text-xs uppercase">
          Orders
        </Link>
        <Link href="/admin/new" className="w-full md:w-auto bg-white text-black px-8 py-3 font-bold text-center hover:invert transition duration-300 text-xs uppercase">
          Add New Drop
        </Link>
      </div>
    </div>

      {/* Mobile */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {products.map(p => {
          const totalStock = p.sizes.reduce((acc, s) => acc + s.stock, 0);
          return (
            <div key={p.id} className="bg-zinc-900 p-4 flex gap-4 border border-zinc-800">
              <div className="relative w-20 h-24 bg-black">
                <Image src={p.images[0]} alt="" fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-bold text-sm uppercase">{p.name}</h3>
                  <p className="text-zinc-500 text-xs">R{Number(p.price)}</p>
                  <p className="text-zinc-600 text-xs mt-1">
                    Stock: <span className={totalStock === 0 ? "text-red-500" : "text-green-500"}>{totalStock}</span>
                  </p>
                </div>
                <div className="flex gap-4 text-xs font-bold uppercase underline">
                  <Link href={`/admin/edit/${p.id}`}>Edit</Link>
                  <form action={async () => { "use server"; await deleteProduct(p.id); }}>
                    <button className="text-red-500">Delete</button>
                  </form>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop */}
      <table className="hidden md:table w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="text-zinc-500 text-[10px] uppercase tracking-[0.2em]">
            <th className="pb-4 pl-4">Product</th>
            <th className="pb-4">Category</th>
            <th className="pb-4">Stock</th>
            <th className="pb-4">Price</th>
            <th className="pb-4 text-right pr-4">Management</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => {
            const totalStock = p.sizes.reduce((acc, s) => acc + s.stock, 0);
            return (
              <tr key={p.id} className="bg-zinc-900 group hover:bg-zinc-800 transition duration-200">
                <td className="py-3 pl-4 flex items-center gap-4">
                  <Image src={p.images[0]} alt="" width={40} height={50} className="object-cover bg-black" />
                  <span className="font-medium uppercase text-sm">{p.name}</span>
                </td>
                <td className="text-zinc-400 text-xs uppercase">{p.category}</td>
                <td className="text-xs">
                  <span className={totalStock === 0 ? "text-red-500" : "text-green-400"}>
                    {totalStock} units
                  </span>
                  <span className="text-zinc-600 ml-2 text-[10px]">
                    ({p.sizes.map(s => `${s.size}:${s.stock}`).join(" · ")})
                  </span>
                </td>
                <td className="font-mono text-sm">R{Number(p.price)}</td>
                <td className="text-right pr-4">
                  <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition">
                    <Link href={`/admin/edit/${p.id}`} className="bg-zinc-700 px-3 py-1 text-[10px] uppercase font-bold hover:bg-white hover:text-black">Edit</Link>
                    <form action={async () => { "use server"; await deleteProduct(p.id); }}>
                      <button className="bg-red-900/20 text-red-500 px-3 py-1 text-[10px] uppercase font-bold hover:bg-red-600 hover:text-white">Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}