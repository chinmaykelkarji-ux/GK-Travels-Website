import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CustomTourForm } from "@/components/forms/custom-tour-form";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Plan My Trip",
  description:
    "Tell us about your dream trip and our travel specialists will design a custom itinerary just for you — no obligation, no spam.",
};

export default function PlanMyTripPage() {
  return (
    <>
      <PageHero
        eyebrow="Custom Itineraries"
        title="Plan My Trip"
        description="Every great journey starts with a conversation. Share a few details and we'll craft an itinerary built around you."
        image="https://picsum.photos/seed/gk-plan-hero/1920/1080"
        breadcrumb={[{ label: "Plan My Trip" }]}
      />

      <section className="section-y">
        <div className="container-gk grid grid-cols-1 gap-12 lg:grid-cols-3">
          <Reveal className="lg:col-span-1">
            <span className="eyebrow">How It Works</span>
            <h2 className="mt-3 font-display text-2xl font-medium md:text-3xl">
              Tell Us About Your Trip
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Whether you have a destination in mind or just an occasion to
              celebrate, this short form helps our travel specialists
              understand what you&apos;re looking for — so the itinerary we
              send back actually fits.
            </p>
            <ol className="mt-6 space-y-4 text-sm text-foreground/85">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-semibold text-primary">1</span>
                Share your destination, dates and group details
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-semibold text-primary">2</span>
                A travel specialist reviews your preferences
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-semibold text-primary">3</span>
                We call or WhatsApp you within 4 hours
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-semibold text-primary">4</span>
                Receive a custom itinerary, tailored to you
              </li>
            </ol>
          </Reveal>

          <Reveal className="lg:col-span-2" delay={0.1}>
            <CustomTourForm />
          </Reveal>
        </div>
      </section>

      <WhyChooseUs />
    </>
  );
}
