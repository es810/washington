import { useState, type FormEvent } from "react";

import { sendContactMessage } from "../lib/api/contact.functions";

type FieldErrors = { name?: string; email?: string; message?: string };
type Status = "idle" | "sending" | "received" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FIELD =
  "mt-2 w-full border border-ivory-line bg-white px-4 py-3 text-[1rem] text-charcoal placeholder:text-charcoal-soft/70 focus:border-[#e7792b] focus:outline-none focus:ring-1 focus:ring-[#e7792b]";
const LABEL = "block text-[0.75rem] uppercase tracking-[0.16em] text-charcoal-soft";
const ERROR = "mt-2 text-[0.8125rem] text-[#a84316]";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [notice, setNotice] = useState("");

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!email.trim()) next.email = "Please enter your email address.";
    else if (!EMAIL_RE.test(email.trim()))
      next.email = "Please enter a valid email address.";
    if (!message.trim()) next.message = "Please enter a message.";
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      setNotice("");
      return;
    }

    setStatus("sending");
    setNotice("");
    try {
      const result = await sendContactMessage({
        data: { name: name.trim(), email: email.trim(), message: message.trim() },
      });

      if (!result.ok) {
        setStatus("error");
        setNotice(result.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("received");
      setNotice(
        result.delivered
          ? "Thank you. Your message has been sent."
          : "Thank you. Your message has been received.",
      );
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setNotice("The message could not be sent. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-[36rem]">
      <div>
        <label htmlFor="contact-name" className={LABEL}>
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={FIELD}
        />
        {errors.name ? (
          <p id="contact-name-error" className={ERROR}>
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="mt-7">
        <label htmlFor="contact-email" className={LABEL}>
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={FIELD}
        />
        {errors.email ? (
          <p id="contact-email-error" className={ERROR}>
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="mt-7">
        <label htmlFor="contact-message" className={LABEL}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={7}
          required
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={FIELD}
        />
        {errors.message ? (
          <p id="contact-message-error" className={ERROR}>
            {errors.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-9 inline-flex items-center justify-center bg-[#e7792b] px-8 py-4 text-[0.8125rem] uppercase tracking-[0.14em] text-[#333333] transition-colors duration-300 ease-wa hover:bg-[#d56820] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#333333] disabled:opacity-60 motion-reduce:transition-none"
      >
        {status === "sending" ? "Sending" : "Send"}
      </button>

      <p
        aria-live="polite"
        className={`mt-5 text-[0.9375rem] leading-relaxed ${
          status === "error" ? "text-[#a84316]" : "text-charcoal-soft"
        }`}
      >
        {notice}
      </p>
    </form>
  );
}
