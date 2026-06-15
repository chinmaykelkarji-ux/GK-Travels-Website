import Link from "next/link";
import { Users } from "lucide-react";
import { Departure } from "@/lib/types";
import { getDepartureTour } from "@/data/departures";
import { formatDate, formatPrice, cn } from "@/lib/utils";

const statusStyles: Record<Departure["status"], { label: string; className: string }> = {
  open: { label: "Open for Booking", className: "text-sage" },
  "filling-fast": { label: "Filling Fast", className: "text-terracotta" },
  confirmed: { label: "Confirmed Departure", className: "text-sage" },
};

export function DepartureCard({ departure }: { departure: Departure }) {
  const tour = getDepartureTour(departure);
  const status = statusStyles[departure.status];

  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group flex min-w-[300px] flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-lg sm:min-w-0 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-sm bg-secondary text-center">
          <span className="text-xs font-medium uppercase text-muted-foreground">
            {new Date(departure.startDate).toLocaleDateString("en-IN", { month: "short" })}
          </span>
          <span className="font-display text-xl font-semibold text-primary">
            {new Date(departure.startDate).getDate()}
          </span>
        </div>
        <div>
          <h4 className="font-display text-base font-medium text-foreground group-hover:text-primary">
            {tour.title}
          </h4>
          <p className="mt-1 text-xs text-muted-foreground">
            {formatDate(departure.startDate)} – {formatDate(departure.endDate)} ·{" "}
            {tour.durationNights}N/{tour.durationDays}D
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-1">
        <p className="font-display text-lg font-semibold text-primary">
          {formatPrice(tour.price)}
        </p>
        <p className={cn("flex items-center gap-1 text-xs font-medium", status.className)}>
          <Users className="h-3.5 w-3.5" />
          {departure.status === "confirmed"
            ? status.label
            : `${status.label} · ${departure.seatsAvailable} seats left`}
        </p>
      </div>
    </Link>
  );
}
