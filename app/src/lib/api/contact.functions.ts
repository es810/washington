import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { bindings } from "../bindings.server";

/* Where enquiries are addressed. */
const CONTACT_INBOX = "Info@washingtonanalytica.com";

const ContactInput = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(1).max(5000),
});

export type ContactResult = {
  /** The message was accepted and stored. */
  ok: boolean;
  /** The message was also handed to the email provider for delivery to the inbox. */
  delivered: boolean;
  error?: string;
};

/* Onward email delivery.
 *
 * Delivery needs one secret: CONTACT_EMAIL_API_KEY, an API key for a
 * transactional email provider (Resend's send API is used below). Optionally
 * CONTACT_EMAIL_FROM sets the verified sender; without it the provider's test
 * sender is used, which still delivers to the address above.
 *
 * Until that key is set, submissions are stored but NOT emailed, and the
 * response says so, so the interface never claims a message was sent when it
 * was only received. */
async function deliverToInbox(data: {
  name: string;
  email: string;
  message: string;
}): Promise<{ delivered: boolean; note: string }> {
  const { CONTACT_EMAIL_API_KEY, CONTACT_EMAIL_FROM } = bindings();
  if (!CONTACT_EMAIL_API_KEY) {
    return { delivered: false, note: "no email provider configured" };
  }
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CONTACT_EMAIL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_EMAIL_FROM ?? "Washington Analytica <onboarding@resend.dev>",
        to: [CONTACT_INBOX],
        reply_to: data.email,
        subject: `Website enquiry from ${data.name}`,
        text: `${data.name} <${data.email}>\n\n${data.message}`,
      }),
    });
    if (!response.ok) {
      return { delivered: false, note: `provider responded ${response.status}` };
    }
    return { delivered: true, note: "delivered to the inbox" };
  } catch {
    return { delivered: false, note: "provider unreachable" };
  }
}

export const sendContactMessage = createServerFn({ method: "POST" })
  .validator(ContactInput)
  .handler(async ({ data }): Promise<ContactResult> => {
    const { DB } = bindings();

    // Store first when a database is attached. On this host there is no
    // database, so the submission is logged and then emailed if a provider
    // key is configured. Either way, accepting the message is what matters.
    if (DB) {
      try {
        await DB.prepare(
          "INSERT INTO contact_messages (name, email, message) VALUES (?1, ?2, ?3)",
        )
          .bind(data.name, data.email, data.message)
          .run();
      } catch {
        return {
          ok: false,
          delivered: false,
          error: "The message could not be saved. Please try again.",
        };
      }
    } else {
      console.info("contact message received", {
        name: data.name,
        email: data.email,
        message: data.message,
      });
    }

    const { delivered, note } = await deliverToInbox(data);

    if (DB) {
      try {
        await DB.prepare(
          "UPDATE contact_messages SET delivered = ?1, delivery_note = ?2 WHERE id = (SELECT MAX(id) FROM contact_messages)",
        )
          .bind(delivered ? 1 : 0, note)
          .run();
      } catch {
        // The message is safely stored; the note is only a convenience.
      }
    }

    return { ok: true, delivered };
  });
