// Single source of truth for all tour data on the site.
// Reads exclusively from src/data/tours-data.js and normalizes it for UI consumption.
import { tours as rawTours } from "@/data/tours-data";
import type { Hotel, ItineraryDay, TourFaqItem } from "@/lib/types";

export type LegacyGroup = "pilgrimage" | "domestic" | "international";

export interface TourCategoryDef {
  slug: string;
  label: string;
  description: string;
}

export const TOUR_CATEGORIES: TourCategoryDef[] = [
  { slug: "domestic-tours", label: "Domestic Tours", description: "Curated journeys across India." },
  { slug: "international-tours", label: "International Tours", description: "Handpicked escapes beyond India." },
  { slug: "honeymoon-packages", label: "Honeymoon Packages", description: "Romantic getaways for newlyweds and couples." },
  { slug: "pilgrimage-tours", label: "Pilgrimage Tours", description: "Sacred journeys with comfortable darshan-focused itineraries." },
  { slug: "family-holidays", label: "Family Holidays", description: "Well-paced itineraries for travellers of every age." },
  { slug: "adventure-tours", label: "Adventure Tours", description: "Treks, high-altitude drives and outdoor thrills." },
  { slug: "luxury-tours", label: "Luxury Tours", description: "Premium stays and elevated experiences." },
  { slug: "wildlife-tours", label: "Wildlife Tours", description: "Safaris and nature-focused escapes." },
  { slug: "hill-station-tours", label: "Hill Station Tours", description: "Cool mountain air, valleys and scenic drives." },
  { slug: "beach-holidays", label: "Beach Holidays", description: "Sun, sand and coastal relaxation." },
  { slug: "weekend-getaways", label: "Weekend Getaways", description: "Short, easy escapes for a quick break." },
  { slug: "group-tours", label: "Group Tours", description: "Fixed-departure journeys for groups." },
  { slug: "corporate-tours", label: "Corporate Tours", description: "Custom-built offsites and incentive travel for teams." },
  { slug: "student-tours", label: "Student Tours", description: "Budget-friendly educational and group trips for students." },
  { slug: "customized-tours", label: "Customized Tours", description: "Fully tailored itineraries built around you." },
];

const CATEGORY_LABEL_BY_SLUG = new Map(TOUR_CATEGORIES.map((c) => [c.slug, c.label]));

// Destination-level classification rules. tours-data.js groups tours by destinationSlug
// (4 tiered packages per destination), so destination is the most reliable signal for
// the tour-type taxonomy requested. Tier (Budget/Premium) layers "Luxury Tours" on top.
const DESTINATION_CATEGORY_MAP: Record<string, string[]> = {
  "kashi-varanasi": ["pilgrimage-tours", "family-holidays"],
  ayodhya: ["pilgrimage-tours", "family-holidays"],
  "kashi-ayodhya-combo": ["pilgrimage-tours", "family-holidays", "group-tours"],
  "char-dham": ["pilgrimage-tours", "adventure-tours", "group-tours"],
  kashmir: ["hill-station-tours", "honeymoon-packages", "adventure-tours", "family-holidays"],
  "leh-ladakh": ["hill-station-tours", "adventure-tours"],
  rajasthan: ["luxury-tours", "family-holidays", "group-tours"],
  kerala: ["hill-station-tours", "beach-holidays", "honeymoon-packages", "family-holidays"],
  goa: ["beach-holidays", "honeymoon-packages", "weekend-getaways"],
  "south-india-grand-tour": ["pilgrimage-tours", "family-holidays", "group-tours"],
  dubai: ["luxury-tours", "honeymoon-packages", "family-holidays"],
  bali: ["honeymoon-packages", "beach-holidays", "luxury-tours"],
  thailand: ["beach-holidays", "family-holidays", "group-tours"],
  vietnam: ["adventure-tours", "family-holidays"],
  nepal: ["pilgrimage-tours", "adventure-tours", "hill-station-tours"],
  "singapore-malaysia": ["luxury-tours", "family-holidays", "honeymoon-packages"],
  "sri-lanka": ["beach-holidays", "wildlife-tours", "family-holidays"],
  maldives: ["honeymoon-packages", "beach-holidays", "luxury-tours"],
  meghalaya: ["hill-station-tours", "adventure-tours", "honeymoon-packages"],
  "sikkim-darjeeling": ["hill-station-tours", "adventure-tours", "honeymoon-packages"],
};

interface RawTour {
  id: string;
  slug: string;
  title: string;
  destination: string;
  destinationId: string;
  destinationSlug: string;
  region: string;
  country: string;
  category: string;
  tier: string;
  nights: number;
  days: number;
  duration: string;
  bestSeason: string;
  overview: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  hotels: string[] | Hotel[];
  transport: string;
  inclusions: string[];
  exclusions: string[];
  food: string[];
  shopping: string[];
  tips: string[];
  faq: TourFaqItem[];
  seoDescription: string;
  metaTitle: string;
  metaDescription: string;
  price: number | null;
  featured: boolean;
  active: boolean;
}

function classify(raw: RawTour): string[] {
  const categories = new Set<string>(DESTINATION_CATEGORY_MAP[raw.destinationSlug] ?? []);
  categories.add(raw.country === "India" ? "domestic-tours" : "international-tours");
  if (raw.tier === "Premium") categories.add("luxury-tours");
  if ((raw.nights ?? raw.days) <= 2) categories.add("weekend-getaways");
  return Array.from(categories);
}

function legacyGroupOf(categories: string[]): LegacyGroup {
  if (categories.includes("pilgrimage-tours")) return "pilgrimage";
  if (categories.includes("international-tours")) return "international";
  return "domestic";
}

const img = (seed: string, w = 1200, h = 900) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

function parseHotel(raw: string | Hotel, slug: string, index: number): Hotel {
  if (typeof raw !== "string") return raw as Hotel;
  const categoryMatch = raw.match(/\(([^)]+)\)/);
  const withoutCategory = raw.replace(/\s*\([^)]*\)$/, "");
  const [name, location] = withoutCategory.split(",").map((s) => s.trim());
  return {
    name: name ?? withoutCategory,
    location: location ?? "",
    category: categoryMatch?.[1] ?? "",
    image: img(`${slug}-hotel-${index}`, 400, 280),
  };
}

export interface NormalizedTour {
  id: string;
  slug: string;
  title: string;
  destination: string;
  destinationName: string;
  destinationSlug: string;
  region: string;
  country: string;
  tier: string;
  nights: number;
  days: number;
  durationNights: number;
  durationDays: number;
  duration: string;
  bestSeason: string;
  bestTime: string;
  overview: string;
  description: string;
  shortDescription: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  hotels: Hotel[];
  transport: string;
  inclusions: string[];
  exclusions: string[];
  food: string[];
  shopping: string[];
  tips: string[];
  faq: TourFaqItem[];
  seoDescription: string;
  metaTitle: string;
  metaDescription: string;
  price: number | null;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  groupSize?: string;
  featured: boolean;
  active: boolean;
  image: string;
  gallery: string[];
  categories: string[];
  category: LegacyGroup;
}

function normalize(raw: RawTour): NormalizedTour {
  const categories = classify(raw);
  return {
    ...raw,
    destinationName: raw.destination,
    durationNights: raw.nights,
    durationDays: raw.days,
    bestTime: raw.bestSeason,
    description: raw.overview ?? "",
    shortDescription: raw.metaDescription ?? raw.overview ?? "",
    hotels: Array.isArray(raw.hotels) ? raw.hotels.map((h, i) => parseHotel(h, raw.slug, i)) : [],
    food: raw.food ?? [],
    shopping: raw.shopping ?? [],
    tips: raw.tips ?? [],
    faq: raw.faq ?? [],
    price: raw.price ?? null,
    featured: Boolean(raw.featured),
    active: raw.active !== false,
    image: img(raw.slug, 1200, 900),
    gallery: [1, 2, 3, 4].map((n) => img(`${raw.slug}-g${n}`, 900, 700)),
    categories,
    category: legacyGroupOf(categories),
  };
}

const ALL_TOURS: NormalizedTour[] = (rawTours as RawTour[])
  .filter((t) => t.active !== false)
  .map(normalize);

export function getAllTours(): NormalizedTour[] {
  return ALL_TOURS;
}

export function getTourBySlug(slug: string): NormalizedTour | undefined {
  return ALL_TOURS.find((t) => t.slug === slug);
}

export function getToursByCategory(categorySlug: string): NormalizedTour[] {
  return ALL_TOURS.filter((t) => t.categories.includes(categorySlug));
}

export function getToursByDestination(destinationSlug: string): NormalizedTour[] {
  return ALL_TOURS.filter((t) => t.destinationSlug === destinationSlug);
}

export function getFeaturedTours(limit?: number): NormalizedTour[] {
  const featured = ALL_TOURS.filter((t) => t.featured);
  const pool = featured.length > 0 ? featured : ALL_TOURS;
  return typeof limit === "number" ? pool.slice(0, limit) : pool;
}

export function getRelatedTours(tour: NormalizedTour, limit = 3): NormalizedTour[] {
  const sameDestination = ALL_TOURS.filter(
    (t) => t.slug !== tour.slug && t.destinationSlug === tour.destinationSlug
  );
  const sameCategory = ALL_TOURS.filter(
    (t) => t.slug !== tour.slug && !sameDestination.includes(t) && t.categories.some((c) => tour.categories.includes(c))
  );
  return [...sameDestination, ...sameCategory].slice(0, limit);
}

export function searchTours(query: string): NormalizedTour[] {
  const q = query.trim().toLowerCase();
  if (!q) return ALL_TOURS;
  return ALL_TOURS.filter((t) =>
    [t.title, t.destination, t.region, t.country].some((field) => field?.toLowerCase().includes(q))
  );
}

export function getCategoryDef(slug: string): TourCategoryDef | undefined {
  return TOUR_CATEGORIES.find((c) => c.slug === slug);
}

export function categoryLabel(slug: string): string {
  return CATEGORY_LABEL_BY_SLUG.get(slug) ?? slug;
}

export interface DerivedDestination {
  slug: string;
  name: string;
  region: string;
  country: string;
  legacyGroup: LegacyGroup;
  categories: string[];
  image: string;
  tourCount: number;
  bestTime: string;
  featured: boolean;
}

export function getAllDestinations(): DerivedDestination[] {
  const map = new Map<string, DerivedDestination>();
  for (const tour of ALL_TOURS) {
    const existing = map.get(tour.destinationSlug);
    if (existing) {
      existing.tourCount += 1;
      for (const c of tour.categories) if (!existing.categories.includes(c)) existing.categories.push(c);
    } else {
      map.set(tour.destinationSlug, {
        slug: tour.destinationSlug,
        name: tour.destinationName,
        region: tour.region,
        country: tour.country,
        legacyGroup: tour.category,
        categories: [...tour.categories],
        image: img(tour.destinationSlug, 1200, 900),
        tourCount: 1,
        bestTime: tour.bestTime,
        featured: false,
      });
    }
  }
  const list = Array.from(map.values());
  // Feature the first 8 destinations for homepage display.
  list.slice(0, 8).forEach((d) => (d.featured = true));
  return list;
}

export function getDestinationBySlug(slug: string): DerivedDestination | undefined {
  return getAllDestinations().find((d) => d.slug === slug);
}

export type SortKey = "recommended" | "newest" | "duration-asc" | "duration-desc" | "name-asc";

export function sortTours(list: NormalizedTour[], sort: SortKey | string): NormalizedTour[] {
  const sorted = [...list];
  switch (sort) {
    case "duration-asc":
      return sorted.sort((a, b) => a.nights - b.nights);
    case "duration-desc":
      return sorted.sort((a, b) => b.nights - a.nights);
    case "name-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "newest":
      return sorted.sort((a, b) => b.id.localeCompare(a.id));
    default:
      return sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
}

export interface TourFilters {
  destination?: string;
  country?: string;
  category?: string;
  tier?: string;
  season?: string;
  minNights?: number;
  maxNights?: number;
  query?: string;
}

export function filterTours(filters: TourFilters): NormalizedTour[] {
  let results = ALL_TOURS;
  if (filters.query) {
    const q = filters.query.toLowerCase();
    results = results.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.destination.toLowerCase().includes(q) ||
        t.region.toLowerCase().includes(q)
    );
  }
  if (filters.destination) results = results.filter((t) => t.destinationSlug === filters.destination);
  if (filters.country) results = results.filter((t) => t.country === filters.country);
  if (filters.category) results = results.filter((t) => t.categories.includes(filters.category!));
  if (filters.tier) results = results.filter((t) => t.tier === filters.tier);
  if (filters.season) results = results.filter((t) => t.bestSeason.toLowerCase().includes(filters.season!.toLowerCase()));
  if (typeof filters.minNights === "number") results = results.filter((t) => t.nights >= filters.minNights!);
  if (typeof filters.maxNights === "number") results = results.filter((t) => t.nights <= filters.maxNights!);
  return results;
}

export function getAllCountries(): string[] {
  return Array.from(new Set(ALL_TOURS.map((t) => t.country))).sort();
}
