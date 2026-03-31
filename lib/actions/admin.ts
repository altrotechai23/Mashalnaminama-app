// lib/actions/admin.ts
"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";


export async function createProduct(data: {
  name: string;
  price: number;
  images: string[];
  category: string;
  description: string;
  details: string[];
  sizes: string[];
}) {
  await prisma.product.create({
    data: {
      ...data,
      price: Number(data.price),
    }
  });
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/shop");
}


export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: { id }
  });
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/shop");
}



export async function updateProduct(id: string, data: any) {
  if (!data.category) {
    throw new Error("Category is required");
  }
  await prisma.product.update({
    where: { id },
    data: {
      ...data,
      price: new Prisma.Decimal(data.price),
    },
  });
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/product/${id}`);
  revalidatePath("/shop");
}

export async function updateProductCollection(productId: string, collectionId: string) {
  await prisma.product.update({
    where: { id: productId },
    data: { collectionId }
  });
}
