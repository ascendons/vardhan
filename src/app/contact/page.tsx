import type { Metadata } from "next";
import { PickupForm } from "@/components/PickupForm";
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/Icons";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Book Free Scrap Pickup",
  description:
    "Book a free doorstep pickup for electrical and electronic scrap. Call or WhatsApp Vardhan Metals for today's rates and bulk quotes.",
};

export default function ContactPage() {
  const channels = [
    { icon: PhoneIcon, label: "Call us", value: site.phoneDisplay, href: site.phoneHref },
    {
      icon: WhatsAppIcon,
      label: "WhatsApp",
      value: "Send photos for a quick quote",
      href: whatsappLink("Hi Vardhan Metals, I'd like a quote for my scrap."),
    },
    { icon: MailIcon, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: MapPinIcon, label: "Location", value: site.address },
    { icon: ClockIcon, label: "Working hours", value: site.hours },
  ];

  return (
    <>
      <section className="hero-bg relative overflow-hidden text-white">
        <div aria-hidden className="circuit absolute inset-0" />
        <div className="relative w-full px-4 py-14 sm:px-6 lg:px-10 2xl:px-16">
          <h1 className="font-display text-6xl tracking-wide sm:text-7xl">
            Sell your <span className="copper-text">scrap</span> today
          </h1>
          <p className="mt-3 max-w-xl text-white/70">
            Book a free pickup, ask for a bulk quote, or just check a price. We reply fast.
          </p>
        </div>
      </section>

      <section id="pickup" className="grid w-full scroll-mt-20 gap-10 px-4 py-14 sm:px-6 lg:px-10 2xl:px-16 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-line bg-card p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-4xl tracking-wide">Book a free pickup</h2>
          <p className="mt-1 mb-6 text-sm text-muted">
            Free pickup for about 20 kg of scrap or more, or for any single large appliance.
          </p>
          <PickupForm />
        </div>

        <aside className="space-y-3">
          {channels.map((c) => {
            const inner = (
              <>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-ink text-molten">
                  <c.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-muted">{c.label}</span>
                  <span className="num block font-medium">{c.value}</span>
                </span>
              </>
            );
            return c.href ? (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 rounded-xl border border-line bg-card p-4 transition-colors hover:border-copper/50"
              >
                {inner}
              </a>
            ) : (
              <div key={c.label} className="flex items-center gap-4 rounded-xl border border-line bg-card p-4">
                {inner}
              </div>
            );
          })}
        </aside>
      </section>
    </>
  );
}
