import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { getAllDestinations } from "@/lib/tours";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/icons/social-icons";

const allDestinations = getAllDestinations();
const pilgrimage = allDestinations.filter((d) => d.legacyGroup === "pilgrimage");
const escapes = allDestinations.filter((d) => d.legacyGroup !== "pilgrimage");

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Final CTA strip */}
      <div className="border-b border-white/10">
        <div className="container-gk flex flex-col items-center justify-between gap-4 py-10 text-center md:flex-row md:text-left">
          <div>
            <h3 className="font-display text-2xl md:text-3xl">
              Have a destination in mind?
            </h3>
            <p className="mt-1 text-sm text-primary-foreground/70">
              Tell us your dream trip — our specialists will design it for you.
            </p>
          </div>
          <Link
            href="/plan-my-trip"
            className="inline-flex items-center justify-center rounded-sm bg-gold px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-gold/90"
          >
            Plan My Trip
          </Link>
        </div>
      </div>

      {/* Link columns */}
      <div className="container-gk grid grid-cols-1 gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <span className="font-display text-2xl font-semibold">
            GK<span className="text-gold"> Travel</span>
          </span>
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/70">
            Premium, fully-managed pilgrimage and international journeys —
            designed by travel specialists with 30+ years of on-ground
            expertise.
          </p>
          <div className="mt-6 space-y-3 text-sm text-primary-foreground/80">
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gold" />
              <a href="tel:+919876543210">+91 98765 43210</a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-gold" />
              <a href="mailto:hello@gktravel.com">hello@gktravel.com</a>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-gold mt-0.5" />
              <span>123 Travel House, MG Road, Lucknow, Uttar Pradesh, India</span>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            {[InstagramIcon, FacebookIcon, YoutubeIcon].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="flex h-9 w-9 items-center justify-center rounded-sm border border-white/15 text-primary-foreground/80 transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Sacred Journeys">
          {pilgrimage.map((d) => (
            <FooterLink key={d.slug} href={`/tours?destination=${d.slug}`}>
              {d.name}
            </FooterLink>
          ))}
          <FooterLink href="/tours/category/pilgrimage-tours">All Pilgrimage Tours</FooterLink>
        </FooterColumn>

        <FooterColumn title="Signature Escapes">
          {escapes.slice(0, 5).map((d) => (
            <FooterLink key={d.slug} href={`/tours?destination=${d.slug}`}>
              {d.name}
            </FooterLink>
          ))}
          <FooterLink href="/tours/category/international-tours">All International Tours</FooterLink>
        </FooterColumn>

        <FooterColumn title="Company">
          <FooterLink href="/about">About Us</FooterLink>
          <FooterLink href="/gallery">Gallery</FooterLink>
          <FooterLink href="/departures">Upcoming Departures</FooterLink>
          <FooterLink href="/blog">Blog</FooterLink>
          <FooterLink href="/faq">FAQ</FooterLink>
          <FooterLink href="/contact">Contact Us</FooterLink>
        </FooterColumn>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-gk flex flex-col gap-3 py-6 text-xs text-primary-foreground/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} GK Travel. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy-policy" className="hover:text-gold">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold">
              Terms &amp; Conditions
            </Link>
            <Link href="/refund-policy" className="hover:text-gold">
              Refund &amp; Cancellation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">
        {title}
      </h4>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
      >
        {children}
      </Link>
    </li>
  );
}
