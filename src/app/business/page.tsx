import type { Metadata } from "next";
import Link from "next/link";
import { PickupForm } from "@/components/PickupForm";
import { Faq, type QA } from "@/components/Faq";
import { ArrowRight, DocIcon, LeafIcon, ScaleIcon, ShieldIcon, TruckIcon, WalletIcon } from "@/components/Icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bulk & Corporate E-Waste and Electrical Scrap Buyers",
  description:
    "Vardhan Metals buys bulk electrical and electronic scrap from factories, offices, IT firms and contractors. Market-linked rates, compliant documentation, data destruction and scheduled pickups.",
};

const services = [
  { icon: TruckIcon, title: "Scheduled & on-call lifting", text: "Weekly or monthly collection from your plant or warehouse, plus same-day lifting for urgent clearances." },
  { icon: ScaleIcon, title: "On-site weighing & sorting", text: "Our team grades material at your site on calibrated scales and gives you a signed weighment slip every time." },
  { icon: WalletIcon, title: "Contract & LME-linked pricing", text: "Fixed-period contracts, or rates pegged to LME / MCX copper and aluminium so you always get the market price." },
  { icon: ShieldIcon, title: "Certified data destruction", text: "Hard drives, SSDs and tapes are degaussed or shredded under supervision, with a certificate of destruction." },
  { icon: DocIcon, title: "Compliance paperwork", text: "GST purchase invoices, e-way bills, Form-6 manifests and recycling certificates to support your EPR and audits." },
  { icon: LeafIcon, title: "Asset recovery & dismantling", text: "We decommission and dismantle panels, DG sets, server rooms and HVAC systems, then pay for the recovered metal." },
];

const industries = [
  "Manufacturing plants",
  "IT / ITES & data centres",
  "Electrical contractors",
  "Builders & infrastructure",
  "Hospitals & institutions",
  "Telecom & power utilities",
  "Hotels & commercial buildings",
  "Government & PSU auctions",
];

const bizFaq: QA[] = [
  {
    q: "Do you participate in tenders and auctions?",
    a: "Yes. We bid on scrap tenders and e-auctions from companies, PSUs and government bodies, and can complete vendor registration on request.",
  },
  {
    q: "What documents do you provide?",
    a: "A GST purchase invoice, weighment slips and e-way bills for transport. For e-waste we also provide recycling and data-destruction certificates for your compliance records.",
  },
  {
    q: "What is the minimum quantity for a business pickup?",
    a: "There is no strict minimum. Scheduled contracts usually start at around 500 kg per month, and one-time clearances of any size are welcome.",
  },
  {
    q: "How quickly do you pay?",
    a: "Usually by bank transfer on the day of lifting. Contract customers can also opt for advance payment or agreed payment cycles.",
  },
];

export default function BusinessPage() {
  return (
    <>
      <section className="hero-bg relative overflow-hidden text-white">
        <div aria-hidden className="circuit absolute inset-0" />
        <div className="relative w-full px-4 py-16 sm:px-6 lg:px-10 2xl:px-16 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-molten">For business</p>
          <h1 className="mt-3 max-w-4xl font-display text-6xl leading-[0.92] tracking-wide sm:text-7xl">
            Bulk electrical &amp; e-waste scrap, <span className="copper-text">handled end to end</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/70">
            For factories, offices, IT companies and contractors. We pay market-linked rates and
            provide transparent weighing, compliant paperwork and secure data destruction.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#enquiry"
              className="inline-flex items-center gap-2 rounded-lg bg-copper-bright px-5 py-3 font-semibold text-ink hover:bg-molten"
            >
              Get a Bulk Quote <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 font-semibold hover:bg-white/10"
            >
              Call <span className="num">{site.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-20 sm:px-6 lg:px-10 2xl:px-16">
        <h2 className="font-display text-5xl tracking-wide">What we do for businesses</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="rounded-xl border border-line bg-card p-6">
              <s.icon className="h-8 w-8 text-copper" />
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink py-16 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-16">
          <h2 className="font-display text-4xl tracking-wide">Industries we work with</h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {industries.map((i) => (
              <li key={i} className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80">
                {i}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="enquiry" className="grid w-full scroll-mt-20 gap-12 px-4 py-20 sm:px-6 lg:px-10 2xl:px-16 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-5xl tracking-wide">Request a bulk quote</h2>
          <p className="mt-3 mb-8 text-muted">
            Tell us the material and approximate quantity, and photos help. We&apos;ll come back
            with a rate the same day. You can also check{" "}
            <Link href="/scrap-rates/" className="font-semibold text-copper hover:underline">
              today&apos;s published rates
            </Link>
            .
          </p>
          <div className="rounded-2xl border border-line bg-card p-6 shadow-sm">
            <PickupForm />
          </div>
        </div>
        <div>
          <h2 className="mb-8 font-display text-5xl tracking-wide">Business FAQ</h2>
          <Faq items={bizFaq} />
        </div>
      </section>
    </>
  );
}
