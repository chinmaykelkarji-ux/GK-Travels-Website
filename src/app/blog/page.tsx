import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CTASection } from "@/components/sections/cta-section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { blogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Travel Journal",
  description:
    "Planning guides, destination tips and itinerary inspiration from the GK Travel team — for pilgrimage journeys and leisure escapes alike.",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <PageHero
        eyebrow="Travel Journal"
        title="Stories & Travel Guides"
        description="Planning tips, destination guides and inspiration from our travel specialists."
        image="https://picsum.photos/seed/gk-blog-hero/1920/1080"
        breadcrumb={[{ label: "Blog" }]}
      />

      <section className="section-y">
        <div className="container-gk">
          {/* Featured post */}
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid grid-cols-1 gap-6 overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg md:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-10">
                <span className="eyebrow">{featured.category}</span>
                <h2 className="mt-3 font-display text-2xl font-medium md:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground md:text-base">
                  {featured.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{formatDate(featured.date)}</span>
                  <span>·</span>
                  <span>{featured.readTime}</span>
                </div>
                <span className="mt-5 inline-flex items-center text-sm font-medium text-primary">
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Other posts */}
          <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <StaggerItem key={post.slug} className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="eyebrow">{post.category}</span>
                    <h3 className="mt-2 font-display text-lg font-medium leading-snug">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
                      <span>{formatDate(post.date)}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <CTASection
        eyebrow="Have A Question?"
        title="Talk To A Travel Specialist"
        description="Can't find what you're looking for? Our team is happy to help plan your journey."
        primaryLabel="Plan My Trip"
        primaryHref="/plan-my-trip"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
