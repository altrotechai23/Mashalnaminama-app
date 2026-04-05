import { NextResponse } from "next/server";
import { generateSignature } from "@/lib/payfast";

export async function POST(req: Request) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    const body = await req.json();
    const { userEmail, userName, totalAmount, orderId, itemNames } = body;

    // MANDATORY ORDER FOR CHECKOUT SIGNATURE (DO NOT CHANGE)
    const data: Record<string, string> = {
      // 1. Merchant details
      merchant_id: process.env.PAYFAST_MERCHANT_ID!,
      merchant_key: process.env.PAYFAST_MERCHANT_KEY!,
      return_url: `${baseUrl}/dashboard`,
      cancel_url: `${baseUrl}/checkout`,
      notify_url: `${baseUrl}/api/payfast/notify`,
      
      // 2. Buyer details
      name_first: userName || "Customer",
      email_address: userEmail,

      // 3. Transaction details
      m_payment_id: orderId,
      amount: Number(totalAmount).toFixed(2),
      item_name: itemNames.substring(0, 100), // Max 100 chars
    };

    // Generate signature using the provided logic
    const signature = generateSignature(data, process.env.PAYFAST_PASSPHRASE);
    data.signature = signature;

    return NextResponse.json({
      success: true,
      payfastUrl: "https://sandbox.payfast.co.za/eng/process",
      payfastData: data,
    });
    
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
