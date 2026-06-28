import type { MetadataRoute } from "next";
import { getAllTours, getAllDestinations, TOUR_CATEGORIES } from "@/lib/tours";
import { SITE_URL } from "@/lib/site";

const staticRoutes = [
  "",
  "/tours",
  "/destinations",
  "/departures",
  "/about",
  "/blog",
  "/gallery",
  "/faq",
  "/contact",
  "/plan-my-trip",
  "/privacy-policy",
  "/terms",
  "/refund-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const tourRoutes = getAllTours().map((tour) => ({
    url: `${SITE_URL}/tours/${tour.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const categoryRoutes = TOUR_CATEGORIES.map((c) => ({
    url: `${SITE_URL}/tours/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const destinationRoutes = getAllDestinations().map((d) => ({
    url: `${SITE_URL}/tours?destination=${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  const staticEntries = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  return [...staticEntries, ...categoryRoutes, ...tourRoutes, ...destinationRoutes];
}
