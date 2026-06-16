import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  Clock,
  Users,
  CalendarDays,
  Check,
  X,
  ChevronRight,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TourCard } from "@/components/cards/tour-card";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { StickyMobileCta } from "@/components/layout/sticky-mobile-cta";
import { getTourBySlug, getRelatedTours, tours } from "@/data/tours-data";
import { testimonials } from "@/data/testimonials";
import { categoryLabels, categoryAccent, formatPrice, cn } from "@/lib/utils";

interface TourDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({
  params,
}: TourDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const raw = getTourBySlug(slug);

  if (!raw) return {};
  const t = raw as Record<string, any>;

  return {
    title: t.title,
    description: t.shortDescription ?? t.metaDescription ?? t.overview ?? "",
  };
}

export default async function TourDetailsPage({ params }: TourDetailsPageProps) {
  const { slug } = await params;
  const rawTour = getTourBySlug(slug);

  if (!rawTour) notFound();

  const r = rawTour as Record<string, any>;
  const tour = {
    ...r,
    category: r.category as string,
    image: r.image ?? `https://picsum.photos/seed/${r.slug}/1200/900`,
    gallery: (r.gallery as string[] | undefined) ?? [],
    description: r.description ?? r.overview ?? "",
    shortDescription: r.shortDescription ?? r.metaDescription ?? r.overview ?? "",
    durationNights: r.durationNights ?? r.nights,
    durationDays: r.durationDays ?? r.days,
    bestTime: r.bestTime ?? r.bestSeason,
    groupSize: r.groupSize as string | undefined,
    rating: r.rating as number | undefined,
    reviewCount: r.reviewCount as number | undefined,
    price: r.price as number | null,
    originalPrice: r.originalPrice as number | undefined,
    hotels: Array.isArray(r.hotels)
      ? r.hotels.map((h: any, i: number) =>
          typeof h === "string"
            ? {
                name: h.replace(/\s*\([^)]*\)$/, "").split(",")[0].trim(),
                location: (h.split(",")[1] ?? "").replace(/\s*\([^)]*\)$/, "").trim(),
                category: (h.match(/\(([^)]+)\)/) ?? [])[1] ?? "",
                image: `https://picsum.photos/seed/${r.slug}-h${i}/300/200`,
              }
            : h
        )
      : [],
  } as Record<string, any>;

  const accent = categoryAccent[tour.category];
  const accentClass = accent === "terracotta" ? "bg-terracotta" : "bg-teal";
  const accentText = accent === "terracotta" ? "text-terracotta" : "text-teal";
  const relatedTours = (getRelatedTours(rawTour) as any[]).map((r) => ({
    ...r,
    image: r.image ?? `https://picsum.photos/seed/${r.slug}/1200/900`,
    durationNights: r.durationNights ?? r.nights,
    durationDays: r.durationDays ?? r.days,
    destinationName: r.destinationName ?? r.destination,
    price: r.price ?? 0,
    rating: r.rating ?? 0,
    reviewCount: r.reviewCount ?? 0,
  }));
  const reviews = testimonials.filter((t) => t.tour === tour.title);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[380px] w-full overflow-hidden md:h-[60vh]">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-primary/10" />

        <div className="container-gk relative flex h-full flex-col justify-end pb-10 text-white">
          <div className="mb-3 flex items-center gap-1.5 text-xs text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/tours" className="hover:text-white">Tours</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">{tour.title}</span>
          </div>
          <span className={cn("inline-block w-fit rounded-sm px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white", accentClass)}>
            {categoryLabels[tour.category]}
          </span>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-medium sm:text-4xl md:text-5xl">
            {tour.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {tour.durationNights}N / {tour.durationDays}D
            </span>
            {tour.groupSize && (
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                {tour.groupSize}
              </span>
            )}
            {tour.bestTime && (
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                Best time: {tour.bestTime}
              </span>
            )}
            {tour.rating && (
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-gold text-gold" />
                {tour.rating} ({tour.reviewCount} reviews)
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section-y">
        <div className="container-gk grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            {/* Overview */}
            <Reveal>
              <span className={cn("eyebrow", `!${accentText}`)}>Overview</span>
              <h2 className="mt-3 font-display text-2xl font-medium md:text-3xl">
                About This Journey
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                {tour.description}
              </p>
            </Reveal>

            {/* Highlights */}
            <Reveal>
              <h2 className="font-display text-2xl font-medium md:text-3xl">
                Journey Highlights
              </h2>
              <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {tour.highlights.map((highlight: string) => (
                  <li key={highlight} className="flex items-start gap-2.5 text-sm text-foreground/85">
                    <Check className={cn("mt-0.5 h-4 w-4 shrink-0", accentText)} />
                    {highlight}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Itinerary */}
            <Reveal>
              <h2 className="font-display text-2xl font-medium md:text-3xl">
                Day-Wise Itinerary
              </h2>
              <Accordion className="mt-5" defaultValue={["day-1"]}>
                {tour.itinerary.map((day: any) => (
                  <AccordionItem key={day.day} value={`day-${day.day}`} className="border-border">
                    <AccordionTrigger className="font-display text-base font-medium">
                      <span>
                        <span className={cn("mr-2", accentText)}>Day {day.day}</span>
                        {day.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {day.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
                        {day.meals && day.meals.length > 0 && (
                          <span>
                            <span className="font-medium text-foreground">Meals: </span>
                            {day.meals.join(", ")}
                          </span>
                        )}
                        {day.stay && (
                          <span>
                            <span className="font-medium text-foreground">Stay: </span>
                            {day.stay}
                          </span>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>

            {/* Hotels */}
            {tour.hotels.length > 0 && (
              <Reveal>
                <h2 className="font-display text-2xl font-medium md:text-3xl">
                  Where You&apos;ll Stay
                </h2>
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {tour.hotels.map((hotel: any) => (
                    <div key={hotel.name} className="flex gap-4 rounded-xl border border-border bg-card p-4">
                      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-sm">
                        <Image
                          src={hotel.image}
                          alt={hotel.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-display text-base font-medium">{hotel.name}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{hotel.location}</p>
                        <span className="mt-2 inline-block rounded-sm bg-secondary px-2 py-0.5 text-[11px] font-medium text-foreground/80">
                          {hotel.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {/* Inclusions / Exclusions */}
            <Reveal className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-xl font-medium">Inclusions</h3>
                <ul className="mt-4 space-y-2.5">
                  {tour.inclusions.map((item: string) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-xl font-medium">Exclusions</h3>
                <ul className="mt-4 space-y-2.5">
                  {tour.exclusions.map((item: string) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Gallery */}
            {tour.gallery.length > 0 && (
              <Reveal>
                <h2 className="font-display text-2xl font-medium md:text-3xl">
                  Gallery
                </h2>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {tour.gallery.map((src: string, i: number) => (
                    <div key={src} className="group relative aspect-square overflow-hidden rounded-lg">
                      <Image
                        src={src}
                        alt={`${tour.title} photo ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {/* Reviews */}
            {reviews.length > 0 && (
              <Reveal>
                <h2 className="font-display text-2xl font-medium md:text-3xl">
                  Traveller Reviews
                </h2>
                <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {reviews.map((review) => (
                    <TestimonialCard key={review.id} testimonial={review} />
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div id="enquire" className="sticky top-24 space-y-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Starting from
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  <p className="font-display text-3xl font-semibold text-primary">
                    {tour.price ? formatPrice(tour.price) : "Get a Quote"}
                  </p>
                  {tour.originalPrice && (
                    <p className="text-sm text-muted-foreground line-through">
                      {formatPrice(tour.originalPrice)}
                    </p>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">per person, on twin sharing</p>
              </div>

              <InquiryForm
                source="tour_details"
                tourSlug={tour.slug}
                tourName={tour.title}
                title="Enquire About This Tour"
                description="Get a customised quote and itinerary from our travel specialists."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related tours */}
      {relatedTours.length > 0 && (
        <section className="section-y bg-secondary">
          <div className="container-gk">
            <Reveal className="max-w-2xl">
              <span className="eyebrow">You May Also Like</span>
              <h2 className="mt-3 font-display text-3xl font-medium md:text-4xl">
                Related Journeys
              </h2>
            </Reveal>
            <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTours.map((related) => (
                <StaggerItem key={related.slug} className="h-full">
                  <TourCard tour={related as any} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      )}

      <StickyMobileCta tourTitle={tour.title} enquireHref="#enquire" />
      {/* Spacer so the sticky mobile CTA doesn't overlap the footer on small screens */}
      <div className="h-16 md:hidden" />
    </>
  );
}
