"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Phone,
  Mail,
  Instagram,
  Linkedin,
  Shield,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type ImageItem = { src: string; alt?: string };

type CarouselProps = {
  images?: ImageItem[];
  interval?: number;
  showDots?: boolean;
  rounded?: boolean;
};

function Carousel({
  images = [],
  interval = 4000,
  showDots = true,
  rounded = true,
}: CarouselProps) {
  const [idx, setIdx] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);
  const length = images.length;

  // Use number | null for browser interval ID
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (length === 0) return;

    if (!paused) {
      // window.setInterval returns a number in browser
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

  // keyboard nav (left/right)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // prev/next are stable (function declarations) — no deps needed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            key={`${img.src}-${i}`}
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

/* Animated number — smoother with requestAnimationFrame but same concept */
function AnimatedNumber({ to = 0, suffix = "", duration = 1200 }: { to?: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState<number>(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    startRef.current = null;

    const step = (time: number) => {
      if (startRef.current === null) startRef.current = time;
      const elapsed = time - (startRef.current ?? 0);
      const progress = Math.min(1, elapsed / duration);
      const current = Math.round(to * progress);
      setVal(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
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
  const heroImages: ImageItem[] = [
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
              PG LIFE connects students and young professionals with safe, curated and affordable PG accommodations across India.
              Verified listings, trusted hosts and a modern booking experience.
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

      {/* STORY */}
      <section id="our-mission" className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our story</h2>
            <p className="text-gray-700 mb-4">
              Started in 2020, PG LIFE was founded after seeing how hard it is to find reliable, clean and affordable student housing in new cities.
              We set out to build a platform that combines local knowledge with simple booking, transparent pricing and verified hosts.
            </p>
            <p className="text-gray-700">
              Trust, safety and user experience guide every decision we make — from verification checks to our 24/7 customer support.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">How we work</h3>
            <ul className="space-y-3 text-gray-700">
              <li>• Curated listings with high-quality photos & amenities.</li>
              <li>• Host verification and periodic quality checks.</li>
              <li>• Flexible stays, transparent fees and 24/7 support.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-yellow-50">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <AnimatedNumber to={1200} suffix="+" />
            <div className="text-sm text-gray-600">Verified listings</div>
          </div>

          <div className="text-center md:text-left">
            <AnimatedNumber to={50} suffix="+" />
            <div className="text-sm text-gray-600">Cities covered</div>
          </div>

          <div className="text-center md:text-left">
            <AnimatedNumber to={30000} suffix="+" />
            <div className="text-sm text-gray-600">Happy tenants</div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h3 className="text-2xl font-bold mb-8">What makes PG LIFE premium</h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg bg-white shadow-sm">
            <div className="p-3 inline-block bg-yellow-100 rounded-md mb-4">
              <Shield />
            </div>
            <h4 className="font-semibold mb-2">Verified & Safe</h4>
            <p className="text-gray-600">Every listing passes a verification checklist before going live.</p>
          </div>

          <div className="p-6 border rounded-lg bg-white shadow-sm">
            <div className="p-3 inline-block bg-yellow-100 rounded-md mb-4">
              <Clock />
            </div>
            <h4 className="font-semibold mb-2">24/7 Support</h4>
            <p className="text-gray-600">Check-in help and emergency support — whenever you need it.</p>
          </div>

          <div className="p-6 border rounded-lg bg-white shadow-sm">
            <div className="p-3 inline-block bg-yellow-100 rounded-md mb-4">
              <Star />
            </div>
            <h4 className="font-semibold mb-2">Quality Hosts</h4>
            <p className="text-gray-600">Top-rated hosts who care about guests.</p>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h3 className="text-2xl font-bold mb-8">Meet the team</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              name: "Sagnik Rudra",
              role: "Co-Founder & CEO",
              img: "/images/sagnik.jpeg",
            },
            {
              name: "Our selling Item",
              role: "Head Product",
              img: "/images/rohit.png",
            },
            {
              name: "Partnerships",
              role: "Head Partnerships",
              img: "/images/meera.png",
            },
          ].map((m, i) => (
            <div key={i} className="bg-white p-6 rounded-lg text-center shadow">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img src={m.img} alt={m.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="font-semibold">{m.name}</div>
              <div className="text-sm text-gray-600">{m.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#111] text-white">
        <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-2xl font-extrabold">Ready to find your perfect PG?</h4>
            <p className="mt-2 text-gray-300">Join 30k+ students using PG LIFE to book verified rooms.</p>
          </div>

          <div className="flex gap-3">
            <a href="/listings" className="px-6 py-3 rounded-full bg-yellow-400 font-semibold text-black">
              Browse listings
            </a>
            <a href="/contact" className="px-6 py-3 rounded-full border border-gray-600">
              Contact us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
