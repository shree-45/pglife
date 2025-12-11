// app/api/contact/route.js
/**
 * Serverless-friendly contact POST route.
 * Expects JSON body: { name, email, message }
 *
 * Requires environment variables in Vercel:
 *  - SMTP_HOST
 *  - SMTP_PORT
 *  - SMTP_USER
 *  - SMTP_PASS
 *  - CONTACT_TO  (the email that will receive messages)
 *
 * If SMTP_* are not set, the route will return 200 but log the message (safe fallback).
 */

import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name, email, message } = body || {};

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing name, email or message." }), { status: 400 });
    }

    // Build email content
    const subject = `Contact form: ${name}`;
    const text = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

    // Only attempt to send if SMTP config exists
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      CONTACT_TO,
    } = process.env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
      // In dev or if not configured on Vercel: log and return success so the site doesn't break.
      console.warn("Contact form received (SMTP not configured) — message:", { name, email, message });
      return new Response(JSON.stringify({ ok: true, warning: "SMTP not configured; message logged." }), { status: 200 });
    }

    // create transporter (serverless-friendly)
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 587),
      secure: Number(SMTP_PORT || 587) === 465, // true for 465, false for others
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // send mail
    await transporter.sendMail({
      from: `"PG LIFE Contact" <${SMTP_USER}>`,
      to: CONTACT_TO,
      subject,
      text,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><pre style="white-space:pre-wrap;">${message}</pre>`,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error("contact route error:", err);
    return new Response(JSON.stringify({ error: "Server error." }), { status: 500 });
  }
}