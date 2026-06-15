import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CTASection } from "@/components/sections/cta-section";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { TourCard } from "@/components/cards/tour-card";
import { DestinationCard } from "@/components/cards/destination-card";
import { tours } from "@/data/tours";
import { destinations } from "@/data/destinations";

export const metadata: Metadata = {
  title: "Signature Escapes | International Tours",
  description:
    "Curated international and domestic leisure escapes — Bali, Dubai, Thailand, Vietnam, Kashmir, Kerala, Goa and more, designed for comfort and ease.",
};

export default function InternationalToursPage() {
  const escapeTours = tours.filter((t) => t.category !== "pilgrimage");
  const internationalDestinations = destinations.filter((d) => d.category === "international");
  const domesticDestinations = destinations.filter((d) => d.category === "domestic");

  return (
    <>
      <PageHero
        eyebrow="Signature Escapes"
        title="International & Domestic Tours"
        description="From the beaches of Bali to the valleys of Kashmir — leisure escapes designed with the comfort and care of a private travel manager."
        image="https://picsum.photos/seed/gk-international-hero/1920/1080"
        breadcrumb={[{ label: "International Tours" }]}
      />

      <section className="section-y">
        <div className="container-gk">
          <div className="max-w-2xl">
            <span className="eyebrow !text-teal">Choose Your Escape</span>
            <h2 className="mt-3 font-display text-3xl font-medium md:text-4xl">
              Signature Escape Packages
            </h2>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              Handpicked hotels, private transfers and curated experiences —
              every escape is fully managed from arrival to departure.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {escapeTours.map((tour) => (
              <TourCard key={tour.slug} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-secondary">
        <div className="container-gk">
          <div className="max-w-2xl">
            <span className="eyebrow !text-teal">Beyond India</span>
            <h2 className="mt-3 font-display text-3xl font-medium md:text-4xl">
              International Destinations
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {internationalDestinations.map((destination) => (
              <DestinationCard key={destination.slug} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-gk">
          <div className="max-w-2xl">
            <span className="eyebrow !text-teal">Across India</span>
            <h2 className="mt-3 font-display text-3xl font-medium md:text-4xl">
              Domestic Destinations
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {domesticDestinations.map((destination) => (
              <DestinationCard key={destination.slug} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <TestimonialsSection limit={3} />

      <CTASection
        eyebrow="Ready For Your Escape?"
        title="Let Us Design Your Next Holiday"
        description="Share your travel dates and preferences — we'll handle hotels, transfers and experiences end to end."
        primaryLabel="Plan My Trip"
        primaryHref="/plan-my-trip"
        secondaryLabel="Talk To Us"
        secondaryHref="/contact"
      />
    </>
  );
}
