import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CTASection } from "@/components/sections/cta-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/faq";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about booking, itineraries, pilgrimage travel, visas and cancellations at GK Travel.",
};

export default function FaqPage() {
  const categories = Array.from(new Set(faqs.map((f) => f.category)));

  return (
    <>
      <PageHero
        eyebrow="Need Help?"
        title="Frequently Asked Questions"
        description="Answers to the questions we hear most often. Can't find what you're looking for? Reach out to our team."
        image="https://picsum.photos/seed/gk-faq-hero/1920/1080"
        breadcrumb={[{ label: "FAQ" }]}
      />

      <section className="section-y">
        <div className="container-gk mx-auto max-w-3xl">
          {categories.map((category) => (
            <div key={category} className="mb-10">
              <h2 className="font-display text-2xl font-medium md:text-3xl">{category}</h2>
              <Accordion className="mt-3">
                {faqs
                  .filter((f) => f.category === category)
                  .map((faq, i) => (
                    <AccordionItem key={i} value={`${category}-${i}`} className="border-border">
                      <AccordionTrigger className="font-display text-base font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {faq.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        eyebrow="Still Have Questions?"
        title="Talk To A Travel Specialist"
        description="We're happy to help with anything that's on your mind before you book."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="Plan My Trip"
        secondaryHref="/plan-my-trip"
      />
    </>
  );
}
