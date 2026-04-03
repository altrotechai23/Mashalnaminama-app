"use server"
import { auth } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

export async function createOrder(cartItems: any[], total: number) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) throw new Error("User record not found");

  // Create order with PAID status initially as PENDING
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      totalAmount: total,
      status: "PENDING",
      items: {
        create: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity || 1,
          price: item.price,
        })),
      },
    },
  });

  return { 
    orderId: order.id, 
    userEmail: user.email, 
    userName: user.phoneNumber || "Customer" // Using phone or default since we need a string
  };
}
