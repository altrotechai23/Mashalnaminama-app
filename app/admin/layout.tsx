// app/admin/layout.tsx
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans">
      <nav className="border-b border-zinc-800 p-4 flex justify-between items-center sticky top-0 bg-black/80 backdrop-blur-md z-50">
        <Link href="/admin" className="font-bold tracking-tighter text-xl">MASHAL ADMIN</Link>
        <div className="flex gap-6 text-xs uppercase tracking-widest text-zinc-400">
          <Link href="/admin/collections" className="hover:text-white transition">Collections</Link>
          <Link href="/admin" className="hover:text-white transition">Inventory</Link>
          <Link href="/shop" className="hover:text-white transition">View Store</Link>
        </div>
      </nav>
      <main className="flex-1">{children}</main>
    </div>
  );
}
