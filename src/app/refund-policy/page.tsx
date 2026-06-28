import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { EMAIL, MAILTO_BASE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: "Cancellation, rescheduling and refund policy for GK Travel bookings.",
};

export default function RefundPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Refund & Cancellation Policy"
        image="https://picsum.photos/seed/gk-refund-hero/1920/1080"
        breadcrumb={[{ label: "Refund & Cancellation" }]}
      />

      <section className="section-y">
        <div className="container-gk mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-foreground/85 md:text-base">
          <p className="text-muted-foreground">Last updated: January 2026</p>

          <div>
            <h2 className="font-display text-xl font-medium md:text-2xl">1. Cancellation by the Traveller</h2>
            <p className="mt-3">
              Cancellations must be made in writing (email or WhatsApp) to
              your travel specialist. Cancellation charges are calculated as a
              percentage of the total package cost based on how close to the
              departure date the cancellation is received:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              <li>30+ days before departure: 10% of package cost</li>
              <li>15–29 days before departure: 25% of package cost</li>
              <li>7–14 days before departure: 50% of package cost</li>
              <li>Less than 7 days / no-show: 100% of package cost</li>
            </ul>
            <p className="mt-3">
              Certain components such as flights, trains, special-period
              hotel bookings (peak season, festivals) and helicopter services
              may carry separate, non-refundable cancellation terms set by the
              respective vendors.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-medium md:text-2xl">2. Rescheduling</h2>
            <p className="mt-3">
              Requests to reschedule a confirmed trip will be accommodated
              wherever possible, subject to availability and any rate
              differences for the new travel dates. Please inform your travel
              specialist as early as possible.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-medium md:text-2xl">3. Cancellation by GK Travel</h2>
            <p className="mt-3">
              In the rare event that GK Travel needs to cancel a confirmed
              departure (for example, due to insufficient group size on a
              fixed departure, or circumstances beyond our control), travellers
              will be offered a full refund or the option to transfer the
              amount to an alternative date or package.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-medium md:text-2xl">4. Refund Processing</h2>
            <p className="mt-3">
              Approved refunds are processed to the original mode of payment
              within 7–14 business days, subject to confirmation from our
              banking and travel partners.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-medium md:text-2xl">5. Force Majeure</h2>
            <p className="mt-3">
              GK Travel is not liable for cancellations or delays caused by
              events beyond reasonable control, including natural disasters,
              government restrictions, strikes, or extreme weather. In such
              cases, we will work with our partners to minimise losses and
              offer the best possible alternative or refund.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-medium md:text-2xl">6. Contact Us</h2>
            <p className="mt-3">
              For cancellation or refund requests, please contact your travel
              specialist directly or write to us at{" "}
              <a href={MAILTO_BASE} className="text-primary underline-offset-4 hover:underline">
                {EMAIL}
              </a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
