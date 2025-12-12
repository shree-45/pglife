// component/navbar.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/listings", label: "Listings" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/signup", label: "Sign Up" },
    { href: "/login", label: "Login" },
  ];

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50">
        <div className="backdrop-blur-md bg-gradient-to-r from-white/4 via-white/2 to-white/3 border-b border-white/6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <Link href="/" className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-300 to-amber-400 flex items-center justify-center text-black font-bold shadow-sm">
                    PG
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-white font-bold leading-none">PG LIFE</div>
                    <div className="text-xs text-white/60 -mt-0.5">Find calm, curated stays</div>
                  </div>
                </Link>
              </div>

              {/* Desktop center links */}
              <div className="hidden md:flex md:items-center md:space-x-6">
                {navLinks.slice(0, 3).map((l) => (
                  <Link key={l.href} href={l.href} className="text-sm text-white/85 hover:text-white transition">
                    {l.label}
                  </Link>
                ))}
              </div>

              {/* Right actions */}
              <div className="flex items-center gap-3">
                <button
                  aria-label="Search"
                  className="hidden md:inline-flex items-center gap-2 bg-white/6 backdrop-blur-sm px-3 py-2 rounded-full text-white/90 text-sm border border-white/6 hover:scale-102 transition"
                >
                  <Search size={16} /> <span className="hidden sm:inline">Search</span>
                </button>

                <div className="hidden md:flex items-center gap-2">
                  <Link href="/signup" className="px-3 py-2 rounded-full bg-amber-300 text-black font-semibold text-sm shadow-sm hover:opacity-95 transition">
                    Get started
                  </Link>
                </div>

                <button
                  className="md:hidden p-2 rounded-lg text-white/90 hover:bg-white/6"
                  onClick={() => setOpen((s) => !s)}
                  aria-label="Toggle menu"
                >
                  {open ? <X size={22} /> : <Menu size={22} />}
                </button>

                <div className="hidden md:flex items-center gap-4 ml-2">
                  {navLinks.slice(3).map((l) => (
                    <Link key={l.href} href={l.href} className="text-sm text-white/80 hover:text-white transition">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* mobile dropdown */}
        <div
          className={`md:hidden origin-top-right transform transition-all ${open ? "scale-y-100 opacity-100" : "scale-y-95 opacity-0 pointer-events-none"}`}
          style={{ transformOrigin: "top right" }}
        >
          <div className="px-4 pt-4 pb-6 bg-gradient-to-b from-[#04202b]/80 to-[#061b2a]/70 border-t border-white/6 backdrop-blur-md">
            <div className="space-y-3">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-white/90 px-3 py-2 rounded-lg hover:bg-white/6 transition"
                >
                  {l.label}
                </Link>
              ))}

              <div className="pt-2">
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="block text-center px-4 py-2 rounded-full bg-amber-300 text-black font-semibold shadow-sm"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* NOTE: no spacer here — layout handles top padding */}
    </>
  );
}
