import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for booking and travelling with GK Travel.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        image="https://picsum.photos/seed/gk-terms-hero/1920/1080"
        breadcrumb={[{ label: "Terms & Conditions" }]}
      />

      <section className="section-y">
        <div className="container-gk mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-foreground/85 md:text-base">
          <p className="text-muted-foreground">Last updated: January 2026</p>

          <div>
            <h2 className="font-display text-xl font-medium md:text-2xl">1. Booking &amp; Confirmation</h2>
            <p className="mt-3">
              A booking is confirmed only upon receipt of the applicable
              advance payment and written confirmation from GK Travel.
              Itineraries, prices and availability are subject to change until
              confirmation.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-medium md:text-2xl">2. Pricing</h2>
            <p className="mt-3">
              Package prices are based on prevailing rates at the time of
              quotation and are subject to change due to fluctuations in
              hotel rates, airfares, exchange rates, fuel surcharges or
              government taxes, unless the full payment has been received.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-medium md:text-2xl">3. Traveller Responsibilities</h2>
            <p className="mt-3">
              Travellers are responsible for ensuring they hold valid travel
              documents, including passports, visas and any required
              vaccinations or permits, for both domestic and international
              travel. GK Travel may assist with documentation but is not
              liable for delays caused by incomplete or incorrect traveller
              information.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-medium md:text-2xl">4. Itinerary Changes</h2>
            <p className="mt-3">
              While every effort is made to operate itineraries as planned,
              GK Travel reserves the right to modify routes, accommodations or
              activities due to weather, local conditions, government
              regulations or circumstances beyond our control, while
              maintaining the overall value of the package.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-medium md:text-2xl">5. Liability</h2>
            <p className="mt-3">
              GK Travel acts as an agent for hotels, transport providers and
              other third-party service providers. We are not liable for any
              loss, injury, damage or delay caused by such third parties,
              natural events, or circumstances beyond our reasonable control.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-medium md:text-2xl">6. Governing Law</h2>
            <p className="mt-3">
              These terms are governed by the laws of India, and any disputes
              shall be subject to the jurisdiction of the courts in Lucknow,
              Uttar Pradesh.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-medium md:text-2xl">7. Contact Us</h2>
            <p className="mt-3">
              For any questions regarding these terms, please contact us at{" "}
              <a href="mailto:hello@gktravel.com" className="text-primary underline-offset-4 hover:underline">
                hello@gktravel.com
              </a>{" "}
              or +91 98765 43210.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
