"use client";

import React, { useState } from "react";
import { Search, Heart, Star, MapPin, Filter } from "lucide-react";

export default function ListingsPage() {
  const [query, setQuery] = useState("");

  // Dummy PG listing data (replace with DB or API later)
  const listings = [
    {
      id: 1,
      name: "Cozy Single Bed Near Metro",
      location: "Koramangala, Bengaluru",
      rating: 4.6,
      distance: "1 km from metro",
      price: "₹9,000 / month",
      img: "/images/listing-1.jpg",
      amenities: ["Wi-Fi", "AC", "24/7 Support"],
    },
    {
      id: 2,
      name: "Premium Double Bed PG",
      location: "Andheri East, Mumbai",
      rating: 4.8,
      distance: "500m from station",
      price: "₹12,500 / month",
      img: "/images/listing-2.jpg",
      amenities: ["Breakfast", "Study Desk", "AC Included"],
    },
    {
      id: 3,
      name: "Budget-Friendly Room",
      location: "Laxmi Nagar, Delhi",
      rating: 4.4,
      distance: "Near Market",
      price: "₹7,000 / month",
      img: "/images/listing-3.jpg",
      amenities: ["Hot Water", "Common Lounge"],
    },
    {
      id: 4,
      name: "Luxury PG for Students",
      location: "Gachibowli, Hyderabad",
      rating: 4.9,
      distance: "Opp. Tech Park",
      price: "₹15,000 / month",
      img: "/images/listing-4.png",
      amenities: ["Gym", "Food", "Laundry"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#031523] via-[#072034] to-[#071a2b] text-white px-6 lg:px-12 py-14">

      {/* Page Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold">Available Listings</h1>
        <p className="text-white/70 mt-2">Find verified PGs, hostels, and co-living spaces near you.</p>
      </div>

      {/* Search + Filters */}
      <div className="max-w-4xl mx-auto mb-10 flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex items-center gap-3 bg-white/10 border border-white/10 backdrop-blur-md px-4 py-3 rounded-full flex-1">
          <Search size={20} className="text-amber-300" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by city, area, PG name..."
            className="bg-transparent w-full outline-none placeholder-white/40 text-white"
          />
        </div>

        {/* Filter Button */}
        <button className="flex items-center gap-2 bg-white/10 px-5 py-3 rounded-full border border-white/10 backdrop-blur hover:bg-white/20 transition">
          <Filter size={18} />
          Filters
        </button>
      </div>

      {/* Listings Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {listings
          .filter((pg) => pg.name.toLowerCase().includes(query.toLowerCase()))
          .map((pg) => (
            <div
              key={pg.id}
              className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur hover:scale-[1.02] transition shadow-lg"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={pg.img}
                  alt={pg.name}
                  className="w-full h-full object-cover hover:scale-105 transition"
                />
              </div>

              <div className="p-5 space-y-2">
                {/* Name + heart */}
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{pg.name}</h3>
                  <button className="text-white/60 hover:text-rose-300">
                    <Heart size={18} />
                  </button>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <MapPin size={14} />
                  {pg.location}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 text-amber-300 text-sm">
                  <Star size={14} />
                  {pg.rating}
                </div>

                {/* Distance */}
                <p className="text-white/50 text-sm">{pg.distance}</p>

                {/* Amenities */}
                <div className="flex gap-2 flex-wrap mt-2">
                  {pg.amenities.map((a, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-white/10 border border-white/10 rounded-full"
                    >
                      {a}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="pt-3 font-semibold text-amber-300">{pg.price}</div>
              </div>
            </div>
          ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <button className="px-6 py-3 rounded-full bg-white/10 backdrop-blur border border-white/10 hover:bg-white/20 transition">
          Load more
        </button>
      </div>

    </div>
  );
}
