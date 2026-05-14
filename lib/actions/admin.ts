// lib/actions/admin.ts
"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma, Size } from "@prisma/client";

interface ProductSizeInput {
  size: Size;
  stock: number;
}

interface ProductData {
  name: string;
  price: number;
  images: string[];
  category: string;
  description: string;
  details: string[];
  sizes: ProductSizeInput[];
}

interface UpdateProductData {
  name?: string;
  price?: number;
  images?: string[];
  category: string;
  description?: string;
  details?: string[];
  sizes?: ProductSizeInput[];
}

export async function createProduct(data: ProductData) {
  await prisma.product.create({
    data: {
      name: data.name,
      price: Number(data.price),
      images: data.images,
      category: data.category,
      description: data.description,
      details: data.details,
      sizes: {
        create: data.sizes.map(({ size, stock }) => ({ size, stock })),
      },
    },
  });
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/shop");
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: { id },
  });
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/shop");
}

export async function updateProduct(id: string, data: UpdateProductData) {
  if (!data.category) {
    throw new Error("Category is required");
  }

  const { sizes, ...rest } = data;

  await prisma.product.update({
    where: { id },
    data: {
      ...rest,
      price: new Prisma.Decimal(rest.price ?? 0),
      ...(sizes && {
        sizes: {
          deleteMany: {},
          create: sizes.map(({ size, stock }) => ({ size, stock })),
        },
      }),
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
    data: { collectionId },
  });
}