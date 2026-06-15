"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/** `next/link` wrapped with Framer Motion for hover/tap interactions on card links. */
export const MotionLink = motion.create(Link);
