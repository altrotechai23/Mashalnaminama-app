import { NextResponse } from "next/server";
import { generateSignature } from "@/lib/payfast";

export async function POST(req: Request) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    const body = await req.json();

    // Updated destructuring to match our Prisma Order + User structure
    const { 
      userEmail, 
      userName, 
      totalAmount, 
      orderId, 
      itemNames 
    } = body;

    // Split name safely for PayFast
    const [firstName, ...lastNameParts] = userName.split(" ");
    const lastName = lastNameParts.join(" ") || "Customer";

    const data: Record<string, string> = {
      merchant_id: process.env.PAYFAST_MERCHANT_ID!,
      merchant_key: process.env.PAYFAST_MERCHANT_KEY!,
      return_url: `${baseUrl}/dashboard`, // Redirect back to dashboard on success
      cancel_url: `${baseUrl}/checkout`,
      notify_url: `${baseUrl}/api/payfast/notify`,
      
      name_first: firstName,
      name_last: lastName,
      email_address: userEmail,

      m_payment_id: orderId, // This links the PayFast payment to our Prisma Order ID
      amount: Number(totalAmount).toFixed(2),
      item_name: itemNames || "Store Purchase",
    };

    // Add signature using your lib helper
    data.signature = generateSignature(data, process.env.PAYFAST_PASSPHRASE);

    return NextResponse.json({
      success: true,
      // Change to https://www.payfast.co.za/eng/process for production later
      payfastUrl: "https://sandbox.payfast.co.za/eng/process",
      payfastData: data,
    });
    
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
