import { prisma } from "@/lib/prisma";
import CollectionForm from "@/components/admin/CollectionForm";

export default async function NewCollectionPage() {
  // Fetch all products so the user can select which ones to add to the new collection
  const allProducts = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
    },
    orderBy: {
      name: 'asc'
    }
  });

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create New Collection
        </h1>
        <p className="text-muted-foreground mt-2">
          Group your products together into a curated selection.
        </p>
      </div>

      {/* Pass the products to the form component */}
      <CollectionForm allProducts={allProducts} />
    </div>
  );
}
