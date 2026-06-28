import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { PHONE_DISPLAY, EMAIL, MAILTO_BASE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How GK Travel collects, uses and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        image="https://picsum.photos/seed/gk-privacy-hero/1920/1080"
        breadcrumb={[{ label: "Privacy Policy" }]}
      />

      <section className="section-y">
        <div className="container-gk mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-foreground/85 md:text-base">
          <p className="text-muted-foreground">Last updated: January 2026</p>

          <div>
            <h2 className="font-display text-xl font-medium md:text-2xl">1. Information We Collect</h2>
            <p className="mt-3">
              When you enquire about a tour, submit a custom trip request, or
              contact us, we collect information such as your name, phone
              number, email address, travel dates, number of travellers and
              any preferences you share with us. This information is used
              solely to plan and manage your travel arrangements.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-medium md:text-2xl">2. How We Use Your Information</h2>
            <p className="mt-3">
              We use the information you provide to respond to enquiries,
              prepare itineraries and quotations, process bookings, and
              communicate updates related to your trip via phone, SMS, email
              or WhatsApp. We do not sell or rent your personal information
              to third parties.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-medium md:text-2xl">3. Sharing With Travel Partners</h2>
            <p className="mt-3">
              To fulfil your booking, relevant details may be shared with
              hotels, transport providers, guides and other travel partners
              involved in your itinerary. These partners are required to
              handle your information responsibly.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-medium md:text-2xl">4. Cookies &amp; Website Data</h2>
            <p className="mt-3">
              Our website may use cookies and similar technologies to improve
              browsing experience and understand how visitors use our site.
              You can disable cookies through your browser settings.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-medium md:text-2xl">5. Data Security</h2>
            <p className="mt-3">
              We take reasonable measures to protect your personal information
              from unauthorised access, alteration or disclosure.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-medium md:text-2xl">6. Contact Us</h2>
            <p className="mt-3">
              If you have any questions about this Privacy Policy or how your
              information is handled, please contact us at{" "}
              <a href={MAILTO_BASE} className="text-primary underline-offset-4 hover:underline">
                {EMAIL}
              </a>{" "}
              or {PHONE_DISPLAY}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
