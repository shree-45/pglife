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

/* 
  Glassmorphic About Page
  - Tailwind CSS required
  - Mobile-first, rounded bubbles, gradient-forward
  - Place images in public/images/
*/

/* ---------- Carousel (unchanged behavior, restyled) ---------- */
function Carousel({ images = [], interval = 4000, showDots = true, rounded = true }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const len = images.length;
  const timerRef = useRef(null);

  useEffect(() => {
    if (!len) return;
    if (!paused) {
      timerRef.current = window.setInterval(() => setIdx((i) => (i + 1) % len), interval);
    }
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [paused, interval, len]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + len) % len);
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % len);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [len]);

  if (!len) return null;

  return (
    <div
      className={`relative w-full ${rounded ? "rounded-2xl overflow-hidden" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <div className="relative h-64 md:h-72 lg:h-80 bg-gradient-to-b from-white/3 to-transparent">
        {images.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt || `slide-${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-600 ${
              i === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
            loading="lazy"
          />
        ))}
      </div>

      <button
        aria-label="Previous"
        onClick={() => setIdx((i) => (i - 1 + len) % len)}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 p-2 rounded-full shadow-md backdrop-blur"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        aria-label="Next"
        onClick={() => setIdx((i) => (i + 1) % len)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 p-2 rounded-full shadow-md backdrop-blur"
      >
        <ChevronRight size={18} />
      </button>

      {showDots && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Go to ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all ${i === idx ? "bg-amber-300 scale-125" : "bg-white/30"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Animated Number (dark theme) ---------- */
function AnimatedNumber({ to = 0, suffix = "", duration = 1200 }) {
  const [val, setVal] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    startRef.current = null;
    const step = (time) => {
      if (startRef.current === null) startRef.current = time;
      const elapsed = time - startRef.current;
      const progress = Math.min(1, elapsed / duration);
      const cur = Math.round(to * progress);
      setVal(cur);
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
      else rafRef.current = null;
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [to, duration]);

  return (
    <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
      {val}
      {suffix}
    </span>
  );
}

/* ---------- Main About Page (glass + rounded bubbles) ---------- */
export default function AboutPage() {
  const heroImages = [
    { src: "/images/pg1.jpeg", alt: "PG room 1" },
    { src: "/images/pg2.jpeg", alt: "PG room 2" },
    { src: "/images/pg3.jpeg", alt: "PG room 3" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#041024] via-[#07203a] to-[#08314a] text-white">
      {/* top hero glass card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-wide text-white/60">About PG LIFE</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              We make student living <span className="text-amber-300">simple & premium</span>
            </h1>
            <p className="text-white/70 max-w-xl">
              PG LIFE connects students and young professionals with safe, curated and affordable PG accommodations across India.
              Verified listings, trusted hosts and a modern booking experience.
            </p>

            <div className="flex gap-3 flex-wrap">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/8 text-white/90 bg-white/4 backdrop-blur"
              >
                Get in touch <ArrowRight />
              </a>

              <a
                href="#our-mission"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/8 text-white/90 bg-white/4 backdrop-blur"
              >
                Our mission
              </a>
            </div>

            {/* mini stats glass pills */}
            <div className="flex gap-3 flex-wrap mt-4">
              <div className="inline-flex items-center gap-4 px-4 py-3 rounded-xl bg-white/6 backdrop-blur border border-white/6">
                <div className="w-10 h-10 rounded-lg bg-amber-300 flex items-center justify-center text-black font-bold">PG</div>
                <div className="text-left">
                  <div className="text-sm font-semibold">Curated</div>
                  <div className="text-xs text-white/70">Verified & handpicked</div>
                </div>
              </div>

              <div className="inline-flex items-center gap-4 px-4 py-3 rounded-xl bg-white/6 backdrop-blur border border-white/6">
                <div className="w-10 h-10 rounded-lg bg-white/8 flex items-center justify-center">
                  <Phone />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold">Support</div>
                  <div className="text-xs text-white/70">24/7 assistance</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/6 bg-gradient-to-b from-white/3 to-transparent">
              <Carousel images={heroImages} interval={4800} rounded />
            </div>
          </div>
        </div>
      </section>

      {/* mission + how we work: glass split cards */}
      <section id="our-mission" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/6 backdrop-blur border border-white/6">
            <h2 className="text-2xl font-bold mb-3">Our story</h2>
            <p className="text-white/70 mb-4">
              Started in 2020, PG LIFE was founded after seeing how hard it is to find reliable, clean and affordable student housing in new cities.
              We set out to build a platform that combines local knowledge with simple booking, transparent pricing and verified hosts.
            </p>
            <p className="text-white/70">Trust, safety and user experience guide every decision we make — from verification checks to our 24/7 support.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/6 backdrop-blur border border-white/6">
            <h3 className="text-lg font-semibold mb-3">How we work</h3>
            <ul className="space-y-3 text-white/80">
              <li>• Curated listings with high-quality photos & amenities.</li>
              <li>• Host verification and periodic quality checks.</li>
              <li>• Flexible stays, transparent fees and 24/7 support.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* stats band - gradient heavy with glass cards */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-gradient-to-tr from-[#082033]/60 to-[#07304a]/30 border border-white/6 backdrop-blur">
            <AnimatedNumber to={1200} suffix="+" />
            <div className="text-sm text-white/70 mt-2">Verified listings</div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-tr from-[#082033]/60 to-[#07304a]/30 border border-white/6 backdrop-blur">
            <AnimatedNumber to={50} suffix="+" />
            <div className="text-sm text-white/70 mt-2">Cities covered</div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-tr from-[#082033]/60 to-[#07304a]/30 border border-white/6 backdrop-blur">
            <AnimatedNumber to={30000} suffix="+" />
            <div className="text-sm text-white/70 mt-2">Happy tenants</div>
          </div>
        </div>
      </section>

      {/* values (cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-2xl font-bold mb-6">What makes PG LIFE premium</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/6 backdrop-blur border border-white/6">
            <div className="p-3 inline-block bg-amber-100 rounded-full mb-4">
              <Shield />
            </div>
            <h4 className="font-semibold mb-2">Verified & Safe</h4>
            <p className="text-white/70">Every listing passes a verification checklist before going live.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/6 backdrop-blur border border-white/6">
            <div className="p-3 inline-block bg-amber-100 rounded-full mb-4">
              <Clock />
            </div>
            <h4 className="font-semibold mb-2">24/7 Support</h4>
            <p className="text-white/70">Check-in help and emergency support — whenever you need it.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/6 backdrop-blur border border-white/6">
            <div className="p-3 inline-block bg-amber-100 rounded-full mb-4">
              <Star />
            </div>
            <h4 className="font-semibold mb-2">Quality Hosts</h4>
            <p className="text-white/70">Top-rated hosts who care about guests.</p>
          </div>
        </div>
      </section>

      {/* team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-2xl font-bold mb-6">Meet the team</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { name: "Sagnik Rudra", role: "Co-Founder & CEO", img: "/images/sagnik.jpeg" },
            { name: "Our selling Item", role: "Head Product", img: "/images/rohit.png" },
            { name: "Partnerships", role: "Head Partnerships", img: "/images/meera.png" },
          ].map((m, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/6 backdrop-blur border border-white/6 text-center">
              <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4">
                <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
              </div>
              <div className="font-semibold">{m.name}</div>
              <div className="text-sm text-white/70">{m.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#02121b] to-[#07304a] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-2xl font-extrabold">Ready to find your perfect PG?</h4>
            <p className="mt-2 text-white/70">Join 30k+ students using PG LIFE to book verified rooms.</p>
          </div>

          <div className="flex gap-3">
            <a href="/listings" className="px-6 py-3 rounded-full bg-amber-300 text-black font-semibold shadow-lg">Browse listings</a>
            <a href="/contact" className="px-6 py-3 rounded-full border border-white/8 text-white/90">Contact us</a>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* small helper for stronger shadow */
        .shadow-2xl { box-shadow: 0 20px 50px rgba(2,6,23,0.6); }
      `}</style>
    </div>
  );
}
