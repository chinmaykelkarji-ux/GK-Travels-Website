import { MessageCircle, Phone } from "lucide-react";

const PHONE_HREF = "tel:+919876543210";
const WHATSAPP_NUMBER = "919876543210";

export function StickyMobileCta({
  tourTitle,
  enquireHref = "#enquire",
}: {
  tourTitle: string;
  enquireHref?: string;
}) {
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi! I'm interested in the "${tourTitle}" tour. Could you share more details?`
  )}`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-card shadow-[0_-4px_20px_rgba(22,38,61,0.08)] md:hidden">
      <a
        href={PHONE_HREF}
        className="flex flex-col items-center justify-center gap-1 py-3 text-xs font-medium text-foreground/80"
      >
        <Phone className="h-4 w-4" />
        Call
      </a>
      <a
        href={whatsappHref}
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
