import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { CTASection } from "@/components/sections/cta-section";
import { TourCard } from "@/components/cards/tour-card";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { TOUR_CATEGORIES, getToursByCategory, getCategoryDef } from "@/lib/tours";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return TOUR_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const def = getCategoryDef(slug);
  if (!def) return {};
  return {
    title: def.label,
    description: `${def.description} Browse all GK Travel ${def.label.toLowerCase()} packages.`,
    alternates: { canonical: `/tours/category/${def.slug}` },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const def = getCategoryDef(slug);
  if (!def) notFound();

  const tours = getToursByCategory(slug);

  return (
    <>
      <PageHero
        eyebrow="Browse By Category"
        title={def.label}
        description={def.description}
        image={`https://picsum.photos/seed/gk-category-${def.slug}/1920/1080`}
        breadcrumb={[{ label: "Tours", href: "/tours" }, { label: def.label }]}
      />

      <section className="section-y">
        <div className="container-gk">
          <div className="mb-8 flex flex-wrap gap-2">
            {TOUR_CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/tours/category/${c.slug}`}
                className={`rounded-sm border px-3 py-1.5 text-xs font-medium transition-colors ${
                  c.slug === slug
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground/80 hover:bg-secondary"
                }`}
              >
                {c.label}
              </Link>
            ))}
          </div>

          {tours.length > 0 ? (
            <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tours.map((tour) => (
                <StaggerItem key={tour.slug} className="h-full">
                  <TourCard tour={tour} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          ) : (
            <div className="flex flex-col items-center py-16 text-center">
              <h3 className="font-display text-2xl font-medium">
                Every {def.label} Trip Is Custom-Built
              </h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                We don&apos;t run fixed packages in this category — instead, our specialists
                design a {def.label.toLowerCase()} itinerary around your exact requirements.
              </p>
              <Link
                href="/plan-my-trip"
                className="mt-6 rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Plan My Trip
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
