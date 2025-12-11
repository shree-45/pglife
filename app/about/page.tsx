"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Phone,
  Mail,
  Instagram,
  Linkedin,
  Shield,
  Clock,
  Star,
} from "lucide-react";

/**
 * Single-file About Page for PG LIFE
 * Drop into app/about/page.js (or app/page.js).
 * Edit images, emails, phone numbers as needed.
 */

function AnimatedNumber({ to = 0, suffix = "", duration = 1200 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const totalFrames = Math.round(duration / 16);
    const increment = to / totalFrames;
    const raf = setInterval(() => {
      start += increment;
      if (start >= to) {
        setVal(to);
        clearInterval(raf);
      } else {
        setVal(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(raf);
  }, [to, duration]);
  return (
    <span className="text-4xl md:text-5xl font-extrabold">
      {val}
      {suffix}
    </span>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-2/3">
            <p className="text-sm uppercase tracking-wider text-gray-600 mb-4">
              About PG LIFE
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              We make student living{" "}
              <span className="border-b-4 border-yellow-400">simple & premium</span>
            </h1>
            <p className="mt-6 text-lg text-gray-700 max-w-2xl">
              PG LIFE connects students and young professionals with safe,
              curated and affordable PG accommodations across India. Verified
              listings, trusted hosts and a modern booking experience.
            </p>

            <div className="mt-8 flex gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-yellow-400 text-black font-semibold shadow"
              >
                Get in touch
                <ArrowRight />
              </a>

              <a
                href="#our-mission"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-gray-200 text-gray-700"
              >
                Our mission
              </a>
            </div>
          </div>

          <div className="md:w-1/3">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/pg-life-hero.jpg"
                alt="PG rooms preview"
                className="w-full h-64 object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="our-mission" className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our story</h2>
            <p className="text-gray-700 mb-4">
              Started in 2020, PG LIFE was founded after seeing how hard it is
              to find reliable, clean and affordable student housing in new
              cities. We set out to build a platform that combines local
              knowledge with simple booking, transparent pricing and verified
              hosts.
            </p>
            <p className="text-gray-700">
              Trust, safety and user experience guide every decision we make —
              from verification checks to our 24/7 customer support.
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
            <p className="text-gray-600">
              Every listing passes a verification checklist before going live.
            </p>
          </div>

          <div className="p-6 border rounded-lg bg-white shadow-sm">
            <div className="p-3 inline-block bg-yellow-100 rounded-md mb-4">
              <Clock />
            </div>
            <h4 className="font-semibold mb-2">24/7 Support</h4>
            <p className="text-gray-600">
              Check-in help and emergency support — whenever you need it.
            </p>
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
              name: "Ananya Roy",
              role: "Co-Founder & CEO",
              img: "/images/team/ananya.jpg",
            },
            {
              name: "Rohit Sen",
              role: "Head Product",
              img: "/images/team/rohit.jpg",
            },
            {
              name: "Meera Das",
              role: "Head Partnerships",
              img: "/images/team/meera.jpg",
            },
          ].map((m, i) => (
            <div key={i} className="bg-white p-6 rounded-lg text-center shadow">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
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
            <h4 className="text-2xl font-extrabold">
              Ready to find your perfect PG?
            </h4>
            <p className="mt-2 text-gray-300">
              Join 30k+ students using PG LIFE to book verified rooms.
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="/listings"
              className="px-6 py-3 rounded-full bg-yellow-400 font-semibold text-black"
            >
              Browse listings
            </a>
            <a
              href="/contact"
              className="px-6 py-3 rounded-full border border-gray-600"
            >
              Contact us
            </a>
          </div>
        </div>
      </section>
      </div>
  );
}
