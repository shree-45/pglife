// app/contact/page.js
"use client";

import React, { useState } from "react";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

/**
 * Contact page for PG LIFE
 * Drop into: app/contact/page.js
 *
 * Notes:
 * - This component is client-side ("use client")
 * - Form currently POSTS to /api/contact (not included). See instructions below to add a serverless handler.
 * - If you don't want a backend, set `sendToApi=false` and the form will only show the success UI.
 */

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // null | "success" | "error"
  const [errorMsg, setErrorMsg] = useState("");

  // Set false if you don't have a server endpoint yet
  const sendToApi = true;

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
      // Demo success flow
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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="text-sm uppercase tracking-wide text-gray-600 mb-4">
            Need help?
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Contact us
          </h1>

          <p className="text-lg text-gray-700 max-w-3xl">
            Have a question about a listing, booking or verification? Drop us a message and our support team will get back to you within one business day.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        {/* Left: Contact info */}
        <div className="md:col-span-1 bg-[#111] text-white rounded-lg p-8 shadow-md">
          <div className="text-2xl font-extrabold mb-4">PG LIFE®</div>

          <p className="text-sm text-gray-200 mb-6">
            India's fastest growing PG platform — find premium and affordable accommodation across top cities.
          </p>

          <div className="space-y-4 text-sm text-gray-200">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white/8 rounded">
                <Mail size={18} />
              </div>
              <div>
                <div className="font-semibold">Email</div>
                <div className="text-gray-300">support@pglife.com</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-white/8 rounded">
                <Phone size={18} />
              </div>
              <div>
                <div className="font-semibold">Phone</div>
                <div className="text-gray-300">+000000000</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-white/8 rounded">
                <MapPin size={18} />
              </div>
              <div>
                <div className="font-semibold">Office</div>
                <div className="text-gray-300">Connaught Place, New Delhi — 110001</div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-full font-semibold shadow"
            >
              Message us <ArrowRight />
            </a>
          </div>
        </div>

        {/* Right: Form */}
        <div className="md:col-span-2 bg-white rounded-lg p-8 shadow-md">
          {status === "success" ? (
            <div className="text-center py-16">
              <div className="text-2xl font-bold text-green-600 mb-2">Thanks — message sent!</div>
              <div className="text-gray-600 mb-6">We’ll reply to your email shortly.</div>
              <button
                onClick={() => setStatus(null)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <span className="text-sm font-medium mb-2">Your name</span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    placeholder="e.g. Ananya Roy"
                    required
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium mb-2">Email</span>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    placeholder="you@domain.com"
                    required
                  />
                </label>
              </div>

              <div>
                <label className="flex flex-col">
                  <span className="text-sm font-medium mb-2">Phone (optional)</span>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    placeholder="+91 98765 43210"
                  />
                </label>
              </div>

              <div>
                <label className="flex flex-col">
                  <span className="text-sm font-medium mb-2">Message</span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    className="rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    placeholder="Tell us about your question or request..."
                    required
                  />
                </label>
              </div>

              {errorMsg && <div className="text-sm text-red-600">{errorMsg}</div>}

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-3 bg-yellow-400 text-black px-5 py-3 rounded-full font-semibold shadow hover:brightness-95 disabled:opacity-60"
                >
                  {sending ? "Sending..." : "Send message"}
                  <ArrowRight />
                </button>

                <div className="text-sm text-gray-500">or email us at <a className="underline" href="mailto:support@pglife.com">support@pglife.com</a></div>
              </div>
            </form>
          )}
        </div>

        {/* Optional: full-width map/embed */}
        <div className="md:col-span-3 mt-6">
  {/* Address-based embed (works for most addresses) */}
<div className="mt-6 rounded-lg overflow-hidden shadow">
  <iframe
    title="PG LIFE Location"
    src="https://www.google.com/maps?q=Kapurthala+Highway,+Kapurthala,+Punjab+144603&output=embed"
    width="100%"
    height="320"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
  ></iframe>
</div>

        </div>
      </main>
    </div>
  );
}
