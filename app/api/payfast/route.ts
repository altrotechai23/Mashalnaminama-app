import { NextResponse } from "next/server";
import { generateSignature } from "@/lib/payfast";

export async function POST(req: Request) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    const body = await req.json();

    const { firstName, lastName, email, totalAmount, orderId, itemName, itemDescription } = body;

    const data: Record<string, string> = {
      merchant_id: process.env.PAYFAST_MERCHANT_ID!,
      merchant_key: process.env.PAYFAST_MERCHANT_KEY!,
      return_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/cancel`,
      notify_url: `${baseUrl}/api/payfast/notify`,
      
      name_first: firstName,
      name_last: lastName,
      email_address: email,

      m_payment_id: orderId,
      amount: totalAmount.toFixed(2),
      item_name: itemName,
      item_description: itemDescription,
    };

    data.signature = generateSignature(data, process.env.PAYFAST_PASSPHRASE);

    // Return JSON with CORS headers
    return NextResponse.json(
      {
        success: true,
        payfastUrl: "https://sandbox.payfast.co.za/eng/process",
        payfastData: data,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "https://teesngees.vercel.app", // allow your frontend
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      {
         headers: {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "https://teesngees.vercel.app", // allow your frontend domain
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
      "Access-Control-Allow-Origin": "https://teesngees.vercel.app",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    }
  );
}
