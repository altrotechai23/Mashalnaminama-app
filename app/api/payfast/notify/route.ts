import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const data: Record<string, string> = {};
    
    formData.forEach((value, key) => {
      if (key !== "signature") {
        data[key] = value.toString();
      }
    });

    const receivedSignature = formData.get("signature");

    // 1. Verify Signature
    const pfOutput = Object.keys(data)
      .map((key) => `${key}=${encodeURIComponent(data[key].trim()).replace(/%20/g, "+")}`)
      .join("&");

    const passphrase = process.env.PAYFAST_PASSPHRASE;
    const finalString = passphrase 
      ? `${pfOutput}&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, "+")}`
      : pfOutput;

    const generatedSignature = crypto.createHash("md5").update(finalString).digest("hex");

    if (receivedSignature !== generatedSignature) {
      console.error("Invalid PayFast signature");
      return new NextResponse("Invalid Signature", { status: 400 });
    }

    // 2. Check Payment Status
    const paymentStatus = data["payment_status"];
    const orderId = data["m_payment_id"]; // This matches our Prisma Order ID

    if (paymentStatus === "COMPLETE") {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "PAID" }, // Or "COMPLETED" based on your preference
      });
    }

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("ITN Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
