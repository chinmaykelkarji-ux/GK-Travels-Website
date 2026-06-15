import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CTASection } from "@/components/sections/cta-section";
import { DestinationCard } from "@/components/cards/destination-card";
import { destinations } from "@/data/destinations";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Explore every destination curated by GK Travel — from the sacred ghats of Kashi and Ayodhya to the shores of Bali, Dubai and beyond.",
};

export default function DestinationsPage() {
  const pilgrimage = destinations.filter((d) => d.category === "pilgrimage");
  const escapes = destinations.filter((d) => d.category !== "pilgrimage");

  return (
    <>
      <PageHero
        eyebrow="Explore"
        title="Our Destinations"
        description="Every journey begins with a place that calls to you. Explore the destinations we know best — and love most."
        image="https://picsum.photos/seed/gk-destinations-hero/1920/1080"
        breadcrumb={[{ label: "Destinations" }]}
      />

      <section className="section-y">
        <div className="container-gk">
          <div className="max-w-2xl">
            <span className="eyebrow !text-terracotta">Sacred Journeys</span>
            <h2 className="mt-3 font-display text-3xl font-medium md:text-4xl">
              Pilgrimage Destinations
            </h2>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              Timeless places of devotion, designed for comfort and ease of
              travel.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3">
            {pilgrimage.map((destination) => (
              <DestinationCard key={destination.slug} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-secondary">
        <div className="container-gk">
          <div className="max-w-2xl">
            <span className="eyebrow !text-teal">Signature Escapes</span>
            <h2 className="mt-3 font-display text-3xl font-medium md:text-4xl">
              Domestic &amp; International Destinations
            </h2>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              Handpicked leisure destinations across India and around the
              world.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {escapes.map((destination) => (
              <DestinationCard key={destination.slug} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Can't Decide?"
        title="Let Us Help You Choose"
        description="Tell us what you're looking for and our travel specialists will recommend the perfect destination for you."
        primaryLabel="Plan My Trip"
        primaryHref="/plan-my-trip"
        secondaryLabel="Browse All Tours"
        secondaryHref="/tours"
      />
    </>
  );
}
