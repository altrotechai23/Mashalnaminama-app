"use server"
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend("re_96Cnor5L_9mgD34rMgd84skvzSZqgHVGu");

const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function sendContactEmail(formData: z.infer<typeof ContactSchema>) {
  // 1. Validate data
  const validated = ContactSchema.safeParse(formData);
  if (!validated.success) return { error: "Invalid form data" };

  try {
    // 2. Send Email
    await resend.emails.send({
      from: 'Mashalnaminema <onboarding@resend.dev>', // Update with your domain later
      to: ['mashalnaminema@gmail.com'],
      subject: `New Message from ${validated.data.name}`,
      text: `From: ${validated.data.email}\n\n${validated.data.message}`,
    });

    return { success: true };
  } catch (error) {
    return { error: "Failed to send email. Please try again." };
  }
}
