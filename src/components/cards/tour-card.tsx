import Link from "next/link";
import Image from "next/image";
import { Star, Clock } from "lucide-react";
import { Tour } from "@/lib/types";
import { categoryLabels, categoryAccent, formatPrice, cn } from "@/lib/utils";

export function TourCard({ tour }: { tour: Tour }) {
  const accent = categoryAccent[tour.category];

  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={cn(
            "absolute left-3 top-3 rounded-sm px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white",
            accent === "terracotta" ? "bg-terracotta" : "bg-teal"
          )}
        >
          {categoryLabels[tour.category]}
        </span>
        {tour.originalPrice && (
          <span className="absolute right-3 top-3 rounded-sm bg-gold px-2.5 py-1 text-[11px] font-semibold text-primary">
            Special Offer
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {tour.durationNights}N / {tour.durationDays}D · {tour.destinationName}
        </div>
        <h3 className="mt-1.5 font-display text-lg font-medium leading-snug text-foreground">
          {tour.title}
        </h3>
        <div className="mt-2 flex items-center gap-1 text-sm">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          <span className="font-medium">{tour.rating}</span>
          <span className="text-muted-foreground">({tour.reviewCount} reviews)</span>
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-border pt-3">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Starting from
            </p>
            <div className="flex items-baseline gap-2">
              <p className="font-display text-xl font-semibold text-primary">
                {formatPrice(tour.price)}
              </p>
              {tour.originalPrice && (
                <p className="text-xs text-muted-foreground line-through">
                  {formatPrice(tour.originalPrice)}
                </p>
              )}
            </div>
          </div>
          <span className="text-sm font-medium text-primary underline-offset-4 group-hover:underline">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}
