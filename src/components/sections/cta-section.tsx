import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

interface CTASectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CTASection({
  eyebrow = "Start Planning",
  title,
  description,
  primaryLabel = "Plan My Trip",
  primaryHref = "/plan-my-trip",
  secondaryLabel,
  secondaryHref,
}: CTASectionProps) {
  return (
    <section className="section-y bg-primary text-primary-foreground">
      <Reveal className="container-gk flex flex-col items-center text-center">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-medium md:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 max-w-xl text-sm text-primary-foreground/75 md:text-base">
            {description}
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="rounded-sm bg-gold text-primary hover:bg-gold/90">
            <Link href={primaryHref}>{primaryLabel}</Link>
          </Button>
          {secondaryLabel && secondaryHref && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-sm border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          )}
        </div>
      </Reveal>
    </section>
  );
}
