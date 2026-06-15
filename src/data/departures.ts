import { Departure } from "@/lib/types";
import { tours } from "./tours";

const addDays = (date: string, days: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
};

const tour = (slug: string) => tours.find((t) => t.slug === slug)!;

export const departures: Departure[] = [
  {
    id: "dep-1",
    tourSlug: "char-dham-yatra",
    startDate: "2026-07-05",
    endDate: addDays("2026-07-05", tour("char-dham-yatra").durationDays - 1),
    seatsTotal: 25,
    seatsAvailable: 6,
    status: "filling-fast",
  },
  {
    id: "dep-2",
    tourSlug: "kashmir-paradise-escape",
    startDate: "2026-07-10",
    endDate: addDays("2026-07-10", tour("kashmir-paradise-escape").durationDays - 1),
    seatsTotal: 16,
    seatsAvailable: 11,
    status: "open",
  },
  {
    id: "dep-3",
    tourSlug: "ayodhya-ram-mandir-darshan",
    startDate: "2026-07-18",
    endDate: addDays("2026-07-18", tour("ayodhya-ram-mandir-darshan").durationDays - 1),
    seatsTotal: 25,
    seatsAvailable: 0,
    status: "confirmed",
  },
  {
    id: "dep-4",
    tourSlug: "bali-honeymoon-bliss",
    startDate: "2026-08-02",
    endDate: addDays("2026-08-02", tour("bali-honeymoon-bliss").durationDays - 1),
    seatsTotal: 10,
    seatsAvailable: 7,
    status: "open",
  },
  {
    id: "dep-5",
    tourSlug: "kerala-backwaters-hills",
    startDate: "2026-08-09",
    endDate: addDays("2026-08-09", tour("kerala-backwaters-hills").durationDays - 1),
    seatsTotal: 14,
    seatsAvailable: 4,
    status: "filling-fast",
  },
  {
    id: "dep-6",
    tourSlug: "dubai-luxury-escape",
    startDate: "2026-08-15",
    endDate: addDays("2026-08-15", tour("dubai-luxury-escape").durationDays - 1),
    seatsTotal: 16,
    seatsAvailable: 9,
    status: "open",
  },
  {
    id: "dep-7",
    tourSlug: "kashi-spiritual-sojourn",
    startDate: "2026-08-22",
    endDate: addDays("2026-08-22", tour("kashi-spiritual-sojourn").durationDays - 1),
    seatsTotal: 20,
    seatsAvailable: 12,
    status: "open",
  },
  {
    id: "dep-8",
    tourSlug: "leh-ladakh-adventure",
    startDate: "2026-09-01",
    endDate: addDays("2026-09-01", tour("leh-ladakh-adventure").durationDays - 1),
    seatsTotal: 12,
    seatsAvailable: 3,
    status: "filling-fast",
  },
  {
    id: "dep-9",
    tourSlug: "rajasthan-royal-heritage",
    startDate: "2026-09-12",
    endDate: addDays("2026-09-12", tour("rajasthan-royal-heritage").durationDays - 1),
    seatsTotal: 18,
    seatsAvailable: 14,
    status: "open",
  },
  {
    id: "dep-10",
    tourSlug: "vietnam-discovery",
    startDate: "2026-09-20",
    endDate: addDays("2026-09-20", tour("vietnam-discovery").durationDays - 1),
    seatsTotal: 16,
    seatsAvailable: 10,
    status: "open",
  },
  {
    id: "dep-11",
    tourSlug: "goa-beach-retreat",
    startDate: "2026-10-03",
    endDate: addDays("2026-10-03", tour("goa-beach-retreat").durationDays - 1),
    seatsTotal: 20,
    seatsAvailable: 15,
    status: "open",
  },
  {
    id: "dep-12",
    tourSlug: "thailand-island-hopping",
    startDate: "2026-10-11",
    endDate: addDays("2026-10-11", tour("thailand-island-hopping").durationDays - 1),
    seatsTotal: 16,
    seatsAvailable: 2,
    status: "filling-fast",
  },
];

export const getDepartureTour = (departure: Departure) => tour(departure.tourSlug);
