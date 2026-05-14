'use server';

export async function createCheckout(amountInCents: number) {
  const res = await fetch("https://payments.yoco.com/api/checkouts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.YOCO_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amountInCents,
      currency: "ZAR",
      successUrl: "https://amanicrafts.com/success",
      cancelUrl: "https://amanicrafts.com/shop/",
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { success: false, error: data.message };
  }

  return { success: true, url: data.redirectUrl };
}