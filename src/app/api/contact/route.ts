import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";

// API-ready stub — see docs/04-user-journey-conversion-crm.md for the
// standard CRM lead payload this will be mapped to.
export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  console.log("[GK Travel] New contact submission:", {
    lead_source: "contact_page",
    ...parsed.data,
    submitted_at: new Date().toISOString(),
  });

  return NextResponse.json({ success: true });
}
