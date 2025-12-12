// app/layout.jsx
import React from "react";
import "./globals.css";

// adjust these import paths if your folder is named `components` instead of `component`
import Navbar from "../component/navbar";
import FooterMenu from "../component/FooterMenu";

export const metadata = {
  title: "PGLife",
  description: "PG LIFE — find premium PG accommodation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#041826] text-white">
        {/* Header (shows on every page) */}
        <Navbar />

        {/* Page content: add top padding so fixed navbar doesn't overlap content */}
        <main className="pt-16">{children}</main>

        {/* Footer (shows on every page) */}
        <FooterMenu />
      </body>
    </html>
  );
}
