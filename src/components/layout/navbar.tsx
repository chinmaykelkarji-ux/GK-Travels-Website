"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { destinations } from "@/data/destinations";
import { cn } from "@/lib/utils";

const PHONE_DISPLAY = "+91 98765 43210";
const PHONE_HREF = "tel:+919876543210";

const navLinks = [
  { label: "Tours", href: "/tours" },
  { label: "Upcoming Departures", href: "/departures" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const pilgrimageDestinations = destinations.filter(
  (d) => d.category === "pilgrimage"
);
const internationalDestinations = destinations.filter(
  (d) => d.category === "international"
);

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        scrolled
          ? "border-border/70 bg-background/90 shadow-sm backdrop-blur-md"
          : "border-transparent bg-background/0"
      )}
    >
      <div className="container-gk flex h-18 items-center justify-between gap-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none shrink-0">
          <span className="font-display text-2xl font-semibold text-primary">
            GK<span className="text-gold"> Travel</span>
          </span>
          <span className="hidden md:block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-1">
            Journeys, Curated
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          <DestinationsMenu />
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-5">
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4 text-gold" />
            {PHONE_DISPLAY}
          </a>
          <Button asChild className="bg-gold text-primary hover:bg-gold/90 rounded-sm">
            <Link href="/plan-my-trip">Plan My Trip</Link>
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href={PHONE_HREF}
            aria-label="Call GK Travel"
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-border text-primary"
          >
            <Phone className="h-4 w-4" />
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon" className="rounded-sm" />
              }
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px]">
              <SheetHeader>
                <SheetTitle className="font-display text-xl">
                  GK <span className="text-gold">Travel</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                <MobileLink href="/destinations" onClick={() => setOpen(false)}>
                  Destinations
                </MobileLink>
                <MobileLink href="/pilgrimage-tours" onClick={() => setOpen(false)}>
                  Pilgrimage Tours
                </MobileLink>
                <MobileLink href="/international-tours" onClick={() => setOpen(false)}>
                  International Tours
                </MobileLink>
                {navLinks.map((link) => (
                  <MobileLink
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </MobileLink>
                ))}
                <div className="mt-4 px-4">
                  <Button
                    asChild
                    className="w-full bg-gold text-primary hover:bg-gold/90 rounded-sm"
                  >
                    <Link href="/plan-my-trip" onClick={() => setOpen(false)}>
                      Plan My Trip
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="px-4 py-3 text-base font-medium text-foreground/85 hover:text-primary border-b border-border/60"
    >
      {children}
    </Link>
  );
}

function DestinationsMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={cn(
          "flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary transition-colors",
          open && "text-primary"
        )}
      >
        Destinations
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-3">
          <div className="grid grid-cols-2 gap-6 rounded-sm border border-border bg-card p-6 shadow-xl">
            <div>
              <p className="eyebrow mb-3 !text-terracotta">Sacred Journeys</p>
              <ul className="space-y-2">
                {pilgrimageDestinations.map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={`/tours?destination=${d.slug}`}
                      className="text-sm text-foreground/80 hover:text-primary"
                    >
                      {d.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/pilgrimage-tours"
                className="mt-3 inline-block text-sm font-medium text-terracotta hover:underline"
              >
                View All Pilgrimage Tours →
              </Link>
            </div>
            <div>
              <p className="eyebrow mb-3 !text-teal">Signature Escapes</p>
              <ul className="space-y-2">
                {internationalDestinations.map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={`/tours?destination=${d.slug}`}
                      className="text-sm text-foreground/80 hover:text-primary"
                    >
                      {d.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/international-tours"
                className="mt-3 inline-block text-sm font-medium text-teal hover:underline"
              >
                View All International Tours →
              </Link>
            </div>
            <div className="col-span-2 border-t border-border pt-3">
              <Link
                href="/destinations"
                className="text-sm font-semibold text-primary hover:underline"
              >
                Browse All Destinations →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
