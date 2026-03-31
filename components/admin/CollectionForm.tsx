"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createCollection, updateCollection } from "@/lib/actions/collection";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  productIds: z.array(z.string()).default([]), // Array to hold linked product IDs
});

interface Props {
  initialData?: any;
  allProducts: any[]; // Pass all available products from the page
}

export default function CollectionForm({ initialData, allProducts }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Extract existing product IDs if we are editing
  const existingIds = initialData?.products?.map((p: any) => p.id) || [];

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      productIds: existingIds,
    }
  });

  const selectedProductIds = watch("productIds");

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setLoading(true);
    try {
      if (initialData) {
        await updateCollection(initialData.id, data);
      } else {
        await createCollection(data);
      }
      router.push("/admin/collections");
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleProduct = (id: string) => {
    const current = selectedProductIds;
    const next = current.includes(id) 
      ? current.filter((i: string) => i !== id) 
      : [...current, id];
    setValue("productIds", next); // Manually update the hook-form state
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl bg-transparent p-6 rounded-lg border">
      <div>
        <label className="block text-sm font-medium mb-1">Collection Name</label>
        <input {...register("name")} placeholder="e.g. Summer Essentials" className="border p-2 w-full rounded" />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message as string}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea {...register("description")} placeholder="Describe this collection..." className="border p-2 w-full rounded h-24" />
      </div>

      {/* Multi-Select Product Section */}
      <div>
        <label className="block text-sm font-medium mb-2">Select Products ({selectedProductIds.length})</label>
        <div className="border rounded-md overflow-hidden bg-transparent">
          <div className="max-h-64 overflow-y-auto divide-y divide-gray-200">
            {allProducts.map((product) => (
              <div 
                key={product.id} 
                onClick={() => toggleProduct(product.id)}
                className={`p-3 flex items-center gap-3 cursor-pointer transition-colors ${
                  selectedProductIds.includes(product.id) ? "bg-black/50" : "hover:bg-black/50"
                }`}
              >
                <input 
                  type="checkbox" 
                  checked={selectedProductIds.includes(product.id)} 
                  readOnly 
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{product.name}</span>
                  <span className="text-xs text-muted-foreground">R {Number(product.price).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-black text-white px-4 py-3 rounded-md font-medium hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Saving..." : initialData ? "Update Collection" : "Create Collection"}
      </button>
    </form>
  );
}
