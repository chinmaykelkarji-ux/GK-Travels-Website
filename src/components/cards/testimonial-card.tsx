import Image from "next/image";
import { Star } from "lucide-react";
import { Testimonial } from "@/lib/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={
              i < testimonial.rating
                ? "h-4 w-4 fill-gold text-gold"
                : "h-4 w-4 text-border"
            }
          />
        ))}
      </div>
      <p className="mt-4 flex-1 font-display text-lg italic leading-relaxed text-foreground/90">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
        {testimonial.image && (
          <div className="relative h-11 w-11 overflow-hidden rounded-full">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">
            {testimonial.location} · {testimonial.tour}
          </p>
        </div>
      </div>
    </div>
  );
}
