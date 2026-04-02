import { Suspense } from 'react';
import { notFound } from 'next/navigation';
 // Your Prisma client instance
import ProductGallery from './ProductGallery';
import AddToCartButton from './AddToCartButton';
import { prisma } from '@/lib/prisma';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  // 1. Unwrap the dynamic route ID
  const { id } = await params;

  // 2. Fetch real data from the database
  const product = await prisma.product.findUnique({
    where: { id },
    // Ensure you select the 'images' array field defined in your schema
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      images: true, // Assuming this is a String[] or JSON column
    }
  });

  // 3. Handle missing data immediately
  if (!product) return notFound();

  return (
    <main className="min-h-screen bg-white p-4 md:p-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 pt-16">
        
        {/* Gallery with Real Images */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} name={product.name} />
        </div>

        {/* Info Column */}
        <div className="lg:col-span-5 flex flex-col gap-8 sticky top-12 h-fit">
          <section className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Premium Selection</p>
              <h1 className="text-4xl font-bold tracking-tight text-zinc-900">{product.name}</h1>
            </div>
            
            <p className="text-2xl font-medium text-zinc-800">${product.price.toString()}</p>
            
            <div className="pt-4 border-t border-zinc-100">
              <h3 className="text-sm font-semibold uppercase mb-2">Details</h3>
              <p className="text-zinc-600 leading-relaxed">{product.description}</p>
            </div>
          </section>

          <AddToCartButton productId={product.id} name={product.name} price={Number(product.price)} image={product.images[0]} />

          <p className="text-[10px] text-zinc-400 uppercase tracking-tighter">Ref: {product.id}</p>
        </div>
      </div>
    </main>
  );
}
