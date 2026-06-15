import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { CTASection } from "@/components/sections/cta-section";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";
import { formatDate } from "@/lib/utils";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <section className="relative h-[40vh] min-h-[320px] w-full overflow-hidden md:h-[48vh]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/40 to-primary/20" />
        <div className="container-gk relative flex h-full flex-col justify-end pb-10 text-white">
          <div className="mb-3 flex items-center gap-1.5 text-xs text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">{post.title}</span>
          </div>
          <span className="eyebrow">{post.category}</span>
          <h1 className="mt-2 max-w-3xl font-display text-3xl font-medium sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-white/85">
            <span>{post.author}</span>
            <span>·</span>
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-gk">
          <div className="mx-auto max-w-2xl">
            {post.content.map((paragraph, i) => (
              <p key={i} className="mb-5 text-sm leading-relaxed text-foreground/85 md:text-base">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-y bg-secondary">
          <div className="container-gk">
            <div className="max-w-2xl">
              <span className="eyebrow">More From The Journal</span>
              <h2 className="mt-3 font-display text-3xl font-medium md:text-4xl">
                Related Reads
              </h2>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <span className="eyebrow">{p.category}</span>
                    <h3 className="mt-2 font-display text-base font-medium leading-snug">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        eyebrow="Ready To Go?"
        title="Let's Plan Your Trip"
        description="Tell us where you'd like to go and our travel specialists will take care of the rest."
        primaryLabel="Plan My Trip"
        primaryHref="/plan-my-trip"
        secondaryLabel="Browse All Tours"
        secondaryHref="/tours"
      />
    </>
  );
}
