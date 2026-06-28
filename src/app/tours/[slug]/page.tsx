import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  CalendarDays,
  Check,
  X,
  ChevronRight,
  Bus,
  Utensils,
  MapPin,
  ShieldAlert,
  Backpack,
  FileText,
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
import { getAllTours, getTourBySlug, getRelatedTours, categoryLabel } from "@/lib/tours";
import { testimonials } from "@/data/testimonials";
import { categoryLabels, categoryAccent, priceLabel, cn } from "@/lib/utils";
import { SITE_URL, TEL_HREF, buildWhatsAppUrl, buildMailtoUrl } from "@/lib/site";

interface TourDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllTours().map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: TourDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return {};

  const title = tour.metaTitle || `${tour.title} | GK Travel`;
  const description = tour.metaDescription || tour.shortDescription;
  const url = `/tours/${tour.slug}`;

  return {
    title: tour.metaTitle || tour.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: tour.image, width: 1200, height: 900, alt: tour.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [tour.image],
    },
  };
}

export default async function TourDetailsPage({ params }: TourDetailsPageProps) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) notFound();

  const accent = categoryAccent[tour.category];
  const accentClass = accent === "terracotta" ? "bg-terracotta" : "bg-teal";
  const accentText = accent === "terracotta" ? "text-terracotta" : "text-teal";
  const relatedTours = getRelatedTours(tour);
  const reviews = testimonials.filter((t) => t.tour === tour.title);

  const firstDay = tour.itinerary[0];
  const lastDay = tour.itinerary[tour.itinerary.length - 1];
  const mealsIncluded = tour.inclusions.filter((i) => /breakfast|lunch|dinner|meal/i.test(i));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.shortDescription,
    image: [tour.image, ...tour.gallery],
    touristType: tour.tier,
    itinerary: tour.itinerary.map((d) => ({
      "@type": "TouristAttraction",
      name: `Day ${d.day}: ${d.title}`,
      description: d.description,
    })),
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: tour.price ?? undefined,
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/tours/${tour.slug}`,
    },
    provider: {
      "@type": "TravelAgency",
      name: "GK Travel",
      url: SITE_URL,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Tours", item: `${SITE_URL}/tours` },
      { "@type": "ListItem", position: 3, name: tour.title, item: `${SITE_URL}/tours/${tour.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[380px] w-full overflow-hidden md:h-[60vh]">
        <Image
          src={tour.image}
          alt={`${tour.title} — ${tour.destinationName}`}
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
          <div className="flex flex-wrap gap-2">
            <span className={cn("inline-block w-fit rounded-sm px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white", accentClass)}>
              {categoryLabels[tour.category]}
            </span>
            {tour.categories.slice(0, 2).map((c) => (
              <span key={c} className="inline-block w-fit rounded-sm bg-white/15 px-3 py-1 text-xs font-medium text-white">
                {categoryLabel(c)}
              </span>
            ))}
          </div>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-medium sm:text-4xl md:text-5xl">
            {tour.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {tour.destinationName}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {tour.durationNights}N / {tour.durationDays}D
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              Best time: {tour.bestTime}
            </span>
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
                Tour Highlights
              </h2>
              <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {tour.highlights.map((highlight) => (
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
                {tour.itinerary.map((day) => (
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
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>

            {/* Inclusions / Exclusions */}
            <Reveal className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-xl font-medium">Inclusions</h3>
                <ul className="mt-4 space-y-2.5">
                  {tour.inclusions.map((item) => (
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
                  {tour.exclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Hotels */}
            {tour.hotels.length > 0 && (
              <Reveal>
                <h2 className="font-display text-2xl font-medium md:text-3xl">
                  Where You&apos;ll Stay
                </h2>
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {tour.hotels.map((hotel) => (
                    <div key={hotel.name} className="flex gap-4 rounded-xl border border-border bg-card p-4">
                      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-sm">
                        <Image src={hotel.image} alt={hotel.name} fill sizes="96px" className="object-cover" />
                      </div>
                      <div>
                        <p className="font-display text-base font-medium">{hotel.name}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{hotel.location}</p>
                        {hotel.category && (
                          <span className="mt-2 inline-block rounded-sm bg-secondary px-2 py-0.5 text-[11px] font-medium text-foreground/80">
                            {hotel.category}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {/* Transportation */}
            <Reveal>
              <h3 className="flex items-center gap-2 font-display text-xl font-medium">
                <Bus className={cn("h-5 w-5", accentText)} /> Transportation
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tour.transport}</p>
            </Reveal>

            {/* Meals */}
            <Reveal>
              <h3 className="flex items-center gap-2 font-display text-xl font-medium">
                <Utensils className={cn("h-5 w-5", accentText)} /> Meals &amp; Local Cuisine
              </h3>
              {mealsIncluded.length > 0 && (
                <p className="mt-3 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Included: </span>
                  {mealsIncluded.join(", ")}
                </p>
              )}
              {tour.food.length > 0 && (
                <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {tour.food.map((item) => (
                    <li key={item} className="text-sm text-foreground/85">• {item}</li>
                  ))}
                </ul>
              )}
            </Reveal>

            {/* Pickup & Drop */}
            <Reveal>
              <h3 className="flex items-center gap-2 font-display text-xl font-medium">
                <MapPin className={cn("h-5 w-5", accentText)} /> Pickup &amp; Drop
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Pickup on arrival as described on Day 1 ({firstDay?.title}) and drop-off for departure on Day{" "}
                {lastDay?.day} ({lastDay?.title}), as detailed in the itinerary above.
              </p>
            </Reveal>

            {/* Things to Carry */}
            {tour.tips.length > 0 && (
              <Reveal>
                <h3 className="flex items-center gap-2 font-display text-xl font-medium">
                  <Backpack className={cn("h-5 w-5", accentText)} /> Things to Carry &amp; Travel Tips
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {tour.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {/* Important Notes */}
            <Reveal>
              <h3 className="flex items-center gap-2 font-display text-xl font-medium">
                <ShieldAlert className={cn("h-5 w-5", accentText)} /> Important Notes
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>• Sightseeing sequence may change based on local conditions, weather, or temple/site timings.</li>
                <li>• Hotel check-in/check-out is subject to property policy; early check-in is on request.</li>
                <li>• Itinerary can be customised — speak to our travel specialist for modifications.</li>
              </ul>
            </Reveal>

            {/* Cancellation Policy & Terms */}
            <Reveal>
              <h3 className="flex items-center gap-2 font-display text-xl font-medium">
                <FileText className={cn("h-5 w-5", accentText)} /> Cancellation Policy &amp; Terms
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Cancellation charges depend on how close to departure you cancel, and full terms apply to every
                booking. Please review our{" "}
                <Link href="/refund-policy" className={cn("font-medium underline", accentText)}>
                  cancellation &amp; refund policy
                </Link>{" "}
                and{" "}
                <Link href="/terms" className={cn("font-medium underline", accentText)}>
                  terms &amp; conditions
                </Link>{" "}
                before booking.
              </p>
            </Reveal>

            {/* Gallery */}
            {tour.gallery.length > 0 && (
              <Reveal>
                <h2 className="font-display text-2xl font-medium md:text-3xl">Gallery</h2>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {tour.gallery.map((src, i) => (
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

            {/* FAQ */}
            {tour.faq.length > 0 && (
              <Reveal>
                <h2 className="font-display text-2xl font-medium md:text-3xl">
                  Frequently Asked Questions
                </h2>
                <Accordion className="mt-5">
                  {tour.faq.map((item, i) => (
                    <AccordionItem key={item.q} value={`faq-${i}`} className="border-border">
                      <AccordionTrigger className="font-display text-base font-medium">{item.q}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Reveal>
            )}

            {/* Reviews */}
            {reviews.length > 0 && (
              <Reveal>
                <h2 className="font-display text-2xl font-medium md:text-3xl">Traveller Reviews</h2>
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
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Starting from</p>
                <p className="mt-1 font-display text-3xl font-semibold text-primary">
                  {priceLabel(tour.price)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">per person, on twin sharing</p>
                <div className="mt-4 flex flex-col gap-2">
                  <a
                    href={buildWhatsAppUrl(tour.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 items-center justify-center rounded-sm bg-[#25D366] text-sm font-semibold text-white hover:bg-[#1ebc59]"
                  >
                    WhatsApp Us
                  </a>
                  <a
                    href="#enquire-form"
                    className="flex h-11 items-center justify-center rounded-sm bg-gold text-sm font-semibold text-primary hover:bg-gold/90"
                  >
                    Book Now
                  </a>
                  <a
                    href={buildMailtoUrl({ tourName: tour.title })}
                    className="flex h-11 items-center justify-center rounded-sm border border-border text-sm font-semibold text-foreground hover:bg-secondary"
                  >
                    Email Us
                  </a>
                  <a
                    href={TEL_HREF}
                    className="flex h-11 items-center justify-center rounded-sm border border-border text-sm font-semibold text-foreground hover:bg-secondary"
                  >
                    Call Now
                  </a>
                </div>
              </div>

              <div id="enquire-form">
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
        </div>
      </section>

      {/* Related tours */}
      {relatedTours.length > 0 && (
        <section className="section-y bg-secondary">
          <div className="container-gk">
            <Reveal className="max-w-2xl">
              <span className="eyebrow">You May Also Like</span>
              <h2 className="mt-3 font-display text-3xl font-medium md:text-4xl">Related Tours</h2>
            </Reveal>
            <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTours.map((related) => (
                <StaggerItem key={related.slug} className="h-full">
                  <TourCard tour={related} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      )}

      <StickyMobileCta tourTitle={tour.title} enquireHref="#enquire" />
      <div className="h-16 md:hidden" />
    </>
  );
}
