import { NextRequest, NextResponse } from "next/server";

const PAYPAL_API = process.env.NODE_ENV === "production"
  ? "https://api-m.paypal.com"
  : "https://api-m.sandbox.paypal.com";

async function getAccessToken() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;

  console.log("PayPal Client ID exists:", !!clientId);
  console.log("PayPal Secret exists:", !!secret);

  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();
  console.log("PayPal token response:", data);

  if (!data.access_token) {
    throw new Error(`PayPal auth failed: ${JSON.stringify(data)}`);
  }

  return data.access_token as string;
}

export async function POST(req: NextRequest) {
  try {
    const { totalAmount, orderId } = await req.json();
    const accessToken = await getAccessToken();

    const res = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            reference_id: orderId,
            amount: {
              currency_code: "USD",
              value: totalAmount.toFixed(2),
            },
          },
        ],
        application_context: {
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?orderId=${orderId}`,
          cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
        },
      }),
    });

    const data = await res.json();
    console.log("PayPal order response:", data);

    const approvalUrl = data.links?.find((l: { rel: string }) => l.rel === "approve")?.href;

    if (!approvalUrl) {
      throw new Error(`No approval URL: ${JSON.stringify(data)}`);
    }

    return NextResponse.json({ approvalUrl });
  } catch (error) {
    console.error("PayPal create-order error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}