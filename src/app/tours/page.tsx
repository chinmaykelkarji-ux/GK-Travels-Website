import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { CTASection } from "@/components/sections/cta-section";
import { TourCard } from "@/components/cards/tour-card";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { tours } from "@/data/tours";
import { destinations } from "@/data/destinations";

export const metadata: Metadata = {
  title: "All Tours",
  description:
    "Browse every GK Travel package — Sacred Journeys across Kashi, Ayodhya and Char Dham, and Signature Escapes across India and the world.",
};

const categoryOptions = [
  { value: "", label: "All Journeys" },
  { value: "pilgrimage", label: "Sacred Journeys (Pilgrimage)" },
  { value: "domestic", label: "Signature Escapes (Domestic)" },
  { value: "international", label: "Signature Escapes (International)" },
];

const sortOptions = [
  { value: "", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

interface ToursPageProps {
  searchParams: Promise<{
    destination?: string;
    category?: string;
    sort?: string;
  }>;
}

export default async function ToursPage({ searchParams }: ToursPageProps) {
  const { destination = "", category = "", sort = "" } = await searchParams;

  let results = [...tours];

  if (destination) {
    results = results.filter((t) => t.destinationSlug === destination);
  }
  if (category) {
    results = results.filter((t) => t.category === category);
  }

  if (sort === "price-asc") {
    results.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    results.sort((a, b) => b.price - a.price);
  } else if (sort === "rating") {
    results.sort((a, b) => b.rating - a.rating);
  }

  return (
    <>
      <PageHero
        eyebrow="All Packages"
        title="Explore Our Tours"
        description="Filter by destination or journey type to find the package that fits you best."
        image="https://picsum.photos/seed/gk-tours-hero/1920/1080"
        breadcrumb={[{ label: "Tours" }]}
      />

      <section className="section-y">
        <div className="container-gk">
          {/* Filters */}
          <form
            action="/tours"
            method="GET"
            className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm md:flex-row md:items-end md:gap-4"
          >
            <div className="flex-1 space-y-1.5">
              <label htmlFor="destination" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Destination
              </label>
              <select
                id="destination"
                name="destination"
                defaultValue={destination}
                className="h-11 w-full rounded-sm border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">All Destinations</option>
                {destinations.map((d) => (
                  <option key={d.slug} value={d.slug}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 space-y-1.5">
              <label htmlFor="category" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Journey Type
              </label>
              <select
                id="category"
                name="category"
                defaultValue={category}
                className="h-11 w-full rounded-sm border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 space-y-1.5">
              <label htmlFor="sort" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Sort By
              </label>
              <select
                id="sort"
                name="sort"
                defaultValue={sort}
                className="h-11 w-full rounded-sm border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="h-11 rounded-sm bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Apply Filters
            </button>
          </form>

          {/* Results */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{results.length}</span>{" "}
              {results.length === 1 ? "tour" : "tours"}
            </p>
            {(destination || category || sort) && (
              <Link href="/tours" className="text-sm font-medium text-primary hover:underline">
                Clear Filters
              </Link>
            )}
          </div>

          {results.length > 0 ? (
            <StaggerGroup className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((tour) => (
                <StaggerItem key={tour.slug} className="h-full">
                  <TourCard tour={tour} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          ) : (
            <div className="mt-16 flex flex-col items-center text-center">
              <h3 className="font-display text-2xl font-medium">No Tours Found</h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                We couldn&apos;t find a tour matching those filters. Try
                adjusting your search, or get in touch and we&apos;ll design
                one just for you.
              </p>
              <Link
                href="/tours"
                className="mt-6 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                View All Tours
              </Link>
            </div>
          )}
        </div>
      </section>

      <CTASection
        eyebrow="Need Help Choosing?"
        title="Talk To A Travel Specialist"
        description="Tell us what you have in mind and we'll recommend the right itinerary for you."
        primaryLabel="Plan My Trip"
        primaryHref="/plan-my-trip"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
