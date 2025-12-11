// app/page.js
"use client";

import Navbar from "../component/navbar";
import FooterMenu from "../component/FooterMenu";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-[70vh] p-6">
        <h1 className="text-2xl font-bold mb-4">Your Main Page Content</h1>
        <p>Put your content here — Home page only.</p>
      </main>

      <FooterMenu />
    </>
  );
}
