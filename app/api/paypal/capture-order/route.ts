import { NextRequest, NextResponse } from "next/server";
import { updateOrderStatus } from "@/lib/actions/orders";

const PAYPAL_API = process.env.NODE_ENV === "production"
  ? "https://api-m.paypal.com"
  : "https://api-m.sandbox.paypal.com";

async function getAccessToken() {
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });
  const data = await res.json();
  return data.access_token as string;
}

export async function POST(req: NextRequest) {
  const { paypalOrderId, orderId } = await req.json();
  const accessToken = await getAccessToken();

  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders/${paypalOrderId}/capture`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();

  if (data.status === "COMPLETED") {
    await updateOrderStatus(orderId, "PAID");
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 400 });
}