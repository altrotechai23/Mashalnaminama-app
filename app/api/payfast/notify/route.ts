import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { updateOrderStatus } from "@/lib/actions/orders"; // implement this

const PAYFAST_PASSPHRASE = process.env.PAYFAST_PASSPHRASE || "";

function generateSignature(data: Record<string, string>, passphrase?: string): string {
  let query = Object.entries(data)
    .filter(([k]) => k !== "signature")
    .map(([k, v]) => `${k}=${encodeURIComponent(v.trim()).replace(/%20/g, "+")}`)
    .join("&");

  if (passphrase) {
    query += `&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, "+")}`;
  }

  return crypto.createHash("md5").update(query).digest("hex");
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const params = Object.fromEntries(new URLSearchParams(body));

  const expectedSignature = generateSignature(params, PAYFAST_PASSPHRASE);
  if (params.signature !== expectedSignature) {
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (params.payment_status === "COMPLETE") {
    await updateOrderStatus(params.m_payment_id, "paid");
  }

  return new NextResponse("OK", { status: 200 });
}