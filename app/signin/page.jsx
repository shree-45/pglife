// app/signup/page.jsx
"use client";

import React, { useState } from "react";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    acceptTerms: false,
  });
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState({ loading: false, error: "", success: "" });

  // A few pretty sample images (Unsplash) — replace with your own /images/* if you prefer
  const gallery = [
    "https://images.unsplash.com/photo-1505691723518-36a3cf5f1f9d?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2b7b61a2d7a9e1b9f0d0bf0f8b7f1cf1",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=0f6b564a6a6f86f3a1b4f9aad3027b6a",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3fe7c9d07c12b1e5d1a9f6b10a5ad5b7",
  ];

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  }

  function validate() {
    if (!form.name.trim()) return "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email address.";
    if (form.phone && !/^[\d+\-\s]{6,20}$/.test(form.phone)) return "Please enter a valid phone number.";
    if (!form.password || form.password.length < 6) return "Password must be at least 6 characters.";
    if (form.password !== form.confirm) return "Passwords do not match.";
    if (!form.acceptTerms) return "Please accept the terms to continue.";
    return null;
  }

  // Client-only "fake" submit (no API)
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ loading: false, error: "", success: "" });

    const v = validate();
    if (v) {
      setStatus({ loading: false, error: v, success: "" });
      return;
    }

    // simulate network and success
    setStatus({ loading: true, error: "", success: "" });
    setTimeout(() => {
      setStatus({ loading: false, error: "", success: "Account created! You can sign in now." });
      // optional: auto-redirect to sign in page
      // setTimeout(() => router.push("/signin"), 900);
    }, 900);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LEFT: Visual / gallery + pitch */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3">
              <div className="text-3xl font-extrabold text-yellow-500">PG</div>
              <div className="text-3xl font-extrabold">LIFE</div>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Create an account and start finding <span className="text-yellow-400">premium PGs</span>
            </h2>

            <p className="text-gray-700 max-w-xl">
              Quick signup — no fuss. Explore verified rooms, chat with hosts, and book securely.
              We prioritise safety, hygiene and a great living experience for students and young professionals.
            </p>

            <div className="grid grid-cols-3 gap-3 mt-4 shadow-sm rounded-lg overflow-hidden">
              {gallery.map((src, i) => (
                <div key={i} className={`relative group ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
                  <img
                    src={src}
                    alt={`pg-${i}`}
                    className="w-full h-36 md:h-44 object-cover transform group-hover:scale-105 transition"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-3">
              <div className="rounded-full bg-yellow-400 px-4 py-2 font-semibold shadow">Explore rooms</div>
              <a href="#signup-form" className="rounded-full border px-4 py-2">Sign up now</a>
            </div>
          </div>

          {/* RIGHT: Signup form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-4">
              <h3 className="text-2xl font-bold">Create your account</h3>
              <p className="text-sm text-gray-500">Safe, quick signup — no card required.</p>
            </div>

            {status.error && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded">{status.error}</div>
            )}

            {status.success ? (
              <div className="text-center py-12">
                <div className="mx-auto inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-600 mb-4">
                  <CheckCircle size={36} />
                </div>
                <div className="text-lg font-semibold mb-2">{status.success}</div>
                <div className="text-sm text-gray-600 mb-6">You can now <a href="/signin" className="text-yellow-600 underline">sign in</a>.</div>
                <button
                  onClick={() => {
                    setStatus({ loading: false, error: "", success: "" });
                    setForm({ name: "", email: "", phone: "", password: "", confirm: "", acceptTerms: false });
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
                >
                  Create another
                </button>
              </div>
            ) : (
              <form id="signup-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Full name</span>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                      placeholder="Ananya Roy"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Email</span>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                      placeholder="you@domain.com"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Phone (optional)</span>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    placeholder="+91 98765 43210"
                  />
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="block relative">
                    <span className="text-sm font-medium text-gray-700">Password</span>
                    <div className="mt-1 relative">
                      <input
                        name="password"
                        type={showPw ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                        className="w-full rounded-md border border-gray-200 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                        placeholder="Create a password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw((s) => !s)}
                        aria-label={showPw ? "Hide password" : "Show password"}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 p-1"
                      >
                        {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </label>

                  <label className="block relative">
                    <span className="text-sm font-medium text-gray-700">Confirm</span>
                    <div className="mt-1 relative">
                      <input
                        name="confirm"
                        type={showConfirm ? "text" : "password"}
                        value={form.confirm}
                        onChange={handleChange}
                        required
                        minLength={6}
                        className="w-full rounded-md border border-gray-200 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                        placeholder="Re-type your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((s) => !s)}
                        aria-label={showConfirm ? "Hide password" : "Show password"}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 p-1"
                      >
                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </label>
                </div>

                <label className="inline-flex items-start gap-3 text-sm">
                  <input
                    name="acceptTerms"
                    type="checkbox"
                    checked={form.acceptTerms}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-gray-300"
                  />
                  <span>
                    I agree to the <a href="/terms" className="underline">terms</a> and <a href="/privacy" className="underline">privacy policy</a>.
                  </span>
                </label>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={status.loading}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow-400 text-black px-5 py-2 font-semibold shadow hover:brightness-95 disabled:opacity-60"
                  >
                    {status.loading ? "Creating…" : "Create account"}
                  </button>

                  <a href="/signin" className="text-sm text-gray-600 underline">Already have an account?</a>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* subtle footer note */}
        <div className="mt-12 text-center text-sm text-gray-500">
          By signing up you agree to our <a href="/terms" className="underline text-gray-700">terms</a> & <a href="/privacy" className="underline text-gray-700">privacy</a>.
        </div>
      </div>
    </div>
  );
}
