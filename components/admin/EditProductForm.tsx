"use client";
import { useState } from "react";
import { updateProduct } from "@/lib/actions/admin";
import MultiImageUpload from "../MultiImageUpload";
import { Size } from "@prisma/client";
import { useRouter } from "next/navigation";

const AVAILABLE_SIZES = Object.values(Size);

interface SizeEntry {
  size: Size;
  stock: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  details: string[];
  images: string[];
  sizes: SizeEntry[];
}

export default function EditProductForm({ product }: { product: Product }) {
  const router = useRouter();
  const [images, setImages] = useState<string[]>(product.images || []);
  const [sizes, setSizes] = useState<SizeEntry[]>(
    product.sizes.map(s => ({ size: s.size, stock: s.stock }))
  );

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

  async function handleSubmit(formData: FormData) {
    await updateProduct(product.id, {
      name: formData.get("name") as string,
      price: Number(formData.get("price")),
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      images,
      details: (formData.get("details") as string).split(",").map(d => d.trim()),
      sizes,
    });
    router.push("/admin");
  }

  return (
    <form action={handleSubmit} className="max-w-2xl space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <input name="name" defaultValue={product.name} className="bg-zinc-900 p-3 border border-zinc-800 outline-none" placeholder="Name" required />
        <input name="price" type="number" step="0.01" defaultValue={Number(product.price)} className="bg-zinc-900 p-3 border border-zinc-800 outline-none" placeholder="Price" required />
      </div>

      <select name="category" defaultValue={product.category} className="w-full bg-zinc-900 p-3 border border-zinc-800 outline-none" required>
        <option value="">SELECT CATEGORY</option>
        <option value="tops">Tops</option>
        <option value="bottoms">Bottoms</option>
        <option value="sets">Sets</option>
        <option value="accessories">Accessories</option>
      </select>

      <div className="border border-zinc-800 p-6 bg-zinc-950">
        <label className="text-[10px] uppercase tracking-widest text-zinc-500 mb-4 block">Visuals</label>
        <MultiImageUpload
          urls={images}
          onUpload={(url) => setImages(prev => [...prev, url])}
        />
      </div>

      <textarea name="description" defaultValue={product.description} className="w-full bg-zinc-900 p-3 border border-zinc-800 h-32 outline-none" placeholder="Description" />

      <input name="details" defaultValue={product.details.join(", ")} placeholder="Details (CSV: 100% Cotton, Made in SA)" className="w-full bg-zinc-900 p-3 border border-zinc-800 text-xs outline-none" />

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

      <button type="submit" className="w-full bg-white text-black py-4 font-bold uppercase hover:bg-zinc-200 transition">
        Save Changes
      </button>
    </form>
  );
}