import { MessageCircle, Phone } from "lucide-react";
import { buildWhatsAppUrl, TEL_HREF } from "@/lib/site";

export function StickyMobileCta({
  tourTitle,
  enquireHref = "#enquire",
}: {
  tourTitle: string;
  enquireHref?: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-card shadow-[0_-4px_20px_rgba(22,38,61,0.08)] md:hidden">
      <a
        href={TEL_HREF}
        className="flex flex-col items-center justify-center gap-1 py-3 text-xs font-medium text-foreground/80"
      >
        <Phone className="h-4 w-4" />
        Call
      </a>
      <a
        href={buildWhatsAppUrl(tourTitle)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-1 border-x border-border py-3 text-xs font-medium text-[#25D366]"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>
      <a
        href={enquireHref}
        className="flex flex-col items-center justify-center gap-1 bg-gold py-3 text-xs font-semibold text-primary"
      >
        Enquire Now
      </a>
    </div>
  );
}
