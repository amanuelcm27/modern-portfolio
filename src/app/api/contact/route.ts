import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  message: z.string().trim().min(10),
});

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const recipientEmail = "amanuelfirew27@gmail.com";

export async function POST(request: Request) {
  if (!emailUser || !emailPass) {
    return NextResponse.json({ message: "Issue sending email." }, { status: 500 });
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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    await transporter.sendMail({
      from: `Amanuel Firew Lema Portfolio <${emailUser}>`,
      to: recipientEmail,
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

    return NextResponse.json({ message: "Message sent successfully." }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Unable to process the submission." }, { status: 500 });
  }
}