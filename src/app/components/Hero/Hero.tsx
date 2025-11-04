"use client";

import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import { useState } from "react";

const Hero = ({ blok }: any) => {
  const images = Array.isArray(blok.background_image)
    ? blok.background_image
    : blok.background_image
    ? [blok.background_image]
    : [];

  const [current, setCurrent] = useState(0);

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section
      {...storyblokEditable(blok)}
      className="relative w-full h-[85vh] overflow-hidden pt-[84]"
    >
      {/* Slider Images */}
      <div
        className="whitespace-nowrap transition-all duration-500 ease-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="inline-block w-full h-full relative"
          >
            <Image
              src={img.filename}
              alt={blok.headline || "Slide Image"}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* LEFT GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

      {/* LEFT TEXT CONTENT */}
      <div className="absolute inset-0 flex items-center px-16">
        <div className="max-w-xl text-white">
          {blok.subheadline && (
            <p className="text-sm font-medium mb-2">{blok.subheadline}</p>
          )}

          {blok.headline && (
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              {blok.headline}
            </h1>
          )}

          {blok.description && (
            <p className="text-lg opacity-90 mb-6">
              {blok.description}
            </p>
          )}

          {blok.button_label && (
            <button className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition">
              {blok.button_label}
            </button>
          )}
        </div>
      </div>

      {/* NAVIGATION ARROWS */}
      {images.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/40 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl"
          >
            ‹
          </button>

          <button
            onClick={goNext}
            className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/40 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl"
          >
            ›
          </button>
        </>
      )}

      {/* DOT INDICATORS */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === i ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
