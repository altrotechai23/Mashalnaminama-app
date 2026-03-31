import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { deleteProduct } from "@/lib/actions/admin";
import Link from "next/link";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-4 md:p-8 bg-black min-h-screen text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold uppercase tracking-tighter">Inventory</h1>
        <Link href="/admin/new" className="bg-white text-black px-4 py-2 text-sm font-bold hover:bg-zinc-200">
          + ADD PRODUCT
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-zinc-800 text-sm">
          <thead>
            <tr className="bg-zinc-900 text-zinc-400 uppercase text-[10px] tracking-widest">
              <th className="p-4 text-left border border-zinc-800">Product</th>
              <th className="p-4 text-left border border-zinc-800 hidden md:table-cell">Category</th>
              <th className="p-4 text-left border border-zinc-800">Price</th>
              <th className="p-4 text-right border border-zinc-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border border-zinc-800 hover:bg-zinc-950 transition">
                <td className="p-4 flex items-center gap-3">
                  <div className="relative w-10 h-12 bg-zinc-900">
                    <Image 
                      src={product.images[0] || '/placeholder.png'} 
                      alt="" fill className="object-cover" 
                    />
                  </div>
                  <span className="font-medium uppercase truncate max-w-[150px]">{product.name}</span>
                </td>
                <td className="p-4 border border-zinc-800 hidden md:table-cell text-zinc-500 capitalize">
                  {product.category}
                </td>
                <td className="p-4 border border-zinc-800">
                  ${product.price.toString()}
                </td>
                <td className="p-4 border border-zinc-800 text-right">
                  <div className="flex justify-end gap-4">
                    <Link href={`/admin/edit/${product.id}`} className="text-zinc-400 hover:text-white underline">Edit</Link>
                    <form action={async () => {
                      "use server"
                      await deleteProduct(product.id)
                    }}>
                      <button className="text-red-500 hover:text-red-400 underline">Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
