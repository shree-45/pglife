// app/page.js
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Search, ArrowRight, Star } from "lucide-react";

/*
  Drop this file in app/page.js (or page.jsx).
  Assumes:
  - Tailwind is configured
  - root layout includes Navbar & FooterMenu
  - lucide-react is installed (npm i lucide-react)
  - Images placed in public/images/ (change filenames if needed)
*/

function FancySearch({
  placeholder = "Search city, neighbourhood or PG name (e.g. Bengaluru, Koramangala)",
  suggestions = [],
  onSearch = (q) => {},
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(-1);
  const containerRef = useRef(null);

  // filter suggestions by query
  const filtered = query.trim()
    ? suggestions.filter((s) =>
        s.toLowerCase().includes(query.trim().toLowerCase())
      ).slice(0, 6)
    : suggestions.slice(0, 6);

  useEffect(() => {
    function onDoc(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setActive(-1);
      }
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  function handleKey(e) {
    if (e.key === "ArrowDown") {
      setActive((a) => Math.min(a + 1, filtered.length - 1));
      setOpen(true);
    } else if (e.key === "ArrowUp") {
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      if (active >= 0 && filtered[active]) {
        setQuery(filtered[active]);
        onSearch(filtered[active]);
      } else {
        onSearch(query);
      }
      setOpen(false);
      setActive(-1);
    } else if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      <label className="sr-only">Search PG</label>

      <div
        className="flex items-center gap-3 bg-white rounded-full shadow-lg px-4 py-3 border border-transparent hover:border-gray-200 transition-all"
        role="search"
      >
        <div className="p-2 bg-yellow-50 rounded-full">
          <Search className="text-yellow-600" size={18} />
        </div>

        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          className="flex-1 outline-none text-gray-700 placeholder-gray-400"
          aria-autocomplete="list"
          aria-expanded={open}
        />

        <button
          onClick={() => {
            onSearch(query);
            setOpen(false);
            setActive(-1);
          }}
          className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold shadow hover:brightness-95 transition"
          aria-label="Search"
        >
          Search <ArrowRight size={16} />
        </button>
      </div>

      {/* suggestions dropdown */}
      {open && filtered.length > 0 && (
        <ul className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-30">
          {filtered.map((s, i) => (
            <li
              key={s + i}
              onMouseDown={(e) => {
                // prevent blur
                e.preventDefault();
                setQuery(s);
                onSearch(s);
                setOpen(false);
                setActive(-1);
              }}
              onMouseEnter={() => setActive(i)}
              className={`px-4 py-3 cursor-pointer flex items-center justify-between hover:bg-gray-50 transition ${
                i === active ? "bg-gray-50" : ""
              }`}
              role="option"
              aria-selected={i === active}
            >
              <span className="text-sm text-gray-700">{s}</span>
              <span className="text-xs text-gray-400">Popular</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* small single-row carousel for featured items */
function SmallCarousel({ items = [] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!items.length) return;
    const t = setInterval(() => setI((p) => (p + 1) % items.length), 3500);
    return () => clearInterval(t);
  }, [items.length]);

  if (!items.length) return null;

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((it, idx) => {
          const visible = idx === i;
          return (
            <article
              key={it.title}
              className={`p-4 rounded-xl shadow-md transform transition-all duration-400 ${
                visible ? "scale-100 opacity-100 z-10" : "scale-95 opacity-60"
              } bg-white`}
            >
              <div className="h-44 rounded-md overflow-hidden mb-4">
                <img src={it.image} alt={it.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{it.title}</h4>
                <div className="text-yellow-500 flex items-center gap-1"><Star size={14} />{it.rating}</div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{it.desc}</p>
            </article>
          );
        })}
      </div>

      {/* small nav */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
        <button onClick={() => setI((p) => (p - 1 + items.length) % items.length)} className="px-3 py-2 bg-white rounded-full shadow">◀</button>
        <button onClick={() => setI((p) => (p + 1) % items.length)} className="px-3 py-2 bg-white rounded-full shadow">▶</button>
      </div>
    </div>
  );
}

export default function HomePage() {
  // example suggestions and featured items — change as needed
  const recommendations = [
    "Bengaluru - Koramangala",
    "Mumbai - Andheri East",
    "Delhi - Laxmi Nagar",
    "Pune - Kothrud",
    "Hyderabad - Gachibowli",
    "Kolkata - Salt Lake",
  ];

  const featured = [
    {
      image: "/images/listing-1.jpg",
      title: "Cozy single bed near metro",
      rating: "4.6",
      desc: "Shared kitchen · 24/7 support · Wi-Fi",
    },
    {
      image: "/images/listing-2.jpg",
      title: "Premium double bed PG",
      rating: "4.8",
      desc: "AC · Breakfast · Study desk",
    },
    {
      image: "/images/listing-3.jpg",
      title: "Budget-friendly room",
      rating: "4.4",
      desc: "Hot water · Common lounge",
    },
  ];

  function handleSearch(q) {
    // replace this with actual search routing/logic
    alert("Search for: " + (q || "all listings"));
    // e.g., router.push(`/listings?q=${encodeURIComponent(q)}`)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-sm uppercase tracking-wide text-gray-500">Welcome to</h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              PG LIFE — find{" "}
              <span className="text-yellow-500">trusted</span> rooms, fast.
            </h1>
            <p className="text-gray-700 max-w-xl">
              Curated PGs with verified hosts, clear pricing and 24/7 support. Browse listings, check photos and book within minutes.
            </p>

            {/* search */}
            <FancySearch
              suggestions={recommendations}
              onSearch={handleSearch}
            />

            {/* chips */}
            <div className="flex gap-3 flex-wrap mt-4">
              {["Bengaluru", "Mumbai", "Delhi", "kolkata", "Punjab","Hyderabad"].map((c) => (
                <button
                  key={c}
                  onClick={() => handleSearch(c)}
                  className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 text-sm hover:shadow-md transition"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* promo card */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition">
              <img src="/images/hero-1.jpg" alt="hero" className="w-full h-96 object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* featured listings */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Featured listings</h3>
          <a href="/listings" className="text-sm text-yellow-500">See all</a>
        </div>

        <SmallCarousel items={featured} />
      </section>

      {/* values */}
      <section className="bg-white border-t border-b py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          <div className="p-6">
            <h4 className="font-semibold mb-2">Verified Hosts</h4>
            <p className="text-gray-600">In-person verification & regular checks.</p>
          </div>
          <div className="p-6">
            <h4 className="font-semibold mb-2">Flexible stays</h4>
            <p className="text-gray-600">Short or long term — transparent pricing.</p>
          </div>
          <div className="p-6">
            <h4 className="font-semibold mb-2">24/7 Support</h4>
            <p className="text-gray-600">Help with check-in and emergencies.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="rounded-2xl bg-gradient-to-r from-[#061018] to-[#0e2430] text-white p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-2xl font-bold">Ready to find your perfect PG?</h4>
            <p className="text-gray-300 mt-2">Search listings and book trusted stays — fast.</p>
          </div>
          <div className="flex gap-4">
            <a href="/listings" className="bg-yellow-400 text-black px-5 py-3 rounded-full font-semibold">Browse listings</a>
            <a href="/contact" className="px-5 py-3 rounded-full border border-white text-white">Contact us</a>
          </div>
        </div>
      </section>
    </main>
  );
}

