// app/admin/new/page.tsx
"use client"
import { useState } from "react";
import { createProduct } from "@/lib/actions/admin";
import MultiImageUpload from "@/components/MultiImageUpload";
import { useRouter } from "next/navigation";
import { Size } from "@prisma/client";

const AVAILABLE_SIZES = Object.values(Size);

interface SizeEntry {
  size: Size;
  stock: number;
}

export default function NewProductPage() {
  const [images, setImages] = useState<string[]>([]);
  const [sizes, setSizes] = useState<SizeEntry[]>([]);
  const router = useRouter();

  function toggleSize(size: Size) {
    setSizes(prev =>
      prev.find(s => s.size === size)
        ? prev.filter(s => s.size !== size)
        : [...prev, { size, stock: 0 }]
    );
  }

  function updateStock(size: Size, stock: number) {
    setSizes(prev => prev.map(s => s.size === size ? { ...s, stock } : s));
  }

  async function clientAction(formData: FormData) {
    const data = {
      name: formData.get("name") as string,
      price: Number(formData.get("price")),
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      images,
      details: (formData.get("details") as string).split(",").map(d => d.trim()),
      sizes,
    };

    await createProduct(data);
    router.push("/admin");
  }

  return (
    <form action={clientAction} className="max-w-3xl mx-auto p-10 space-y-8 bg-black text-white">
      <h1 className="text-4xl font-bold italic uppercase">New Drop</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input name="name" placeholder="PRODUCT NAME" className="bg-zinc-900 p-4 border border-zinc-800 focus:border-white outline-none" required />
        <input name="price" type="number" step="0.01" placeholder="PRICE ($)" className="bg-zinc-900 p-4 border border-zinc-800 focus:border-white outline-none" required />
      </div>

      <div className="border border-zinc-800 p-6 bg-zinc-950">
        <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-4 block">Visuals (Cloudinary)</label>
        <MultiImageUpload urls={images} onUpload={(url) => setImages(prev => [...prev, url])} />
      </div>

      <select name="category" className="bg-zinc-900 p-4 border border-zinc-800 outline-none w-full" required>
        <option value="">SELECT CATEGORY</option>
        <option value="tops">Tops</option>
        <option value="bottoms">Bottoms</option>
        <option value="sets">Sets</option>
        <option value="accessories">Accessories</option>
      </select>

      <textarea name="description" placeholder="DESCRIPTION" className="w-full bg-zinc-900 p-4 border border-zinc-800 h-40 outline-none" />

      <input name="details" placeholder="DETAILS (CSV: 100% Cotton, Made in SA)" className="w-full bg-zinc-900 p-4 border border-zinc-800 text-xs" />

      <div className="border border-zinc-800 p-6 bg-zinc-950 space-y-4">
        <label className="text-[10px] uppercase tracking-widest text-zinc-500 block">Sizes & Stock</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {AVAILABLE_SIZES.map(size => {
            const entry = sizes.find(s => s.size === size);
            const selected = !!entry;
            return (
              <div key={size} className={`border p-3 space-y-2 transition-all ${selected ? "border-white" : "border-zinc-800"}`}>
                <button
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`w-full text-xs font-bold uppercase py-1 transition-all ${selected ? "text-white" : "text-zinc-600"}`}
                >
                  {size}
                </button>
                {selected && (
                  <input
                    type="number"
                    min={0}
                    placeholder="Stock"
                    value={entry.stock}
                    onChange={e => updateStock(size, Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-700 p-2 text-xs text-center outline-none"
                  />
                )}
              </div>
            );
          })}
        </div>
        {sizes.length === 0 && (
          <p className="text-[10px] text-zinc-600 uppercase tracking-widest">No sizes selected</p>
        )}
      </div>

      <button type="submit" className="w-full bg-white text-black py-5 font-bold uppercase tracking-tighter hover:bg-zinc-300 transition">
        Publish to Store
      </button>
    </form>
  );
}