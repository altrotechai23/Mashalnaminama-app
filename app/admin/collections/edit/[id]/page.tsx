import { prisma } from "@/lib/prisma";
import CollectionForm from "@/components/admin/CollectionForm";
import { notFound } from "next/navigation";

// app/admin/collections/edit/[id]/page.tsx

export default async function EditCollectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [collection, rawProducts] = await Promise.all([
    prisma.collection.findUnique({
      where: { id },
      include: { products: true }
    }),
    prisma.product.findMany()
  ]);

  if (!collection) return <div>Not found</div>;

  // CONVERT PRISMA OBJECTS TO PLAIN OBJECTS
  const allProducts = rawProducts.map(p => ({
    ...p,
    price: Number(p.price) // Convert Decimal to Number
  }));

  const serialisedCollection = {
    ...collection,
    products: collection.products.map(p => ({
      ...p,
      price: Number(p.price)
    }))
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Collection</h1>
      <CollectionForm 
        initialData={serialisedCollection} 
        allProducts={allProducts} 
      />
    </div>
  );
}

