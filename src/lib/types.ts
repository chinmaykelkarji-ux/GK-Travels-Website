// Legacy 3-way grouping, retained for accent colours and the pilgrimage/escape split.
export type TourCategory = "pilgrimage" | "domestic" | "international";

export type DepartureStatus = "open" | "filling-fast" | "confirmed";

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meals?: string[];
  stay?: string;
}

export interface Hotel {
  name: string;
  location: string;
  category: string; // e.g. "4-Star Deluxe"
  image: string;
}

// Per-tour FAQ entry (from tours-data.js). Distinct from the site-wide
// FAQItem (category/question/answer) used by src/data/faq.ts.
export interface TourFaqItem {
  q: string;
  a: string;
}

export interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

export interface Departure {
  id: string;
  tourSlug: string;
  startDate: string; // ISO date
  endDate: string; // ISO date
  seatsTotal: number;
  seatsAvailable: number;
  status: DepartureStatus;
}

// The canonical Tour shape used across the site is NormalizedTour from
// @/lib/tours (derived live from src/data/tours-data.js). This Tour alias
// exists only for components that don't need the full normalized shape.
export interface Tour {
  slug: string;
  title: string;
  category: TourCategory;
  categories?: string[];
  destinationSlug: string;
  destinationName: string;
  durationDays: number;
  durationNights: number;
  price: number | null;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  groupSize?: string;
  bestTime: string;
  image: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  hotels: Hotel[];
  inclusions: string[];
  exclusions: string[];
  featured?: boolean;
}

export interface Destination {
  slug: string;
  name: string;
  category: TourCategory;
  region: string;
  image: string;
  tourCount: number;
  bestTime: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
  tour: string;
  image?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string[];
  image: string;
  author: string;
  date: string;
  readTime: string;
}

export interface FAQItem {
  category: string;
  question: string;
  answer: string;
}
