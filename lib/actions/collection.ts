"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { Prisma } from "@prisma/client";

// lib/actions/collection.ts
export async function createCollection(data: { name: string; description?: string; productIds: string[] }) {
  const { productIds, ...rest } = data;
  await prisma.collection.create({
    data: {
      ...rest,
      products: { connect: productIds.map(id => ({ id })) }
    }
  });
  revalidatePath("/admin/collections");
}

export async function updateCollection(id: string, data: { name: string; description?: string; productIds: string[] }) {
  const { productIds, ...rest } = data;
  await prisma.collection.update({
    where: { id },
    data: {
      ...rest,
      products: { set: productIds.map(id => ({ id })) } // 'set' resets the list to the current selection
    }
  });
  revalidatePath("/admin/collections");
}


export async function deleteCollection(id: string) {
  try {
    await prisma.collection.delete({
      where: { id },
    });
    
    // Refresh the list page to show the updated data
    revalidatePath("/admin/collections");
  } catch (error) {
    console.error("Failed to delete collection:", error);
    throw new Error("Could not delete collection. Make sure it has no linked products.");
  }
}


// lib/actions/collection.ts
export async function updateCollectionProducts(collectionId: string, productIds: string[]) {
  await prisma.collection.update({
    where: { id: collectionId },
    data: {
      products: {
        // 'set' removes old connections and adds new ones in one go
        set: productIds.map(id => ({ id }))
      }
    }
  });
  revalidatePath("/admin/collections");
}
