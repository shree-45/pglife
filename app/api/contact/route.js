// app/api/contact/route.js
import nodemailer from "nodemailer"; // or use any email provider SDK

export async function POST(req) {
  try {
    const body = await req.json();
    // validate body...

    // Example: return 200 without actually sending
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
