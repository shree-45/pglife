"use client";

import React, { useState } from "react";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // null | "success" | "error"
  const [errorMsg, setErrorMsg] = useState("");

  const sendToApi = true; // toggle if you don't have an API yet

  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  function validate() {
    if (!form.name.trim()) return "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email.";
    if (form.phone.trim() && !/^[\d+\-\s]{6,20}$/.test(form.phone))
      return "Please enter a valid phone number or leave it empty.";
    if (!form.message.trim() || form.message.trim().length < 10)
      return "Please enter a message (at least 10 characters).";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    setErrorMsg("");
    const v = validate();
    if (v) {
      setErrorMsg(v);
      return;
    }

    setSending(true);

    if (!sendToApi) {
      setTimeout(() => {
        setSending(false);
        setStatus("success");
      }, 700);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Failed to send message");
      }

      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong — try again later.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#031523] via-[#072034] to-[#071a2b] text-white antialiased">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-wide text-white/60">Need help?</p>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-2 leading-tight">Contact us</h1>
          <p className="text-white/70 max-w-2xl mx-auto mt-3">
            Questions about listings, bookings, or verification? Send us a message — our support team replies within one business day.
          </p>
        </div>

        {/* Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left: Glass Info Card */}
          <aside className="lg:col-span-1 rounded-2xl bg-white/6 backdrop-blur border border-white/8 p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-300 to-amber-400 flex items-center justify-center text-black font-bold shadow-md">PG</div>
              <div>
                <div className="font-semibold text-lg">PG LIFE</div>
                <div className="text-xs text-white/70">Find calm, curated stays</div>
              </div>
            </div>

            <p className="text-sm text-white/80 mb-6">
              India’s trusted PG platform — verified hosts, clear pricing, and friendly support.
            </p>

            <div className="space-y-4 text-sm text-white/80">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/8 rounded-md">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-white/70">support@pglife.com</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/8 rounded-md">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="font-semibold">Phone</div>
                  <div className="text-white/70">+91 98765 43210</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/8 rounded-md">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="font-semibold">Office</div>
                  <div className="text-white/70">Connaught Place, New Delhi — 110001</div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 text-black font-semibold shadow-md hover:scale-105 transition"
              >
                Message us <ArrowRight />
              </a>
            </div>
          </aside>

          {/* Right: Form Card */}
          <section className="lg:col-span-2 rounded-2xl bg-white/6 backdrop-blur border border-white/8 p-8 shadow-soft">
            {status === "success" ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 ring-4 ring-emerald-500/10 mx-auto mb-4">
                  <svg className="w-10 h-10 text-emerald-400" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Thanks — message sent!</h3>
                <p className="text-white/70 mt-2">We’ll reply to your email shortly.</p>
                <button
                  onClick={() => setStatus(null)}
                  className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 hover:bg-white/10 transition"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex flex-col">
                    <span className="text-sm text-white/80 mb-2">Your name</span>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="rounded-lg bg-white/5 border border-white/8 px-4 py-3 placeholder-white/40 text-white transition focus:outline-none focus:ring-2 focus:ring-amber-300"
                      placeholder="e.g. Ananya Roy"
                      required
                    />
                  </label>

                  <label className="flex flex-col">
                    <span className="text-sm text-white/80 mb-2">Email</span>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className="rounded-lg bg-white/5 border border-white/8 px-4 py-3 placeholder-white/40 text-white transition focus:outline-none focus:ring-2 focus:ring-amber-300"
                      placeholder="you@domain.com"
                      required
                    />
                  </label>
                </div>

                <div>
                  <label className="flex flex-col">
                    <span className="text-sm text-white/80 mb-2">Phone (optional)</span>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="rounded-lg bg-white/5 border border-white/8 px-4 py-3 placeholder-white/40 text-white transition focus:outline-none focus:ring-2 focus:ring-amber-300"
                      placeholder="+91 98765 43210"
                    />
                  </label>
                </div>

                <div>
                  <label className="flex flex-col">
                    <span className="text-sm text-white/80 mb-2">Message</span>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={6}
                      className="rounded-lg bg-white/5 border border-white/8 px-4 py-3 placeholder-white/40 text-white transition focus:outline-none focus:ring-2 focus:ring-amber-300"
                      placeholder="Tell us about your question or request..."
                      required
                    />
                  </label>
                </div>

                {errorMsg && <div className="text-sm text-rose-400">{errorMsg}</div>}

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-300 to-amber-400 text-black px-5 py-3 rounded-full font-semibold shadow hover:scale-102 disabled:opacity-60 transition"
                  >
                    {sending ? "Sending..." : "Send message"}
                    <ArrowRight />
                  </button>

                  <div className="text-sm text-white/70">or email <a className="underline text-white/90" href="mailto:support@pglife.com">support@pglife.com</a></div>
                </div>
              </form>
            )}
          </section>

          {/* Map / Embed */}
          <div className="lg:col-span-3 mt-6">
            <div className="rounded-2xl overflow-hidden border border-white/8 shadow-soft bg-white/4">
              <iframe
                title="PG LIFE Location"
                src="https://www.google.com/maps?q=Connaught+Place+New+Delhi&output=embed"
                width="100%"
                height="360"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>
        </main>
      </div>

      {/* tiny helpers */}
      <style jsx>{`
        /* slight helpful shadow class */
        .shadow-soft { box-shadow: 0 12px 40px rgba(2,8,23,0.5); }
        .hover\\:scale-102:hover { transform: scale(1.02); }
      `}</style>
    </div>
  );
}
