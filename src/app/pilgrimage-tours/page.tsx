import { redirect } from "next/navigation";

// Kept as a permanent route for backwards-compatible/bookmarked links;
// canonical content now lives at /tours/category/pilgrimage-tours.
export default function PilgrimageToursPage() {
  redirect("/tours/category/pilgrimage-tours");
}
