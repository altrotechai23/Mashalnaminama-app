"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ProfileSchema = z.object({
  phoneNumber: z.string().min(8, "Invalid phone number"),
  address: z.string().min(5, "Address too short"),
});

export async function updateProfile(formData: FormData) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const data = {
    phoneNumber: formData.get("phoneNumber"),
    address: formData.get("address"),
  };

  const validated = ProfileSchema.parse(data);

  await prisma.user.update({
    where: { clerkId },
    data: validated,
  });

  revalidatePath("/dashboard");
  return { success: true };
}
