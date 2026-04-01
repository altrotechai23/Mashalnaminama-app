import Link from "next/link";

const Footer = () => (
  <footer className="border-t border-border px-4 sm:px-6 py-10 sm:py-12 mt-16 sm:mt-24 bg-background">
    <div className="max-w-[1400px] mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {/* Brand Column */}
      <div className="col-span-2 sm:col-span-2 md:col-span-1">
        <div className="mb-3">
          <span className="block text-[20px] font-light tracking-[0.2em] uppercase text-foreground leading-none">
            Mashal
          </span>
          <span className="block text-[8px] font-light tracking-[0.45em] uppercase text-muted-foreground mt-0.5">
            naminema
          </span>
        </div>
        <p className="fossil-body text-muted-foreground mt-3 max-w-[240px] text-[13px] sm:text-[15px]">
          Contemporary clothing for those who dare to do the unusual.
        </p>
      </div>

      {/* Shop Column */}
      <div>
        <span className="fossil-label text-muted-foreground">(Shop)</span>
        <div className="flex flex-col gap-2 mt-3">
          <Link href="/shop" className="fossil-nav-link text-foreground text-[13px] sm:text-[14px]">
            All Products
          </Link>
          <Link href="/shop" className="fossil-nav-link text-foreground text-[13px] sm:text-[14px]">
            New Arrivals
          </Link>
          <Link href="/shop" className="fossil-nav-link text-foreground text-[13px] sm:text-[14px]">
            Tops
          </Link>
          <Link href="/shop" className="fossil-nav-link text-foreground text-[13px] sm:text-[14px]">
            Bottoms
          </Link>
        </div>
      </div>

      {/* Company Column */}
      <div>
        <span className="fossil-label text-muted-foreground">(Company)</span>
        <div className="flex flex-col gap-2 mt-3">
          <Link href="/brand" className="fossil-nav-link text-foreground text-[13px] sm:text-[14px]">
            Our Brand
          </Link>
          <Link href="/collections" className="fossil-nav-link text-foreground text-[13px] sm:text-[14px]">
            Journal
          </Link>
          <Link href="/contact" className="fossil-nav-link text-foreground text-[13px] sm:text-[14px]">
            Contact
          </Link>
        </div>
      </div>

      {/* Connect Column */}
      <div className="col-span-2 sm:col-span-1">
        <span className="fossil-label text-muted-foreground">(Connect)</span>
        <div className="flex sm:flex-col gap-4 sm:gap-2 mt-3">
          <a href="https://www.instagram.com/mashalnaminema?igsh=MWN1dHFodmtjbm4yNA==" target="_blank" rel="noopener noreferrer" className="fossil-nav-link text-foreground text-[13px] sm:text-[14px]">
            Instagram
          </a>
          <a href="https://youtube.com/@mashalnaminema?si=AG69vlan9-7efc8I" target="_blank" rel="noopener noreferrer" className="fossil-nav-link text-foreground text-[13px] sm:text-[14px]">
            Youtube
          </a>
          <a href="https://www.tiktok.com/@mashalnaminema?_r=1&_t=ZS-95BQJesaCO7" target="_blank" rel="noopener noreferrer" className="fossil-nav-link text-foreground text-[13px] sm:text-[14px]">
            TikTok
          </a>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="max-w-[1400px] mx-auto mt-8 sm:mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
      <span className="text-[11px] sm:text-[12px] text-muted-foreground">
        © 2026 Mashalnaminema. All rights reserved.
      </span>
      <span className="text-[11px] sm:text-[12px] text-muted-foreground">
        Cape Town, South Africa
      </span>
    </div>
  </footer>
);

export default Footer;
