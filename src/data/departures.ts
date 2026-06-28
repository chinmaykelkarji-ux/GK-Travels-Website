import { Departure } from "@/lib/types";
import { getTourBySlug } from "@/lib/tours";

const addDays = (date: string, days: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
};

const tour = (slug: string) => {
  const t = getTourBySlug(slug);
  if (!t) throw new Error(`Unknown tour slug in departures.ts: ${slug}`);
  return t;
};

export const departures: Departure[] = [
  {
    id: "dep-1",
    tourSlug: "gkt-015-char-dham-premium-4n",
    startDate: "2026-07-05",
    endDate: addDays("2026-07-05", tour("gkt-015-char-dham-premium-4n").durationDays - 1),
    seatsTotal: 25,
    seatsAvailable: 6,
    status: "filling-fast",
  },
  {
    id: "dep-2",
    tourSlug: "gkt-019-kashmir-premium-4n",
    startDate: "2026-07-10",
    endDate: addDays("2026-07-10", tour("gkt-019-kashmir-premium-4n").durationDays - 1),
    seatsTotal: 16,
    seatsAvailable: 11,
    status: "open",
  },
  {
    id: "dep-3",
    tourSlug: "gkt-007-ayodhya-premium-4n",
    startDate: "2026-07-18",
    endDate: addDays("2026-07-18", tour("gkt-007-ayodhya-premium-4n").durationDays - 1),
    seatsTotal: 25,
    seatsAvailable: 0,
    status: "confirmed",
  },
  {
    id: "dep-4",
    tourSlug: "gkt-047-bali-premium-4n",
    startDate: "2026-08-02",
    endDate: addDays("2026-08-02", tour("gkt-047-bali-premium-4n").durationDays - 1),
    seatsTotal: 10,
    seatsAvailable: 7,
    status: "open",
  },
  {
    id: "dep-5",
    tourSlug: "gkt-031-kerala-premium-4n",
    startDate: "2026-08-09",
    endDate: addDays("2026-08-09", tour("gkt-031-kerala-premium-4n").durationDays - 1),
    seatsTotal: 14,
    seatsAvailable: 4,
    status: "filling-fast",
  },
  {
    id: "dep-6",
    tourSlug: "gkt-043-dubai-premium-4n",
    startDate: "2026-08-15",
    endDate: addDays("2026-08-15", tour("gkt-043-dubai-premium-4n").durationDays - 1),
    seatsTotal: 16,
    seatsAvailable: 9,
    status: "open",
  },
  {
    id: "dep-7",
    tourSlug: "gkt-003-kashi-varanasi-premium-4n",
    startDate: "2026-08-22",
    endDate: addDays("2026-08-22", tour("gkt-003-kashi-varanasi-premium-4n").durationDays - 1),
    seatsTotal: 20,
    seatsAvailable: 12,
    status: "open",
  },
  {
    id: "dep-8",
    tourSlug: "gkt-023-leh-ladakh-premium-4n",
    startDate: "2026-09-01",
    endDate: addDays("2026-09-01", tour("gkt-023-leh-ladakh-premium-4n").durationDays - 1),
    seatsTotal: 12,
    seatsAvailable: 3,
    status: "filling-fast",
  },
  {
    id: "dep-9",
    tourSlug: "gkt-027-rajasthan-premium-4n",
    startDate: "2026-09-12",
    endDate: addDays("2026-09-12", tour("gkt-027-rajasthan-premium-4n").durationDays - 1),
    seatsTotal: 18,
    seatsAvailable: 14,
    status: "open",
  },
  {
    id: "dep-10",
    tourSlug: "gkt-055-vietnam-premium-4n",
    startDate: "2026-09-20",
    endDate: addDays("2026-09-20", tour("gkt-055-vietnam-premium-4n").durationDays - 1),
    seatsTotal: 16,
    seatsAvailable: 10,
    status: "open",
  },
  {
    id: "dep-11",
    tourSlug: "gkt-035-goa-premium-4n",
    startDate: "2026-10-03",
    endDate: addDays("2026-10-03", tour("gkt-035-goa-premium-4n").durationDays - 1),
    seatsTotal: 20,
    seatsAvailable: 15,
    status: "open",
  },
  {
    id: "dep-12",
    tourSlug: "gkt-051-thailand-premium-4n",
    startDate: "2026-10-11",
    endDate: addDays("2026-10-11", tour("gkt-051-thailand-premium-4n").durationDays - 1),
    seatsTotal: 16,
    seatsAvailable: 2,
    status: "filling-fast",
  },
];

export const getDepartureTour = (departure: Departure) => tour(departure.tourSlug);
