import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  message: z.string().trim().min(10),
});

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  if (!resend) {
    return NextResponse.json({ message: "Resend is not configured." }, { status: 500 });
  }

  try {
    const payload = await request.json();
    const result = contactFormSchema.safeParse(payload);

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid form submission.", issues: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["amanuelfirew27@gmail.com"],
      replyTo: email,
      subject: `Portfolio inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
          <h2 style="margin: 0 0 16px;">New portfolio inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="padding: 16px; border-radius: 12px; background: #f8fafc; border: 1px solid #e2e8f0;">${message
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\n/g, "<br />")}</div>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Message sent successfully." }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Unable to process the submission." }, { status: 500 });
  }
}