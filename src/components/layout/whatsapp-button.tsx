import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "919876543210";

export function WhatsAppButton({
  message = "Hi! I'd like to know more about your tour packages.",
}: {
  message?: string;
}) {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 md:flex"
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" />
    </a>
  );
}
