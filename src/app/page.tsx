import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/sections/hero";
import { TourSearch } from "@/components/sections/tour-search";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { StatsSection } from "@/components/sections/stats-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CTASection } from "@/components/sections/cta-section";
import { DestinationCard } from "@/components/cards/destination-card";
import { TourCard } from "@/components/cards/tour-card";
import { DepartureCard } from "@/components/cards/departure-card";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { getAllDestinations, getFeaturedTours, getAllTours } from "@/lib/tours";
import { departures } from "@/data/departures";

export default function Home() {
  const featuredDestinations = getAllDestinations()
    .filter((d) => d.featured)
    .slice(0, 8);
  const featuredTours = getFeaturedTours(6);
  const upcomingDepartures = departures.slice(0, 4);
  const galleryImages = getAllTours()
    .slice(0, 8)
    .map((t) => ({ src: t.gallery[0], alt: t.title }));

  return (
    <>
      <Hero />
      <TourSearch />

      {/* Featured Destinations */}
      <section className="section-y">
        <div className="container-gk">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="eyebrow">Where To Next</span>
              <h2 className="mt-3 font-display text-3xl font-medium md:text-4xl">
                Featured Destinations
              </h2>
              <p className="mt-3 text-sm text-muted-foreground md:text-base">
                From the sacred ghats of Kashi to the shores of Bali — explore
                the places our travellers love most.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-sm">
              <Link href="/destinations">
                View All Destinations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Reveal>

          <StaggerGroup className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
            {featuredDestinations.map((destination) => (
              <StaggerItem key={destination.slug}>
                <DestinationCard destination={destination} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Popular Packages */}
      <section className="section-y bg-secondary">
        <div className="container-gk">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="eyebrow">Handpicked For You</span>
              <h2 className="mt-3 font-display text-3xl font-medium md:text-4xl">
                Popular Packages
              </h2>
              <p className="mt-3 text-sm text-muted-foreground md:text-base">
                Thoughtfully designed itineraries across our Sacred Journeys
                and Signature Escapes collections.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-sm">
              <Link href="/tours">
                View All Tours
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Reveal>

          <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTours.map((tour) => (
              <StaggerItem key={tour.slug} className="h-full">
                <TourCard tour={tour} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Upcoming Departures */}
      <section className="section-y">
        <div className="container-gk">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="eyebrow">Don&apos;t Miss Out</span>
              <h2 className="mt-3 font-display text-3xl font-medium md:text-4xl">
                Upcoming Departures
              </h2>
              <p className="mt-3 text-sm text-muted-foreground md:text-base">
                Fixed-date group departures with limited seats — secure your
                spot in advance.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-sm">
              <Link href="/departures">
                View All Departures
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Reveal>

          <StaggerGroup className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {upcomingDepartures.map((departure) => (
              <StaggerItem key={departure.id}>
                <DepartureCard departure={departure} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <WhyChooseUs />
      <StatsSection />
      <TestimonialsSection limit={3} />

      {/* Travel Gallery */}
      <section className="section-y bg-secondary">
        <div className="container-gk">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Moments From Our Journeys</span>
            <h2 className="mt-3 font-display text-3xl font-medium md:text-4xl">
              Travel Gallery
            </h2>
          </Reveal>
          <Reveal className="mt-10" delay={0.1}>
            <GalleryGrid images={galleryImages} />
          </Reveal>
          <div className="mt-8 text-center">
            <Button asChild variant="outline" className="rounded-sm">
              <Link href="/gallery">
                Explore Full Gallery
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Inquiry */}
      <section className="section-y">
        <div className="container-gk grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="eyebrow">Talk To A Specialist</span>
            <h2 className="mt-3 font-display text-3xl font-medium md:text-4xl">
              Not Sure Where To Begin?
            </h2>
            <p className="mt-4 max-w-md text-sm text-muted-foreground md:text-base">
              Share a few details about the trip you have in mind and our
              travel specialists will reach out with a tailored
              recommendation — no obligation, no spam.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-foreground/80">
              <li>✓ Personalised itinerary suggestions</li>
              <li>✓ Transparent pricing, no hidden costs</li>
              <li>✓ Dedicated travel manager for your trip</li>
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <InquiryForm source="homepage" title="Get a Free Consultation" />
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow="Ready When You Are"
        title="Let's Plan Your Next Journey"
        description="Tell us your dream destination and travel dates — we'll take care of the rest."
        primaryLabel="Plan My Trip"
        primaryHref="/plan-my-trip"
        secondaryLabel="Browse All Tours"
        secondaryHref="/tours"
      />
    </>
  );
}
