import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CTASection } from "@/components/sections/cta-section";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { TourCard } from "@/components/cards/tour-card";
import { DestinationCard } from "@/components/cards/destination-card";
import { getToursByCategory } from "@/data/tours";
import { destinations } from "@/data/destinations";

export const metadata: Metadata = {
  title: "Sacred Journeys | Pilgrimage Tours",
  description:
    "Fully-managed pilgrimage tours to Kashi, Ayodhya and the Char Dham — thoughtfully designed darshan experiences with comfortable stays and dedicated escorts.",
};

export default function PilgrimageToursPage() {
  const tours = getToursByCategory("pilgrimage");
  const pilgrimageDestinations = destinations.filter((d) => d.category === "pilgrimage");

  return (
    <>
      <PageHero
        eyebrow="Sacred Journeys"
        title="Pilgrimage Tours"
        description="Devotion, comfort and care — fully-managed yatras to India's most sacred destinations, designed for travellers of every age."
        image="https://picsum.photos/seed/gk-pilgrimage-hero/1920/1080"
        breadcrumb={[{ label: "Pilgrimage Tours" }]}
      />

      <section className="section-y">
        <div className="container-gk">
          <div className="max-w-2xl">
            <span className="eyebrow !text-terracotta">Choose Your Yatra</span>
            <h2 className="mt-3 font-display text-3xl font-medium md:text-4xl">
              Sacred Journey Packages
            </h2>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              Every itinerary is built around darshan timings, comfortable
              transfers and trusted stays close to the temples.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => (
              <TourCard key={tour.slug} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-secondary">
        <div className="container-gk">
          <div className="max-w-2xl">
            <span className="eyebrow !text-terracotta">Where We Take You</span>
            <h2 className="mt-3 font-display text-3xl font-medium md:text-4xl">
              Pilgrimage Destinations
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3">
            {pilgrimageDestinations.map((destination) => (
              <DestinationCard key={destination.slug} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <TestimonialsSection limit={3} />

      <CTASection
        eyebrow="Begin Your Yatra"
        title="Let Us Plan Your Pilgrimage"
        description="From temple timings to comfortable stays — we take care of every detail of your sacred journey."
        primaryLabel="Plan My Trip"
        primaryHref="/plan-my-trip"
        secondaryLabel="Talk To Us"
        secondaryHref="/contact"
      />
    </>
  );
}
