import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validations";

// API-ready stub: validates the payload and shapes it into the standard
// GK Travel CRM lead schema (see docs/04-user-journey-conversion-crm.md).
// CRM webhook integration to be wired up in a later phase.
export async function POST(request: Request) {
  const body = await request.json();
  const parsed = inquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const lead = {
    lead_source: parsed.data.source,
    contact: {
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
    },
    interest: {
      tour_slug: parsed.data.tourSlug || null,
      tour_name: parsed.data.tourName || null,
      preferred_dates: parsed.data.travelDate || null,
      travelers: parsed.data.travelers || null,
    },
    message: parsed.data.message || null,
    submitted_at: new Date().toISOString(),
  };

  // TODO: forward `lead` to GK Travel CRM webhook once credentials are available.
  console.log("[GK Travel] New inquiry lead:", lead);

  return NextResponse.json({ success: true });
}
