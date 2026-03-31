// app/admin/edit/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import EditProductForm from "@/components/admin/EditProductForm";
import { notFound } from "next/navigation";

// Use Promise type for params in Next.js 15/16
export default async function EditPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // 1. Await the params to get the ID
  const { id } = await params;

  // 2. Fetch the product
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) notFound();

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-8 uppercase tracking-tighter">
        Editing: {product.name}
      </h1>
      <EditProductForm product={JSON.parse(JSON.stringify(product))} />
    </div>
  );
}
