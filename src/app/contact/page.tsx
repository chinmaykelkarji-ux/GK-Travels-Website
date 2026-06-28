import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { PHONE_DISPLAY, TEL_HREF, EMAIL, MAILTO_BASE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with GK Travels — call, WhatsApp or send us a message and our travel specialists will get back to you shortly.",
};

const contactDetails = [
  {
    icon: Phone,
    title: "Call Us",
    lines: [PHONE_DISPLAY, "Mon – Sat, 9:30 AM – 7:00 PM"],
    href: TEL_HREF,
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: [EMAIL, "We reply within 24 hours"],
    href: MAILTO_BASE,
  },
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["123 Travel House, MG Road", "Lucknow, Uttar Pradesh, India"],
  },
  {
    icon: Clock,
    title: "Office Hours",
    lines: ["Monday – Saturday", "9:30 AM – 7:00 PM IST"],
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Contact Us"
        description="Have a question about a tour, an existing booking, or just want to say hello? We'd love to hear from you."
        image="https://picsum.photos/seed/gk-contact-hero/1920/1080"
        breadcrumb={[{ label: "Contact" }]}
      />

      <section className="section-y">
        <div className="container-gk grid grid-cols-1 gap-12 lg:grid-cols-3">
          <StaggerGroup className="space-y-6 lg:col-span-1">
            {contactDetails.map(({ icon: Icon, title, lines, href }) => (
              <StaggerItem key={title} className="flex gap-4 rounded-xl border border-border bg-card p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-primary/5 text-primary">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-base font-medium">{title}</h3>
                  {lines.map((line, i) =>
                    href && i === 0 ? (
                      <a key={line} href={href} className="block text-sm text-muted-foreground hover:text-primary">
                        {line}
                      </a>
                    ) : (
                      <p key={line} className="text-sm text-muted-foreground">
                        {line}
                      </p>
                    )
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal className="lg:col-span-2" delay={0.1}>
            <div className="rounded-xl border border-border bg-card p-6 md:p-8">
              <h2 className="font-display text-2xl font-medium md:text-3xl">
                Send Us a Message
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Fill out the form below and our team will get back to you
                shortly.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="pb-20 md:pb-28">
        <div className="container-gk">
          <Reveal className="relative h-[360px] w-full overflow-hidden rounded-xl border border-border">
            <iframe
              title="GK Travel Office Location"
              src="https://www.google.com/maps?q=Lucknow,Uttar%20Pradesh,India&output=embed"
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
