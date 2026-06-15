import Link from "next/link";
import Image from "next/image";
import { Destination } from "@/lib/types";
import { categoryAccent, cn } from "@/lib/utils";

export function DestinationCard({ destination }: { destination: Destination }) {
  const accent = categoryAccent[destination.category];

  return (
    <Link
      href={`/tours?destination=${destination.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-xl"
    >
      <Image
        src={destination.image}
        alt={destination.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <span
          className={cn(
            "mb-2 inline-block rounded-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white",
            accent === "terracotta" ? "bg-terracotta" : "bg-teal"
          )}
        >
          {destination.region}
        </span>
        <h3 className="font-display text-xl font-medium text-white md:text-2xl">
          {destination.name}
        </h3>
        <p className="mt-1 text-xs text-white/75 line-clamp-1">
          {destination.tourCount} curated {destination.tourCount === 1 ? "tour" : "tours"}
        </p>
      </div>
    </Link>
  );
}
