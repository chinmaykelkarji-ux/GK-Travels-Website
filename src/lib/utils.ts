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
};

export const categoryAccent: Record<string, string> = {
  pilgrimage: "terracotta",
  domestic: "teal",
  international: "teal",
};
