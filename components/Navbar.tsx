"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Brand", href: "/brand" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { totalItems, setIsOpen } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // FIX: Track if component is mounted to prevent Hydration Mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  if (isHome) return null;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/40">
        <nav className="flex items-center justify-between px-4 sm:px-6 h-14 max-w-[1440px] mx-auto">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden flex flex-col justify-center gap-[5px] w-7 h-7 active:scale-90 transition-transform"
              aria-label="Open menu"
            >
              <span className="block w-5 h-[1.5px] bg-foreground" />
              <span className="block w-3.5 h-[1.5px] bg-foreground" />
            </button>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hidden lg:block fossil-nav-link transition-colors duration-200 ${
                  pathname === link.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-center leading-none">
            <span className="block text-[15px] sm:text-[17px] font-light tracking-[0.18em] uppercase text-foreground">Mashal</span>
            <span className="block text-[7px] sm:text-[8px] font-light tracking-[0.45em] uppercase text-muted-foreground">naminema</span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center min-w-[24px]">
              {/* THE FIX: Only render Clerk components after mounting */}
              {mounted && (
                <>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="fossil-nav-link text-foreground/80 hover:text-foreground transition-colors">
                        <User size={18} strokeWidth={1.5} />
                      </button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton 
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          avatarBox: "h-7 w-7"
                        }
                      }}
                    />
                  </SignedIn>
                </>
              )}
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="fossil-nav-link text-foreground flex items-center gap-1.5 active:scale-95 transition-transform"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className="tabular-nums text-[13px]">({totalItems})</span>
            </button>
          </div>
        </nav>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

const MobileDrawer = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const pathname = usePathname();

  return (
    <div
      className={`fixed inset-0 z-[100] transition-all duration-500 ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-foreground/20 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`absolute inset-y-0 left-0 w-full sm:w-[380px] bg-background flex flex-col transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
        style={{
          clipPath: open
            ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
            : "polygon(0 0, 0 0, 0 100%, 0 100%)",
          transition: "clip-path 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease",
        }}
      >
        <div className="flex items-center justify-between px-6 h-14">
          <button
            onClick={onClose}
            className="flex flex-col justify-center gap-0 w-7 h-7 active:scale-90 transition-transform"
            aria-label="Close menu"
          >
            <span
              className="block w-5 h-[1.5px] bg-foreground origin-center"
              style={{ transform: "rotate(45deg) translateY(0.75px)" }}
            />
            <span
              className="block w-5 h-[1.5px] bg-foreground origin-center"
              style={{ transform: "rotate(-45deg) translateY(-0.75px)" }}
            />
          </button>
        </div>

        <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="block overflow-hidden"
            >
              <span
                className={`block text-[clamp(2rem,10vw,3.5rem)] font-light tracking-[-0.03em] leading-[1.15] transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  pathname === link.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                } ${
                  open ? "translate-y-0 opacity-100" : "translate-y-[110%] opacity-0"
                }`}
                style={{
                  transitionDuration: "0.6s",
                  transitionDelay: open ? `${0.15 + i * 0.08}s` : "0s",
                }}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        <div
          className={`px-8 pb-10 transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{
            transitionDuration: "0.6s",
            transitionDelay: open ? "0.5s" : "0s",
          }}
        >
          <div className="border-t border-border pt-6 space-y-3">
            <p className="fossil-label text-muted-foreground">info@mashalnaminema.com</p>
            <p className="fossil-label text-muted-foreground">Cape Town, South Africa</p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="fossil-label text-foreground">Instagram</a>
              <a href="#" className="fossil-label text-foreground">TikTok</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
