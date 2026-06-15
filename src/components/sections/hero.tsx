"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { EASE_PREMIUM, staggerContainer, staggerItem } from "@/components/motion/reveal";

const trustItems = [
  "30+ Years of Experience",
  "50,000+ Happy Travellers",
  "200+ Curated Packages",
  "Dedicated Travel Manager",
];

export function Hero() {
  return (
    <section className="relative">
      <div className="relative h-[88vh] min-h-[600px] w-full overflow-hidden md:h-[92vh]">
        <ParallaxImage
          src="https://picsum.photos/seed/gk-hero-main/1920/1200"
          alt="A serene Himalayan temple at sunrise alongside a tropical beach escape"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-primary/10" />

        <motion.div
          className="container-gk relative flex h-full flex-col items-start justify-center text-white"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span variants={staggerItem} className="eyebrow">
            30+ Years of Curated Journeys
          </motion.span>
          <motion.h1
            variants={staggerItem}
            className="mt-4 max-w-2xl font-display text-4xl font-medium leading-tight sm:text-5xl md:text-6xl"
          >
            Journeys, Curated for You
          </motion.h1>
          <motion.p variants={staggerItem} className="mt-5 max-w-xl text-base text-white/85 md:text-lg">
            From sacred yatras across Kashi, Ayodhya and Char Dham to signature
            escapes in Bali, Dubai and Kashmir — every journey is designed,
            managed and looked after, end to end.
          </motion.p>

          <motion.div variants={staggerItem} className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-sm bg-gold text-primary hover:bg-gold/90"
            >
              <Link href="/plan-my-trip">Plan My Trip</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-sm border-terracotta/70 bg-transparent text-white hover:bg-terracotta hover:text-white"
            >
              <Link href="/pilgrimage-tours">Explore Sacred Journeys</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-sm border-teal/70 bg-transparent text-white hover:bg-teal hover:text-white"
            >
              <Link href="/international-tours">Explore Signature Escapes</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Trust strip */}
      <motion.div
        className="border-b border-border bg-card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: EASE_PREMIUM }}
      >
        <div className="container-gk flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-5 text-center md:justify-between">
          {trustItems.map((item) => (
            <p key={item} className="text-xs font-medium uppercase tracking-wider text-muted-foreground md:text-sm">
              {item}
            </p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
