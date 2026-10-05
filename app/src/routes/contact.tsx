import { createFileRoute } from "@tanstack/react-router";

import { ContactForm } from "../components/contact-form";
import { PAGE_META } from "../lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: PAGE_META.contact.title },
      { name: "description", content: PAGE_META.contact.description },
      { property: "og:title", content: PAGE_META.contact.title },
      { property: "og:description", content: PAGE_META.contact.description },
    ],
  }),
  component: Contact,
});

const EMAIL = "Info@washingtonanalytica.com";

function Contact() {
  return (
    <>
      {/* Page band */}
      <section className="bg-navy text-ivory">
        <div className="mx-auto w-full max-w-6xl px-5 py-24 md:px-8 md:py-32">
          <p className="wa-rise flex items-center gap-4 text-[0.75rem] uppercase tracking-[0.22em] text-gold-soft">
            <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
            Get in touch
          </p>
          <h1 className="wa-rise mt-7 max-w-3xl font-display text-[2.25rem] leading-[1.1] tracking-[-0.02em] sm:text-5xl md:text-[3.5rem]">
            Contact Us
          </h1>
        </div>
      </section>

      {/* Details and form */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="grid gap-14 md:grid-cols-[1fr_1.5fr] md:gap-16">
            <div className="wa-rise">
              <h2 className="text-[0.75rem] uppercase tracking-[0.16em] text-charcoal-soft">
                Address
              </h2>
              <p className="mt-4 font-display text-xl leading-relaxed text-navy md:text-2xl">
                Washington, DC 20015
                <br />
                USA
              </p>

              <h2 className="mt-12 text-[0.75rem] uppercase tracking-[0.16em] text-charcoal-soft">
                Email
              </h2>
              <p className="mt-4 font-display text-xl leading-relaxed md:text-2xl">
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-link underline decoration-1 underline-offset-4 transition-colors duration-300 ease-wa hover:text-navy motion-reduce:transition-none"
                >
                  {EMAIL}
                </a>
              </p>
            </div>

            <div className="wa-rise">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
