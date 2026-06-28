export const SITE_URL = "https://www.gktravel.in";
export const SITE_NAME = "GK Travel";

// Single source of truth for every contact detail on the site.
// Change a value here and it propagates everywhere — never hardcode
// phone numbers, WhatsApp links, or email addresses anywhere else.
export const COMPANY_NAME = "GK Travels";
export const PHONE_DISPLAY = "+91 9916908249";
export const PHONE_E164 = "+919916908249"; // for tel: links
export const WHATSAPP_NUMBER = "919916908249"; // wa.me expects no "+" or spaces
export const EMAIL = "gktravels8249@gmail.com";

export const TEL_HREF = `tel:${PHONE_E164}`;
export const MAILTO_BASE = `mailto:${EMAIL}`;

export function buildWhatsAppMessage(tourName?: string): string {
  if (tourName) {
    return [
      `Hello ${COMPANY_NAME},`,
      "",
      `I am interested in the *${tourName}* package.`,
      "",
      "Please share the complete details including itinerary, pricing, available dates, inclusions, and booking process.",
      "",
      "Thank you.",
    ].join("\n");
  }
  return [
    `Hello ${COMPANY_NAME},`,
    "",
    "I'd like to know more about your tour packages.",
    "",
    "Thank you.",
  ].join("\n");
}

export function buildWhatsAppUrl(tourName?: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(tourName))}`;
}

export interface MailtoEnquiryFields {
  name?: string;
  phone?: string;
  tourName?: string;
  travelDate?: string;
  travelers?: string;
  message?: string;
}

export function buildMailtoUrl(fields: MailtoEnquiryFields = {}): string {
  const subject = "Tour Enquiry - GK Travels";
  const body = [
    `Name: ${fields.name ?? ""}`,
    `Phone: ${fields.phone ?? ""}`,
    `Tour Name: ${fields.tourName ?? ""}`,
    `Preferred Travel Date: ${fields.travelDate ?? ""}`,
    `Number of Travellers: ${fields.travelers ?? ""}`,
    `Message: ${fields.message ?? ""}`,
  ].join("\n");
  return `${MAILTO_BASE}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
