"use client";

import Navbar from "../component/navbar";
import FooterMenu from "../component/FooterMenu";
import HomePageContent from "../component/HomePageContent"; 
// ⬆ We will create this component next

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="pt-20">
        {/* Full Innovative Homepage UI */}
        <HomePageContent />
      </main>


    </>
  );
}
