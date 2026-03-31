"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function completeUserOnboarding(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const address = formData.get("address") as string;
  const phoneNumber = formData.get("phone") as string;
  const email = formData.get("email") as string;

  await prisma.user.upsert({
    where: { clerkId: userId },
    update: { address, phoneNumber },
    create: {
      clerkId: userId,
      email: email,
      address,
      phoneNumber,
    },
  });

  revalidatePath("/checkout");
}
