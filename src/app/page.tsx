import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { Ticker } from "@/components/Ticker";
import { CategoryArt } from "@/components/CategoryArt";
import { Change, Price } from "@/components/RateBoard";
import { PickupForm } from "@/components/PickupForm";
import { Faq, FaqJsonLd, generalFaq } from "@/components/Faq";
import {
  ArrowRight,
  BoltIcon,
  DocIcon,
  LeafIcon,
  PhoneIcon,
  ScaleIcon,
  ShieldIcon,
  TruckIcon,
  WalletIcon,
} from "@/components/Icons";
import { categories, defaultCity, formatDate, inr, ratesFor, updatedOn } from "@/lib/rates";
import { site } from "@/lib/site";

const rates = ratesFor(defaultCity);

// Drop a photo at public/images/categories/<category-id>.(webp|jpg|png) and it
// replaces the built-in illustration on the next build.
function categoryPhoto(id: string) {
  const dir = path.join(process.cwd(), "public", "images", "categories");
  const ext = ["webp", "jpg", "jpeg", "png"].find((e) => fs.existsSync(path.join(dir, `${id}.${e}`)));
  return ext ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/categories/${id}.${ext}` : null;
}
const snapshotIds = ["cu-bright", "cable-cu-pvc", "al-wire", "bat-inv", "pcb-high", "ac-split"];
const snapshot = snapshotIds.map((id) => rates.find((r) => r.id === id)!);

const steps = [
  { icon: PhoneIcon, title: "Share details", text: "Call, WhatsApp or fill the form. Tell us what you have and roughly how much." },
  { icon: TruckIcon, title: "Free pickup", text: "Our team comes to your home, office or factory at a time that suits you." },
  { icon: ScaleIcon, title: "Digital weighing", text: "We sort and weigh in front of you on calibrated digital scales. No guesswork." },
  { icon: WalletIcon, title: "Instant payment", text: "Get paid on the spot by UPI, bank transfer or cash, with a receipt or invoice." },
];

const reasons = [
  { icon: BoltIcon, title: "E-scrap specialists", text: "We only deal in electrical and electronic scrap, so we know what copper winding, PCBs and Li-ion packs are really worth." },
  { icon: ScaleIcon, title: "Honest weighing", text: "Calibrated digital scales and transparent grading. You see every reading." },
  { icon: WalletIcon, title: "Market-linked rates", text: "Prices follow LME / MCX metal markets and are published openly, every business day." },
  { icon: ShieldIcon, title: "Data destruction", text: "Hard drives and storage media are wiped or physically shredded, with certificates for companies." },
  { icon: LeafIcon, title: "Responsible recycling", text: "Non-reusable e-waste goes to authorised recyclers in line with the E-Waste Management Rules." },
  { icon: DocIcon, title: "GST invoices", text: "Proper purchase documentation for businesses, plus support for audit and EPR paperwork." },
];

const audiences = [
  { title: "Households", text: "Old ACs, fridges, inverters, batteries, wires, TVs and computers." },
  { title: "Offices & IT", text: "Laptops, desktops, servers, UPS, networking gear and cabling." },
  { title: "Factories", text: "Motors, transformers, panels, cable offcuts and production scrap." },
  { title: "Electricians & Contractors", text: "Site wiring offcuts, old switchgear, fittings and meters." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero-bg relative overflow-hidden text-white">
        <div aria-hidden className="circuit absolute inset-0" />
        <div className="relative grid w-full items-center gap-12 px-4 py-14 sm:px-6 lg:px-10 2xl:px-16 lg:grid-cols-[1.1fr_1fr] lg:py-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-molten">
              <BoltIcon className="h-3.5 w-3.5" /> {site.tagline}
            </p>
            <h1 className="mt-5 font-display text-6xl leading-[0.9] tracking-wide sm:text-7xl lg:text-8xl">
              Turn old wires &amp; <span className="copper-text">e-waste</span> into cash
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
              Vardhan Metals buys copper, cables, motors, transformers, batteries, PCBs, computers
              and old appliances. Rates are published openly, weighing is digital and payment is
              instant. Pickup is free across {defaultCity.name} and nearby cities.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/scrap-rates/"
                className="inline-flex items-center gap-2 rounded-lg bg-copper-bright px-5 py-3 font-semibold text-ink transition-colors hover:bg-molten"
              >
                Check Today&apos;s Rates <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact/#pickup"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Book Free Pickup
              </Link>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-6">
              {[
                ["45+", "E-scrap items priced"],
                ["Same day", "Pickup & payment"],
                ["100%", "Digital weighing"],
              ].map(([k, v]) => (
                <div key={v}>
                  <dt className="sr-only">{v}</dt>
                  <dd className="font-display text-3xl tracking-wide text-white">{k}</dd>
                  <dd className="text-xs text-white/55">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Rate snapshot card */}
          <div className="rounded-2xl border border-white/10 bg-card p-1.5 text-ink shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between rounded-t-xl px-4 pb-3 pt-3.5">
              <div>
                <h2 className="font-display text-2xl tracking-wide">Today&apos;s Rates · {defaultCity.name}</h2>
                <p className="flex items-center gap-1.5 text-xs text-muted">
                  <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-up" />
                  Updated <time dateTime={updatedOn}>{formatDate(updatedOn)}</time>
                </p>
              </div>
              <Link href="/scrap-rates/" className="text-sm font-semibold text-copper hover:underline">
                All rates →
              </Link>
            </div>
            <ul className="divide-y divide-line rounded-xl border border-line bg-white">
              {snapshot.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{r.name}</div>
                    <Change value={r.change} />
                  </div>
                  <span className="text-sm">
                    <Price min={r.cityMin} max={r.cityMax} unit={r.unit} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Ticker />

      {/* What we buy */}
      <section id="what-we-buy" className="w-full scroll-mt-20 px-4 py-20 sm:px-6 lg:px-10 2xl:px-16">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-copper">What we buy</p>
            <h2 className="mt-2 font-display text-5xl tracking-wide">Every kind of electrical scrap</h2>
          </div>
          <p className="max-w-md text-muted">
            From a single dead inverter battery to tonnes of factory cable offcuts, if it carries
            current, we buy it.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => {
            const list = rates.filter((r) => r.category === c.id);
            const top = list.reduce((a, b) => (b.cityMax > a.cityMax && b.unit === "kg" ? b : a), list[0]);
            const featured = [
              top,
              ...list.filter((r) => r !== top).sort((a, b) => Number(!!b.popular) - Number(!!a.popular)),
            ].slice(0, 3);
            const photo = categoryPhoto(c.id);
            return (
              <Link
                key={c.id}
                href={`/scrap-rates/?cat=${c.id}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card transition-all duration-200 hover:-translate-y-1 hover:border-copper/40 hover:shadow-xl hover:shadow-copper/10"
              >
                <div className="art-tile relative aspect-[3/2] overflow-hidden">
                  {photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photo}
                      alt={c.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full p-3 transition-transform duration-500 group-hover:scale-105">
                      <CategoryArt id={c.id} />
                    </div>
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                    {list.length} items
                  </span>
                  <span className="num absolute bottom-3 right-3 rounded-lg bg-white px-2.5 py-1 text-sm shadow-md">
                    <span className="text-xs text-muted">up to </span>
                    <strong>₹{inr.format(top.cityMax)}</strong>
                    <span className="text-xs text-muted">/{top.unit === "pc" ? "pc" : "kg"}</span>
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold leading-snug">{c.name}</h3>
                  <p className="mt-1 text-sm text-muted">{c.blurb}</p>
                  <ul className="mt-4 space-y-1.5 border-t border-line pt-3 text-sm">
                    {featured.map((r) => (
                      <li key={r.id} className="flex items-baseline justify-between gap-3">
                        <span className="truncate text-ink/75">{r.name}</span>
                        <span className="num shrink-0 font-medium">
                          ₹{inr.format(r.cityMax)}
                          <span className="text-xs font-normal text-muted">/{r.unit === "pc" ? "pc" : "kg"}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-copper">
                    View all rates
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-20 bg-ink py-20 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-molten">How it works</p>
          <h2 className="mt-2 font-display text-5xl tracking-wide">Sell scrap in four simple steps</h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="relative rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <span className="absolute right-5 top-4 font-display text-5xl text-white/10">0{i + 1}</span>
                <s.icon className="h-8 w-8 text-copper-bright" />
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why us */}
      <section className="w-full px-4 py-20 sm:px-6 lg:px-10 2xl:px-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-copper">Why Vardhan Metals</p>
        <h2 className="mt-2 max-w-2xl font-display text-5xl tracking-wide">
          Fair to you, careful with the planet
        </h2>
        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <div key={r.title} className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-copper/25 bg-copper/10 text-copper">
                <r.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold">{r.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who we serve */}
      <section className="border-y border-line bg-card py-16">
        <div className="grid w-full gap-10 px-4 sm:px-6 lg:px-10 2xl:px-16 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="font-display text-4xl tracking-wide">Who we buy from</h2>
            <p className="mt-3 text-muted">
              Selling in bulk, or have scrap coming in regularly? Ask about our business contracts.
            </p>
            <Link href="/business/" className="mt-5 inline-flex items-center gap-2 font-semibold text-copper hover:underline">
              Business &amp; bulk scrap <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {audiences.map((a) => (
              <div key={a.title} className="rounded-xl border border-line bg-paper p-5">
                <h3 className="font-semibold">{a.title}</h3>
                <p className="mt-1 text-sm text-muted">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pickup + FAQ */}
      <section className="grid w-full gap-12 px-4 py-20 sm:px-6 lg:px-10 2xl:px-16 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-copper">Free doorstep pickup</p>
          <h2 className="mt-2 font-display text-5xl tracking-wide">Book a pickup</h2>
          <p className="mt-3 mb-8 text-muted">
            Or call us directly at{" "}
            <a href={site.phoneHref} className="num font-semibold text-ink hover:text-copper">
              {site.phoneDisplay}
            </a>
            .
          </p>
          <div className="rounded-2xl border border-line bg-card p-6 shadow-sm">
            <PickupForm compact />
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-copper">FAQ</p>
          <h2 className="mt-2 mb-8 font-display text-5xl tracking-wide">Questions, answered</h2>
          <Faq items={generalFaq.slice(0, 5)} />
          <FaqJsonLd items={generalFaq.slice(0, 5)} />
        </div>
      </section>
    </>
  );
}
