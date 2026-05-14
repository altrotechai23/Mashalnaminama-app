// lib/actions/orders.ts
"use server"
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

interface CartItem {
  id: string;
  quantity: number;
  price: number;
}

export async function createOrder(cartItems: CartItem[], total: number) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("Unauthorized");

  const email = clerkUser.emailAddresses[0]?.emailAddress ?? "";
  const phone = clerkUser.phoneNumbers[0]?.phoneNumber ?? null;
  const address = null; // Clerk doesn't provide address

  const user = await prisma.user.upsert({
    where: { clerkId },
    update: {
      email,
      phoneNumber: phone,
    },
    create: {
      clerkId,
      email,
      phoneNumber: phone,
      address,
    },
  });

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      totalAmount: total,
      status: "PENDING",
      items: {
        create: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
  });

  return {
    orderId: order.id,
    userEmail: user.email,
    userName: clerkUser.firstName ?? "Customer",
  };
}

export async function updateOrderStatus(orderId: string, status: string) {
  await prisma.order.update({
    where: { id: orderId },
    data: { status: status.toUpperCase() },
  });
}