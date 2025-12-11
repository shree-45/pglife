import React from "react";
import { ArrowRight, Phone, Mail, Instagram, Linkedin } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="bg-[#222] text-white">
      {/* Contact Hero Section */}
      <section className="bg-white text-gray-900">
        <div className="max-w-6xl mx-auto px-6 py-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="text-xs uppercase tracking-wider text-gray-600">
              NEED HELP? →
            </div>

            <h2 className="text-5xl font-bold tracking-tight">
              Contact us
              <span className="block h-1 w-40 bg-yellow-400 mt-3"></span>
            </h2>
          </div>

          <div className="flex items-center">
            <button
              aria-label="contact"
              className="h-14 w-14 rounded-full bg-yellow-400 flex items-center justify-center shadow-xl"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* PG Life Footer Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-b from-[#111] to-[#1a1a1a] p-10 rounded-sm grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: PG Life Branding */}
          <div className="space-y-6">
            <div className="text-3xl font-extrabold leading-tight">
              PG <br /> LIFE®
            </div>
            <p className="text-sm text-gray-300 max-w-xs">
              India's fastest growing platform to find premium and affordable PG
              accommodation across top cities.
            </p>
          </div>

          {/* Column 2: Popular Cities */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide mb-4">
              POPULAR CITIES
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Delhi</li>
              <li>Mumbai</li>
              <li>Bengaluru</li>
              <li>Pune</li>
              <li>Hyderabad</li>
              <li>Kolkata</li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide mb-4">CONTACT</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>support@pglife.com</span>
              </li>

              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+91 98765 43210</span>
              </li>

              <li className="text-xs">
                PG Life Pvt. Ltd.<br />
                Connaught Place, New Delhi – 110001
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter + Social */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold tracking-wide mb-4">
                STAY UPDATED WITH PG LIFE
              </h3>

              <a
                href="#"
                className="block text-sm underline mb-6 hover:text-white"
              >
                Sign up for our newsletter →
              </a>

              <div className="text-sm mb-2">Follow us</div>
              <div className="flex items-center gap-4 text-gray-300">
                <a href="#" aria-label="Instagram" className="hover:text-white">
                  <Instagram />
                </a>

                <a href="#" aria-label="LinkedIn" className="hover:text-white">
                  <Linkedin />
                </a>

                <a href="#" aria-label="Twitter" className="hover:text-white">
                  <svg
                    width="22"
                    height="22"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557a9.93 9.93 0 0 ... Z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="text-xs text-gray-500 mt-6">
              © {new Date().getFullYear()} PG Life — All rights reserved.
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
