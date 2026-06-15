"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
}

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = () => setActiveIndex(null);
  const showPrev = () =>
    setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  const showNext = () =>
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {images.map((image, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={
              "group relative overflow-hidden rounded-lg " +
              (i % 5 === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square")
            }
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/95 p-4"
          onClick={close}
        >
          <button
            aria-label="Close"
            onClick={close}
            className="absolute right-5 top-5 text-white/80 hover:text-white"
          >
            <X className="h-7 w-7" />
          </button>
          <button
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-3 text-white/70 hover:text-white md:left-8"
          >
            <ChevronLeft className="h-9 w-9" />
          </button>
          <div
            className="relative h-[70vh] w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <button
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-3 text-white/70 hover:text-white md:right-8"
          >
            <ChevronRight className="h-9 w-9" />
          </button>
        </div>
      )}
    </>
  );
}
