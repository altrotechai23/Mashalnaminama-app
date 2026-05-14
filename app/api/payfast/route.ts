import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const PAYFAST_MERCHANT_ID = process.env.PAYFAST_MERCHANT_ID!;
const PAYFAST_MERCHANT_KEY = process.env.PAYFAST_MERCHANT_KEY!;
const PAYFAST_PASSPHRASE = process.env.PAYFAST_PASSPHRASE || "";
const IS_SANDBOX = process.env.NODE_ENV !== "production";

const PAYFAST_URL = IS_SANDBOX
  ? "https://sandbox.payfast.co.za/eng/process"
  : "https://www.payfast.co.za/eng/process";

function generateSignature(data: Record<string, string>, passphrase?: string): string {
  let query = Object.entries(data)
    .map(([k, v]) => `${k}=${encodeURIComponent(v.trim()).replace(/%20/g, "+")}`)
    .join("&");

  if (passphrase) {
    query += `&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, "+")}`;
  }

  return crypto.createHash("md5").update(query).digest("hex");
}

export async function POST(req: NextRequest) {
  const { userEmail, userName, totalAmount, orderId, itemNames } = await req.json();

  const returnUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?orderId=${orderId}`;
  const cancelUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`;
  const notifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/payfast/notify`;

  const payfastData: Record<string, string> = {
    merchant_id: PAYFAST_MERCHANT_ID,
    merchant_key: PAYFAST_MERCHANT_KEY,
    return_url: returnUrl,
    cancel_url: cancelUrl,
    notify_url: notifyUrl,
    name_first: userName.split(" ")[0] || "Customer",
    name_last: userName.split(" ").slice(1).join(" ") || "-",
    email_address: userEmail,
    m_payment_id: orderId,
    amount: totalAmount.toFixed(2),
    item_name: itemNames.substring(0, 100), // PayFast max 100 chars
  };

  payfastData.signature = generateSignature(payfastData, PAYFAST_PASSPHRASE);

  return NextResponse.json({ payfastUrl: PAYFAST_URL, payfastData });
}