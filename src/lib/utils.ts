import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export const categoryLabels: Record<string, string> = {
  pilgrimage: "Sacred Journeys",
  domestic: "Signature Escapes",
  international: "Signature Escapes",
  "Pilgrimage Tours": "Sacred Journeys",
  "North India": "North India",
  "South India": "South India",
  "West India": "West India",
  "North East India": "North East India",
  "Middle East": "Middle East",
  "Asia": "Asia",
  "Island Getaway": "Island Getaway",
};

export const categoryAccent: Record<string, string> = {
  pilgrimage: "terracotta",
  domestic: "teal",
  international: "teal",
  "Pilgrimage Tours": "terracotta",
  "North India": "teal",
  "South India": "teal",
  "West India": "teal",
  "North East India": "teal",
  "Middle East": "teal",
  "Asia": "teal",
  "Island Getaway": "teal",
};
