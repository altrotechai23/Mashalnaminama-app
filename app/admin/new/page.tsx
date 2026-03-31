// app/admin/new/page.tsx
"use client"
import { useState } from "react";
import { createProduct } from "@/lib/actions/admin";
import MultiImageUpload from "@/components/MultiImageUpload";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const [images, setImages] = useState<string[]>([]);
  const router = useRouter();

  async function clientAction(formData: FormData) {
    const data = {
      name: formData.get("name") as string,
      price: Number(formData.get("price")),
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      images: images, // From Cloudinary state
      details: (formData.get("details") as string).split(",").map(d => d.trim()),
      sizes: (formData.get("sizes") as string).split(",").map(s => s.trim()),
    };

    await createProduct(data);
    router.push("/admin"); // Redirect to inventory after success
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
        <MultiImageUpload urls={images} onUpload={(url) => setImages([...images, url])} />
      </div>

      <select name="category" className="bg-zinc-900 p-4 border border-zinc-800 outline-none" required>
            <option value="">SELECT CATEGORY</option>
            <option value="tops">Tops</option>
            <option value="bottoms">Bottoms</option>
            <option value="sets">Sets</option>
            <option value="accessories">Accessories</option>
      </select>

       
      <textarea name="description" placeholder="DESCRIPTION" className="w-full bg-zinc-900 p-4 border border-zinc-800 h-40 outline-none" />

      <div className="grid grid-cols-2 gap-6">
        <input name="details" placeholder="DETAILS (CSV: 100% Cotton, Made in SA)" className="bg-zinc-900 p-4 border border-zinc-800 text-xs" />
        <input name="sizes" placeholder="SIZES (CSV: S, M, L, XL)" className="bg-zinc-900 p-4 border border-zinc-800 text-xs" />
      </div>

      <button type="submit" className="w-full bg-white text-black py-5 font-bold uppercase tracking-tighter hover:bg-zinc-300 transition">
        Publish to Store
      </button>
    </form>
  );
}
