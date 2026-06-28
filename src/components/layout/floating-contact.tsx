"use client";

import { usePathname } from "next/navigation";
import { MessageCircle, Phone } from "lucide-react";
import { buildWhatsAppUrl, TEL_HREF } from "@/lib/site";
import { cn } from "@/lib/utils";

// Tour detail pages already render their own bottom CTA bar (Call /
// WhatsApp / Enquire) on mobile, so we hide the global floating cluster
// there on small screens to avoid overlapping it. It still shows on
// desktop/tablet (md+) everywhere, and on mobile for every other page.
function isTourDetailPath(pathname: string) {
  return /^\/tours\/(?!category(\/|$))[^/]+\/?$/.test(pathname);
}

export function FloatingContact() {
  const pathname = usePathname();
  const hideOnMobile = isTourDetailPath(pathname);

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3",
        hideOnMobile && "hidden md:flex"
      )}
    >
      <a
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      >
        <MessageCircle className="h-7 w-7" fill="currentColor" />
      </a>
      <a
        href={TEL_HREF}
        aria-label="Call GK Travels"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
      >
        <Phone className="h-5 w-5" />
      </a>
    </div>
  );
}
