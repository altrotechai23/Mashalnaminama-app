"use client"
import { useState } from "react";
import { updateProduct } from "@/lib/actions/admin";
import MultiImageUpload from "../MultiImageUpload"; // Your Cloudinary widget

export default function EditProductForm({ product }: { product: any }) {
  const [images, setImages] = useState<string[]>(product.images || []);

  async function handleSubmit(formData: FormData) {
    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      category: formData.get("category"),
      description: formData.get("description"),
      images: images,
      details: (formData.get("details") as string).split(","),
      sizes: (formData.get("sizes") as string).split(","),
    };

    await updateProduct(product.id, data);
    alert("Product Updated");
  }

  return (
    <form action={handleSubmit} className="max-w-2xl space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <input name="name" defaultValue={product.name} className="bg-zinc-900 p-3 border border-zinc-800" placeholder="Name" />
        <input name="price" defaultValue={product.price} className="bg-zinc-900 p-3 border border-zinc-800" placeholder="Price" />
        <input name="category" defaultValue={product.category} className="bg-zinc-900 p-3 border border-zinc-800" placeholder="Category" />
      </div>

      <MultiImageUpload 
        urls={images} 
        onUpload={(url) => setImages([...images, url])} 
      />

      <textarea name="description" defaultValue={product.description} className="w-full bg-zinc-900 p-3 border border-zinc-800 h-32" />
      
      <div className="grid grid-cols-2 gap-4 text-xs text-zinc-500">
        <input name="details" defaultValue={product.details.join(",")} placeholder="Details (comma separated)" className="bg-zinc-900 p-3" />
        <input name="sizes" defaultValue={product.sizes.join(",")} placeholder="Sizes (comma separated)" className="bg-zinc-900 p-3" />
      </div>

      <button className="w-full bg-white text-black py-4 font-bold hover:bg-zinc-200">
        SAVE CHANGES
      </button>
    </form>
  );
}
