import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
// import { Providers } from "../components/providers/provider"; // [NEW IMPORT]
import "./globals.css";
import CartSidebar from "@/components/CartSidebar";
import Navbar from "@/components/Navbar";
import { Providers } from "./providers";
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Mashalnaminema — Contemporary Clothing",
  description: "Mashalnaminema is a contemporary clothing brand based in Cape Town, South Africa. True style emerges when you start doing the unusual.",
  authors: [{ name: "Mashalnaminema" }],
  openGraph: {
    type: "website",
    title: "Mashalnaminema — Contemporary Clothing",
    description: "Mashalnaminema is a contemporary clothing brand based in Cape Town, South Africa.",
    images: ["https://storage.googleapis.com/gpt-engineer-file-uploads/OvYvoXO5mjaxPPXQQ71YzJUr0XD3/social-images/social-1774109462915-0L0A9034.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mashalnaminema — Contemporary Clothing",
    description: "Mashalnaminema is a contemporary clothing brand based in Cape Town, South Africa.",
    images: ["https://storage.googleapis.com/gpt-engineer-file-uploads/OvYvoXO5mjaxPPXQQ71YzJUr0XD3/social-images/social-1774109462915-0L0A9034.webp"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
       <ClerkProvider>
      <html lang="en" className="selection:bg-black selection:text-white">
        <body className={`${dmSans.variable} font-sans antialiased bg-background text-foreground`}>
          {/* THE FIX: EVERYTHING MUST BE INSIDE PROVIDERS */}
          <Providers>
            <main className="relative min-h-screen flex flex-col">
              <Navbar />
              <CartSidebar />
              {children}
            </main>
            <Toaster position="top-center" expand={false} richColors />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
