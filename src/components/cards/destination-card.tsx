import Image from "next/image";
import { DerivedDestination } from "@/lib/tours";
import { categoryAccent, cn } from "@/lib/utils";
import { MotionLink } from "@/components/motion/motion-elements";

export function DestinationCard({ destination }: { destination: DerivedDestination }) {
  const accent = categoryAccent[destination.legacyGroup];

  return (
    <MotionLink
      href={`/tours?destination=${destination.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-xl"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Image
        src={destination.image}
        alt={destination.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
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
    </MotionLink>
  );
}
