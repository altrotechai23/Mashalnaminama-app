import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);

// ... public route matcher stays the same ...

export function proxy(req: NextRequest, evt: any) {
  return clerkMiddleware(async (auth, request) => {
    const { sessionClaims } = await auth();

    // TypeScript now knows 'role' exists because of the globals.d.ts file
    const role = sessionClaims?.metadata?.role;

    if (isAdminRoute(request)) {
      await auth.protect();
      if (role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }

    if (isDashboardRoute(request)) {
      await auth.protect();
      if (role === "admin") {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    }

    return NextResponse.next();
  })(req, evt);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
