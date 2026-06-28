import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllDestinations, TOUR_CATEGORIES } from "@/lib/tours";

export function TourSearch() {
  const destinations = getAllDestinations();
  return (
    <section className="relative z-10">
      <div className="container-gk -mt-8 md:-mt-12">
        <form
          action="/tours"
          method="GET"
          className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-lg md:flex-row md:items-end md:gap-4 md:p-5"
        >
          <div className="flex-1 space-y-1.5">
            <label htmlFor="destination" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Destination
            </label>
            <select
              id="destination"
              name="destination"
              defaultValue=""
              className="h-11 w-full rounded-sm border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Anywhere</option>
              {destinations.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 space-y-1.5">
            <label htmlFor="category" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Journey Type
            </label>
            <select
              id="category"
              name="category"
              defaultValue=""
              className="h-11 w-full rounded-sm border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">All Journeys</option>
              {TOUR_CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <Button type="submit" size="lg" className="h-11 rounded-sm bg-primary hover:bg-primary/90 md:px-8">
            <Search className="mr-2 h-4 w-4" />
            Search Tours
          </Button>
        </form>
      </div>
    </section>
  );
}
