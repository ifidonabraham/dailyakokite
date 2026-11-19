"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/site";


export default function ContactForm() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<typeof fields>>({});
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function validate() {
    const e: Partial<typeof fields> = {};
    if (!fields.name.trim()) e.name = "Name is required.";
    if (!fields.email.trim() || !/\S+@\S+\.\S+/.test(fields.email))
      e.email = "A valid email is required.";
    if (!fields.subject.trim()) e.subject = "Subject is required.";
    if (!fields.message.trim()) e.message = "Message is required.";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    // Open mail client with pre-filled content
    const body = `Name: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(fields.subject)}&body=${encodeURIComponent(body)}`;
    setStatus("sent");
  }

  const set = (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  if (status === "sent") {
    return (
      <div className="border border-black p-8 text-center">
        <p className="font-display text-2xl font-bold mb-2">Message Drafted</p>
        <p className="text-ink/60 text-sm">Your email client should have opened. If it didn&apos;t, email us directly at{" "}
          <a href={`mailto:${CONTACT.email}`} className="text-brand hover:underline underline-offset-4 break-all">
            {CONTACT.email}
          </a>
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-[11px] font-sans font-bold uppercase tracking-[0.14em] border border-black px-5 py-2 hover:bg-black hover:text-white transition-colors"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Your Name" error={errors.name}>
          <input
            type="text"
            value={fields.name}
            onChange={set("name")}
            placeholder="Ada Obi"
            className="w-full border border-black/30 focus:border-black px-4 py-3 text-sm outline-none transition-colors"
          />
        </Field>
        <Field label="Your Email" error={errors.email}>
          <input
            type="email"
            value={fields.email}
            onChange={set("email")}
            placeholder="ada@example.com"
            className="w-full border border-black/30 focus:border-black px-4 py-3 text-sm outline-none transition-colors"
          />
        </Field>
      </div>
      <Field label="Subject" error={errors.subject}>
        <input
          type="text"
          value={fields.subject}
          onChange={set("subject")}
          placeholder="What is this about?"
          className="w-full border border-black/30 focus:border-black px-4 py-3 text-sm outline-none transition-colors"
        />
      </Field>
      <Field label="Message" error={errors.message}>
        <textarea
          value={fields.message}
          onChange={set("message")}
          rows={6}
          placeholder="Your message…"
          className="w-full border border-black/30 focus:border-black px-4 py-3 text-sm outline-none transition-colors resize-none"
        />
      </Field>
      <div>
        <button
          type="submit"
          className="text-[11px] font-sans font-bold uppercase tracking-[0.14em] bg-ink text-white px-8 py-3 hover:bg-brand transition-colors"
        >
          Send Message →
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex flex-col gap-1">
        <span className="text-[10px] font-sans font-bold uppercase tracking-[0.16em] text-ink/65">
          {label}
        </span>
        {children}
      </label>
      {error && (
        <p role="alert" className="text-[11px] text-red-700 font-sans">{error}</p>
      )}
    </div>
  );
}
