"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";   // ✅ ADD THIS

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">PG LIFE</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium">
          <li>
            <Link href="/" className="hover:text-blue-600">Home</Link>
          </li>

          <li>
            <Link href="/about" className="hover:text-blue-600">About</Link>
          </li>

          <li>
            <Link href="/contact" className="hover:text-blue-600">Contact</Link>
          </li>

          <li>
            <Link href="/signup" className="hover:text-blue-600">Sign Up</Link>
          </li>

          <li>
            <Link href="/login" className="hover:text-blue-600">Login</Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <ul className="md:hidden bg-white shadow-md px-6 py-4 space-y-4 text-lg font-medium">

          <li>
            <Link href="/" onClick={() => setOpen(false)} className="hover:text-blue-600">
              Home
            </Link>
          </li>

          <li>
            <Link href="/about" onClick={() => setOpen(false)} className="hover:text-blue-600">
              About
            </Link>
          </li>

          <li>
            <Link href="/contact" onClick={() => setOpen(false)} className="hover:text-blue-600">
              Contact
            </Link>
          </li>

          <li>
            <Link href="/signup" onClick={() => setOpen(false)} className="hover:text-blue-600">
              Sign Up
            </Link>
          </li>

          <li>
            <Link href="/login" onClick={() => setOpen(false)} className="hover:text-blue-600">
              Login
            </Link>
          </li>

        </ul>
      )}
    </nav>
  );
};

export default Navbar;
