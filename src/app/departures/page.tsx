import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CTASection } from "@/components/sections/cta-section";
import { DepartureCard } from "@/components/cards/departure-card";
import { departures } from "@/data/departures";

export const metadata: Metadata = {
  title: "Upcoming Departures",
  description:
    "Fixed-date group departures across our Sacred Journeys and Signature Escapes collections — limited seats, book early to secure your spot.",
};

export default function DeparturesPage() {
  const sorted = [...departures].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  return (
    <>
      <PageHero
        eyebrow="Don't Miss Out"
        title="Upcoming Departures"
        description="Fixed-date group departures with limited seats. Reserve your spot in advance for the best availability."
        image="https://picsum.photos/seed/gk-departures-hero/1920/1080"
        breadcrumb={[{ label: "Upcoming Departures" }]}
      />

      <section className="section-y">
        <div className="container-gk">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {sorted.map((departure) => (
              <DepartureCard key={departure.id} departure={departure} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Can't Find Your Dates?"
        title="We Can Plan A Private Departure For You"
        description="Travelling with family or a group of friends? We can arrange a dedicated departure on your preferred dates."
        primaryLabel="Plan My Trip"
        primaryHref="/plan-my-trip"
        secondaryLabel="Browse All Tours"
        secondaryHref="/tours"
      />
    </>
  );
}
