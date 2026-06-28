import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { CTASection } from "@/components/sections/cta-section";
import { TourCard } from "@/components/cards/tour-card";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import {
  getAllDestinations,
  getAllCountries,
  filterTours,
  sortTours,
  TOUR_CATEGORIES,
} from "@/lib/tours";

export const metadata: Metadata = {
  title: "All Tours",
  description:
    "Browse all 80 GK Travel packages — pilgrimage, domestic and international tours across 20 destinations. Filter by destination, category, duration and more.",
  alternates: { canonical: "/tours" },
};

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "newest", label: "Newest" },
  { value: "duration-asc", label: "Duration: Short to Long" },
  { value: "duration-desc", label: "Duration: Long to Short" },
  { value: "name-asc", label: "Name: A to Z" },
];

const PAGE_SIZE = 12;

interface ToursPageProps {
  searchParams: Promise<{
    destination?: string;
    country?: string;
    category?: string;
    tier?: string;
    season?: string;
    q?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function ToursPage({ searchParams }: ToursPageProps) {
  const {
    destination = "",
    country = "",
    category = "",
    tier = "",
    season = "",
    q = "",
    sort = "recommended",
    page = "1",
  } = await searchParams;

  const destinations = getAllDestinations();
  const countries = getAllCountries();
  const currentPage = Math.max(1, parseInt(page, 10) || 1);

  const filtered = filterTours({
    destination: destination || undefined,
    country: country || undefined,
    category: category || undefined,
    tier: tier || undefined,
    season: season || undefined,
    query: q || undefined,
  });
  const results = sortTours(filtered, sort);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const pageResults = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const hasFilters = Boolean(destination || country || category || tier || season || q || sort !== "recommended");

  const buildPageHref = (p: number) => {
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (country) params.set("country", country);
    if (category) params.set("category", category);
    if (tier) params.set("tier", tier);
    if (season) params.set("season", season);
    if (q) params.set("q", q);
    if (sort) params.set("sort", sort);
    params.set("page", String(p));
    return `/tours?${params.toString()}`;
  };

  return (
    <>
      <PageHero
        eyebrow="All Packages"
        title="Explore Our Tours"
        description="Search and filter all 80 GK Travel packages to find the journey that fits you best."
        image="https://picsum.photos/seed/gk-tours-hero/1920/1080"
        breadcrumb={[{ label: "Tours" }]}
      />

      <section className="section-y">
        <div className="container-gk">
          {/* Filters */}
          <form
            action="/tours"
            method="GET"
            className="grid grid-cols-1 gap-3 rounded-xl border border-border bg-card p-4 shadow-sm sm:grid-cols-2 md:grid-cols-4"
          >
            <div className="space-y-1.5 md:col-span-4">
              <label htmlFor="q" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Search by Tour Name
              </label>
              <input
                id="q"
                name="q"
                type="text"
                defaultValue={q}
                placeholder="e.g. Kashmir, Bali, Char Dham..."
                className="h-11 w-full rounded-sm border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="space-y-1.5">
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

            <div className="space-y-1.5">
              <label htmlFor="country" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Country
              </label>
              <select
                id="country"
                name="country"
                defaultValue={country}
                className="h-11 w-full rounded-sm border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">All Countries</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="category" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Category
              </label>
              <select
                id="category"
                name="category"
                defaultValue={category}
                className="h-11 w-full rounded-sm border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">All Categories</option>
                {TOUR_CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="tier" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Tour Type
              </label>
              <select
                id="tier"
                name="tier"
                defaultValue={tier}
                className="h-11 w-full rounded-sm border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Budget &amp; Premium</option>
                <option value="Budget">Budget</option>
                <option value="Premium">Premium</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="season" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Season
              </label>
              <input
                id="season"
                name="season"
                type="text"
                defaultValue={season}
                placeholder="e.g. October"
                className="h-11 w-full rounded-sm border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="space-y-1.5">
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

            <div className="flex items-end md:col-span-4">
              <button
                type="submit"
                className="h-11 w-full rounded-sm bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
              >
                Apply Filters
              </button>
            </div>
          </form>

          {/* Results */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{pageResults.length}</span> of{" "}
              <span className="font-medium text-foreground">{results.length}</span>{" "}
              {results.length === 1 ? "tour" : "tours"}
            </p>
            {hasFilters && (
              <Link href="/tours" className="text-sm font-medium text-primary hover:underline">
                Clear Filters
              </Link>
            )}
          </div>

          {pageResults.length > 0 ? (
            <>
              <StaggerGroup className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {pageResults.map((tour) => (
                  <StaggerItem key={tour.slug} className="h-full">
                    <TourCard tour={tour} />
                  </StaggerItem>
                ))}
              </StaggerGroup>

              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  {currentPage > 1 && (
                    <Link
                      href={buildPageHref(currentPage - 1)}
                      className="rounded-sm border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
                    >
                      Previous
                    </Link>
                  )}
                  <span className="px-3 text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </span>
                  {currentPage < totalPages && (
                    <Link
                      href={buildPageHref(currentPage + 1)}
                      className="rounded-sm border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
                    >
                      Next
                    </Link>
                  )}
                </div>
              )}
            </>
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
