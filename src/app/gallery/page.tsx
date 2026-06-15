import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CTASection } from "@/components/sections/cta-section";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Reveal } from "@/components/motion/reveal";
import { tours } from "@/data/tours";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A glimpse into the journeys GK Travel has designed — from the ghats of Varanasi to the beaches of Bali and the valleys of Kashmir.",
};

const buildImages = (category?: "pilgrimage" | "domestic" | "international") => {
  const filtered = category ? tours.filter((t) => t.category === category) : tours;
  return filtered.flatMap((tour) =>
    tour.gallery.map((src) => ({ src, alt: `${tour.title} — ${tour.destinationName}` }))
  );
};

export default function GalleryPage() {
  const allImages = buildImages();
  const pilgrimageImages = buildImages("pilgrimage");
  const escapeImages = [...buildImages("domestic"), ...buildImages("international")];

  return (
    <>
      <PageHero
        eyebrow="Moments From Our Journeys"
        title="Travel Gallery"
        description="A glimpse into the journeys we've designed for our travellers — from sacred ghats to sun-soaked shores."
        image="https://picsum.photos/seed/gk-gallery-hero/1920/1080"
        breadcrumb={[{ label: "Gallery" }]}
      />

      <section className="section-y">
        <div className="container-gk">
          <Reveal>
            <Tabs defaultValue="all">
              <TabsList variant="line" className="mb-8">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pilgrimage">Sacred Journeys</TabsTrigger>
                <TabsTrigger value="escapes">Signature Escapes</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <GalleryGrid images={allImages} />
              </TabsContent>
              <TabsContent value="pilgrimage">
                <GalleryGrid images={pilgrimageImages} />
              </TabsContent>
              <TabsContent value="escapes">
                <GalleryGrid images={escapeImages} />
              </TabsContent>
            </Tabs>
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow="Inspired?"
        title="Let's Create Your Own Story"
        description="Tell us about the journey you have in mind and we'll bring it to life."
        primaryLabel="Plan My Trip"
        primaryHref="/plan-my-trip"
        secondaryLabel="Browse All Tours"
        secondaryHref="/tours"
      />
    </>
  );
}
