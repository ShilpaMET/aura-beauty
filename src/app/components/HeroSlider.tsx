// src/app/components/HeroSlider.tsx
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { storyblokEditable } from "@storyblok/react";

const HeroSlider = ({ blok }: any) => {
  // If your hero_slider has a field "images" (array) or "image" (single),
  // adjust accordingly. Here we support both: blok.images[] or blok.image
  const slides = blok.images && blok.images.length ? blok.images : blok.image ? [blok] : [];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!slides.length) return;
    const id = setInterval(() => setCurrent((s) => (s + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <div {...storyblokEditable(blok)} className="absolute inset-0 w-full h-full">
      {slides.map((s: any, i: number) => {
        // s could be an asset object { filename } or the whole blok with s.image.filename
        const src = s.filename || s.image?.filename || s.image;
        const alt = s.alt || s.image?.alt || "Hero image";
        if (!src) return null;
        return (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === current ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={src}
              alt={alt}
              fill
              style={{ objectFit: "cover" }}
              priority={i === 0}
            />
          </div>
        );
      })}
    </div>
  );
};

export default HeroSlider;
