"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { staggerContainer, staggerItem } from "@/components/motion/reveal";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  image: string;
  breadcrumb?: { label: string; href?: string }[];
}

export function PageHero({ eyebrow, title, description, image, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative h-[42vh] min-h-[320px] w-full overflow-hidden md:h-[48vh]">
      <ParallaxImage src={image} alt={title} priority />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/40 to-primary/20" />

      <motion.div
        className="container-gk relative flex h-full flex-col items-start justify-center text-white"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {breadcrumb && (
          <motion.div variants={staggerItem} className="mb-3 flex items-center gap-1.5 text-xs text-white/70">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight className="h-3 w-3" />
                {item.href ? (
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white">{item.label}</span>
                )}
              </span>
            ))}
          </motion.div>
        )}
        {eyebrow && <motion.span variants={staggerItem} className="eyebrow">{eyebrow}</motion.span>}
        <motion.h1 variants={staggerItem} className="mt-2 max-w-2xl font-display text-3xl font-medium sm:text-4xl md:text-5xl">
          {title}
        </motion.h1>
        {description && (
          <motion.p variants={staggerItem} className="mt-3 max-w-xl text-sm text-white/85 md:text-base">
            {description}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
