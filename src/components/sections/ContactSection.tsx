"use client";

import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SectionHeading from "@/components/ui/SectionHeading";
import { contactLinks } from "@/lib/content";

const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter at least 2 characters."),
  email: z.string().trim().email("Enter a valid email address."),
  message: z.string().trim().min(10, "Message should be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

type SubmissionStatus = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("sending");
    setSubmissionError(null);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = (await response.json().catch(() => null)) as { message?: string } | null;

    if (!response.ok) {
      setStatus("error");
      setSubmissionError(result?.message ?? "Unable to send your message right now.");
      return;
    }

    reset();
    setStatus("success");
  };

  return (
    <section id="contact" className="snap-pane px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl content-center gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's build something impactful"
          />

          <div className="mt-8 grid gap-3">
            {contactLinks.map((link, idx) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="glass group rounded-xl px-4 py-3 transition-all hover:border hover:border-orange-300/50 hover:text-orange-100"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{link.label}</p>
                    <p className="mt-1 text-sm font-medium text-slate-100">{link.display}</p>
                    <p className="mt-1 text-xs text-slate-400">{link.hint}</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.18em] text-orange-200/80 transition-transform group-hover:translate-x-1">
                    Open
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="glass glow-border grid gap-4 rounded-2xl p-5"
        >
          <label className="grid gap-2 text-sm text-slate-300">
            Name
            <input
              {...register("name")}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none transition focus:border-orange-300/70 focus:bg-white/10"
              placeholder="Your name"
            />
            {errors.name ? <span className="text-xs text-rose-300">{errors.name.message}</span> : null}
          </label>
          <label className="grid gap-2 text-sm text-slate-300">
            Email
            <input
              type="email"
              {...register("email")}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none transition focus:border-orange-300/70 focus:bg-white/10"
              placeholder="your@email.com"
            />
            {errors.email ? <span className="text-xs text-rose-300">{errors.email.message}</span> : null}
          </label>
          <label className="grid gap-2 text-sm text-slate-300">
            Message
            <textarea
              rows={4}
              {...register("message")}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none transition focus:border-orange-300/70 focus:bg-white/10"
              placeholder="Tell me about your project or idea"
            />
            {errors.message ? <span className="text-xs text-rose-300">{errors.message.message}</span> : null}
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 rounded-full bg-orange-400 px-5 py-2 text-sm font-semibold text-black hover:bg-orange-300 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting || status === "sending" ? "Sending..." : "Send Message"}
          </button>
          {status === "success" ? <p className="text-sm text-emerald-300">Message sent. I’ll get back to you soon.</p> : null}
          {status === "error" ? <p className="text-sm text-rose-300">{submissionError}</p> : null}
        </motion.form>

        <div className="lg:col-span-2 pt-4 text-xs uppercase tracking-[0.2em] text-slate-400">
          <p>Amanuel Firew Lema</p>
          <p className="mt-2">Copyright 2026. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}
