"use client";

import React, { useEffect, useRef, useState } from "react";
import { Search, ArrowRight, Star, MapPin, Heart } from "lucide-react";

/* 
  Clean HomePage for PGLife
  - Tailwind required
  - Assumes Navbar is rendered in layout (so no header here)
  - Place images in public/images/
*/

function FancySearch({
  placeholder = "Search city, neighbourhood or PG (e.g. Bengaluru, Koramangala)",
  suggestions = [],
  onSearch = (q) => {},
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(-1);
  const containerRef = useRef(null);

  const filtered = query.trim()
    ? suggestions
        .filter((s) => s.toLowerCase().includes(query.trim().toLowerCase()))
        .slice(0, 6)
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
    <div ref={containerRef} className="relative w-full max-w-3xl">
      <label className="sr-only">Search PG</label>

      <div
        role="search"
        className="flex items-center gap-3 bg-white/8 backdrop-blur-md rounded-3xl px-4 py-3 shadow-2xl border border-white/10"
      >
        <div className="p-2 bg-white/12 rounded-full flex items-center justify-center border border-white/6">
          <Search size={18} className="text-amber-300" />
        </div>

        <input
          className="flex-1 bg-transparent outline-none placeholder-slate-300 text-white text-base"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKey}
          aria-autocomplete="list"
          aria-expanded={open}
        />

        <button
          aria-label="Search"
          onClick={() => {
            onSearch(query);
            setOpen(false);
            setActive(-1);
          }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-black px-4 py-2 rounded-full font-semibold shadow-md"
        >
          Search <ArrowRight size={16} />
        </button>
      </div>

      {open && filtered.length > 0 && (
        <ul className="absolute left-0 right-0 mt-3 bg-white/6 backdrop-blur rounded-2xl shadow-lg border border-white/8 overflow-hidden z-40">
          {filtered.map((s, i) => (
            <li
              key={s + i}
              onMouseDown={(e) => {
                e.preventDefault();
                setQuery(s);
                onSearch(s);
                setOpen(false);
                setActive(-1);
              }}
              onMouseEnter={() => setActive(i)}
              role="option"
              aria-selected={i === active}
              className={`px-4 py-3 cursor-pointer flex items-center justify-between text-sm transition ${
                i === active ? "bg-white/10" : "hover:bg-white/6"
              }`}
            >
              <div className="flex items-center gap-3">
                <MapPin size={14} className="opacity-75 text-white/80" />
                <span className="text-white/90">{s}</span>
              </div>

              <span className="text-xs text-white/60">Popular</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SmallCarousel({ items = [] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!items.length) return;
    const t = setInterval(() => setI((p) => (p + 1) % items.length), 4800);
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
              className={`p-5 rounded-3xl bg-gradient-to-b from-white/6 to-white/3 backdrop-blur-md border border-white/6 transition-transform duration-500 ${
                visible ? "scale-100 opacity-100 shadow-2xl" : "scale-98 opacity-60"
              }`}
            >
              <div className="h-44 rounded-2xl overflow-hidden mb-4 bg-slate-800">
                <img src={it.image} alt={it.title} className="w-full h-full object-cover" loading="lazy" />
              </div>

              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-white">{it.title}</h4>
                <div className="flex items-center gap-1 text-amber-300">
                  <Star size={14} />
                  <span className="ml-0.5 text-sm font-medium">{it.rating}</span>
                </div>
              </div>

              <p className="text-sm text-white/70 mt-2">{it.desc}</p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-white/60">{it.meta || "Private / Shared"}</span>
                <button className="inline-flex items-center gap-2 text-rose-300 text-sm hover:underline">
                  <Heart size={14} /> Save
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
        <button
          onClick={() => setI((p) => (p - 1 + items.length) % items.length)}
          className="px-3 py-2 bg-white/6 rounded-full shadow-sm border"
          aria-label="Previous"
        >
          ◀
        </button>
        <button
          onClick={() => setI((p) => (p + 1) % items.length)}
          className="px-3 py-2 bg-white/6 rounded-full shadow-sm border"
          aria-label="Next"
        >
          ▶
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
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
      meta: "1 km from metro",
    },
    {
      image: "/images/listing-2.jpg",
      title: "Premium double bed PG",
      rating: "4.8",
      desc: "AC · Breakfast · Study desk",
      meta: "AC included",
    },
    {
      image: "/images/listing-3.jpg",
      title: "Budget-friendly room",
      rating: "4.4",
      desc: "Hot water · Common lounge",
      meta: "Flexible stay",
    },
  ];

  function handleSearch(q) {
    // In a real app: router.push(`/listings?q=${encodeURIComponent(q)}`)
    window.alert("Searching: " + (q || "all listings"));
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#041024] via-[#07203a] to-[#08314a] text-white overflow-x-hidden">
      {/* HERO */}
      <section className="relative overflow-hidden py-10 lg:py-16">
        <div className="absolute -left-32 -top-20 w-96 h-96 rounded-full bg-gradient-to-tr from-amber-300 to-pink-400 opacity-20 blur-3xl pointer-events-none"></div>
        <div className="absolute right-0 top-12 w-80 h-80 rounded-full bg-gradient-to-tr from-cyan-300 to-sky-500 opacity-12 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-wide text-white/60">Welcome to</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
              PG LIFE — <span className="text-amber-300">softly curated</span> stays
            </h1>
            <p className="text-white/70 max-w-xl">A calm, premium experience — verified hosts, transparent pricing and friendly support.</p>

            <FancySearch suggestions={recommendations} onSearch={handleSearch} />

            <div className="flex gap-3 flex-wrap mt-4">
              {["Koramangala", "Andheri East", "Laxmi Nagar", "Kothrud", "Gachibowli", "Salt Lake"].map((c) => (
                <button key={c} onClick={() => handleSearch(c)} className="px-4 py-2 bg-white/6 rounded-full text-sm hover:bg-white/8">
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl transform hover:scale-102 transition duration-500 border border-white/6">
              <img src="/images/hero-1.jpg" alt="hero" className="w-full h-80 object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Featured listings</h3>
          <a href="/listings" className="text-sm text-amber-300">See all</a>
        </div>

        <SmallCarousel items={featured} />
      </section>

      {/* BENEFITS */}
      <section className="bg-white/4 border-t border-b border-white/6 py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/6 backdrop-blur border border-white/6">
            <h4 className="font-semibold mb-2">Verified Hosts</h4>
            <p className="text-white/70">In-person verification & regular checks.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/6 backdrop-blur border border-white/6">
            <h4 className="font-semibold mb-2">Flexible stays</h4>
            <p className="text-white/70">Short or long term — transparent pricing.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/6 backdrop-blur border border-white/6">
            <h4 className="font-semibold mb-2">24/7 Support</h4>
            <p className="text-white/70">Help with check-in and emergencies.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="rounded-2xl bg-gradient-to-r from-[#041826] to-[#08314a] text-white p-6 flex flex-col md:flex-row items-center justify-between gap-4 border border-white/6">
          <div>
            <h4 className="text-xl font-bold">Ready to find your perfect PG?</h4>
            <p className="text-white/70 mt-1">Search listings and book trusted stays — fast and calm.</p>
          </div>
          <div className="flex gap-3 mt-3 md:mt-0">
            <a href="/listings" className="bg-amber-300 text-black px-4 py-2 rounded-full font-semibold">Browse</a>
            <a href="/contact" className="px-4 py-2 rounded-full border border-white/8 text-white">Contact</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-6 lg:px-8 py-8 text-white/70 text-sm">
        <div className="flex items-center justify-between">
          <div>© {new Date().getFullYear()} PG LIFE</div>
          <div className="flex gap-4">Terms · Privacy</div>
        </div>
      </footer>

      <style jsx global>{`
        .shadow-2xl { box-shadow: 0 20px 50px rgba(2,6,23,0.6); }
        .scale-102 { transform: scale(1.02); }
      `}</style>
    </main>
  );
}
