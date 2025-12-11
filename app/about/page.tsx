"use client";

// ---------- Carousel (type-safe) ----------
import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Shield, Clock, Star } from "lucide-react";

type ImageItem = { src: string; alt?: string };

function Carousel({
  images = [] as ImageItem[],
  interval = 4000,
  showDots = true,
  rounded = true,
}: {
  images?: ImageItem[];
  interval?: number;
  showDots?: boolean;
  rounded?: boolean;
}) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const length = images.length;

  // Use number | null for DOM interval IDs
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (length === 0) return;

    if (!paused) {
      // window.setInterval returns a number in browser environments
      timerRef.current = window.setInterval(() => {
        setIdx((i) => (i + 1) % length);
      }, interval) as unknown as number;
    }

    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [paused, interval, length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // prev/next are function declarations so they are stable here
  }, [/* intentionally empty */]);

  function prev() {
    if (length === 0) return;
    setIdx((i) => (i - 1 + length) % length);
  }
  function next() {
    if (length === 0) return;
    setIdx((i) => (i + 1) % length);
  }

  if (length === 0) return null;

  return (
    <div
      className={`relative w-full ${rounded ? "rounded-lg overflow-hidden" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {/* Slides */}
      <div className="relative h-64 md:h-80">
        {images.map((img, i) => (
          <img
            key={img.src + i}
            src={img.src}
            alt={img.alt || `slide-${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              i === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
            loading="lazy"
          />
        ))}
      </div>

      {/* Prev / Next buttons */}
      <button
        aria-label="Previous slide"
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-2 rounded-full shadow-md"
        type="button"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        aria-label="Next slide"
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-2 rounded-full shadow-md"
        type="button"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      {showDots && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIdx(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === idx ? "bg-yellow-400 scale-125" : "bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* Animated number — smoother: use requestAnimationFrame */
function AnimatedNumber({ to = 0, suffix = "", duration = 1200 }: { to?: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const startTime = performance.now();
    const startVal = 0;
    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(1, elapsed / duration);
      const current = Math.round(startVal + (to - startVal) * progress);
      setVal(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [to, duration]);

  return (
    <span className="text-4xl md:text-5xl font-extrabold">
      {val}
      {suffix}
    </span>
  );
}

/* Main About page */
export default function AboutPage() {
  // images used by carousel (place these inside public/images/)
  const heroImages = [
    { src: "/images/pg1.jpeg", alt: "PG room 1" },
    { src: "/images/pg2.jpeg", alt: "PG room 2" },
    { src: "/images/pg3.jpeg", alt: "PG room 3" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-2/3">
            <p className="text-sm uppercase tracking-wider text-gray-600 mb-4">About PG LIFE</p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              We make student living <span className="border-b-4 border-yellow-400">simple & premium</span>
            </h1>
            <p className="mt-6 text-lg text-gray-700 max-w-2xl">
              PG LIFE connects students and young professionals with safe, curated and affordable PG accommodations across India. Verified listings, trusted hosts and a modern booking experience.
            </p>

            <div className="mt-8 flex gap-4">
              <a href="/contact" className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-yellow-400 text-black font-semibold shadow">
                Get in touch
                <ArrowRight />
              </a>

              <a href="#our-mission" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-gray-200 text-gray-700">
                Our mission
              </a>
            </div>
          </div>

          {/* Carousel placed on the right */}
          <div className="md:w-1/3 w-full">
            <Carousel images={heroImages} interval={4500} showDots rounded={true} />
          </div>
        </div>
      </section>

      {/* ... other sections unchanged ... */}

      {/* Example cards that use Shield/Clock/Star (now imported) */}
      {/* ... */}
    </div>
  );
}
