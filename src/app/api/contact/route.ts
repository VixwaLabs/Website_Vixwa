import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { enquirySchema } from "@/lib/validation";

// Simple in-memory rate limit per IP
const RATE_WINDOW_MS = 60_000; // 1 min
const RATE_MAX = 3;
const hits = new Map<string, { count: number; first: number }>();

function rateLimited(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.first > RATE_WINDOW_MS) {
    hits.set(ip, { count: 1, first: now });
    return false;
  }
  rec.count += 1;
  return rec.count > RATE_MAX;
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (rateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many attempts. Please wait a moment." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { ok: false, error: "Invalid request." },
        { status: 400 }
      );
    }

    const parsed = enquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: parsed.error.issues[0]?.message || "Invalid input.",
        },
        { status: 400 }
      );
    }

    const d = parsed.data;
    await db.enquiry.create({
      data: {
        name: d.name,
        email: d.email,
        organization: d.organization || null,
        subject: d.subject,
        message: d.message,
        status: "new",
      },
    });

    // Optional: send notification email via Resend if configured
    // try { await sendResendNotification(d) } catch {}

    return NextResponse.json(
      { ok: true, message: "Your message reached us. Thank you." },
      { status: 201 }
    );
  } catch (e) {
    console.error("[contact] error", e);
    return NextResponse.json(
      { ok: false, error: "Something went wrong on our side." },
      { status: 500 }
    );
  }
}
