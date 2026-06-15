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

export interface Departure {
  id: string;
  tourSlug: string;
  startDate: string; // ISO date
  endDate: string; // ISO date
  seatsTotal: number;
  seatsAvailable: number;
  status: DepartureStatus;
}

export interface Tour {
  slug: string;
  title: string;
  category: TourCategory;
  destinationSlug: string;
  destinationName: string;
  durationDays: number;
  durationNights: number;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  groupSize: string;
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
  shortDescription: string;
  description: string;
  whyVisit: string[];
  bestTime: string;
  tourCount: number;
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
