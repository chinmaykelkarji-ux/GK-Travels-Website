import type { Metadata } from "next";
import Image from "next/image";
import { Award, Heart, MapPin, Sparkles } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CTASection } from "@/components/sections/cta-section";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { StatsSection } from "@/components/sections/stats-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "30+ years of designing fully-managed pilgrimage and leisure journeys. Learn about GK Travel's story, values and the team behind every itinerary.",
};

const values = [
  {
    icon: Heart,
    title: "Care, Not Just Service",
    description:
      "Every itinerary is designed as if for our own family — with comfort, safety and dignity at its core.",
  },
  {
    icon: Award,
    title: "Decades of Expertise",
    description:
      "30+ years of on-ground relationships with hotels, guides and transport partners across India and abroad.",
  },
  {
    icon: MapPin,
    title: "Local Knowledge",
    description:
      "From temple timings in Kashi to the best season for Ladakh — our recommendations come from real experience.",
  },
  {
    icon: Sparkles,
    title: "Thoughtful Design",
    description:
      "No copy-paste itineraries. Every journey is paced, planned and personalised for the traveller.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="About GK Travel"
        description="For over three decades, we've been designing journeys that feel less like a tour and more like being looked after by family."
        image="https://picsum.photos/seed/gk-about-hero/1920/1080"
        breadcrumb={[{ label: "About Us" }]}
      />

      {/* Story */}
      <section className="section-y">
        <div className="container-gk grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl lg:order-2">
            <Image
              src="https://picsum.photos/seed/gk-about-story/1000/1250"
              alt="GK Travel team planning a journey"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="lg:order-1">
            <span className="eyebrow">Since 1994</span>
            <h2 className="mt-3 font-display text-3xl font-medium md:text-4xl">
              Three Decades of Curated Journeys
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                GK Travel began with a simple belief — that travel, especially
                pilgrimage, should feel unhurried, dignified and well cared
                for. What started as a small family business arranging Char
                Dham yatras for local communities has grown into a trusted
                name for both sacred journeys and signature leisure escapes
                across the world.
              </p>
              <p>
                Today, we design journeys to Kashi, Ayodhya and the Char Dham
                with the same attention to detail as our international escapes
                to Bali, Dubai and beyond — handpicked hotels, dependable
                transport, and a dedicated travel manager for every group.
              </p>
              <p>
                We&apos;re not the biggest travel company, and we don&apos;t
                want to be. We want to be the one you call when you&apos;re
                planning the trip that matters most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-y bg-secondary">
        <div className="container-gk">
          <div className="max-w-2xl">
            <span className="eyebrow">What We Stand For</span>
            <h2 className="mt-3 font-display text-3xl font-medium md:text-4xl">
              Our Values
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-primary/5 text-primary">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 font-display text-lg font-medium">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsSection />
      <WhyChooseUs />
      <TestimonialsSection limit={3} />

      <CTASection
        eyebrow="Let's Get Started"
        title="Ready To Plan Your Journey?"
        description="Tell us where you'd like to go and our travel specialists will take it from there."
        primaryLabel="Plan My Trip"
        primaryHref="/plan-my-trip"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
