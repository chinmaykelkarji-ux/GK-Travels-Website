import { redirect } from "next/navigation";

// Kept as a permanent route for backwards-compatible/bookmarked links;
// canonical content now lives at /tours/category/international-tours.
export default function InternationalToursPage() {
  redirect("/tours/category/international-tours");
}
