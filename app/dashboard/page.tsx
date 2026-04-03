import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardClient from "./dashboard-client";


export default async function DashboardPage() {
  const { userId: clerkId } = await auth();
  if (!clerkId) redirect("/sign-in");

  let user = await prisma.user.findUnique({
    where: { clerkId },
    include: { 
      orders: { 
        include: { items: { include: { product: true } } },
        orderBy: { createdAt: 'desc' } 
      } 
    }
  });

  if (!user) {
    const clerkUser = await currentUser();
    if (!clerkUser) redirect("/sign-in");

    user = await prisma.user.create({
      data: {
        clerkId,
        email: clerkUser.emailAddresses[0].emailAddress,
      },
      include: { orders: { include: { items: { include: { product: true } } } } }
    });
  }

  // Pass sanitized user data to the client component
  return <DashboardClient user={JSON.parse(JSON.stringify(user))} />;
}
