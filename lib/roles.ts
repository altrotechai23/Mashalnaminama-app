import { auth } from "@clerk/nextjs/server";

export async function checkRole(role: "admin" | "user") {
  const { sessionClaims } = await auth();
  return sessionClaims?.metadata.role === role;
}
