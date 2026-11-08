import Link from "next/link";
import { cities, formatDate, ratesFor, updatedOn, type City } from "@/lib/rates";
import { site } from "@/lib/site";
import { RateBoard } from "./RateBoard";
import { Faq, FaqJsonLd, generalFaq } from "./Faq";
import { PhoneIcon } from "./Icons";

export function RatesPage({ city }: { city: City }) {
  const rates = ratesFor(city);
  return (
    <>
      <section className="hero-bg relative overflow-hidden text-white">
        <div aria-hidden className="circuit absolute inset-0" />
        <div className="relative w-full px-4 pb-10 pt-12 sm:px-6 lg:px-10 2xl:px-16">
          <nav aria-label="Breadcrumb" className="text-xs text-white/50">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/scrap-rates/" className="hover:text-white">Scrap Rates</Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">{city.name}</span>
          </nav>
          <h1 className="mt-4 font-display text-5xl leading-none tracking-wide sm:text-6xl">
            E-Scrap Rates in <span className="copper-text">{city.name}</span> Today
          </h1>
          <p className="mt-3 max-w-2xl text-white/70">
            Buying prices for copper, cables, motors, batteries, e-waste and old appliances in{" "}
            {city.name}. Bulk quantities (500 kg+) get better rates. Call us for a quote.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <span className="inline-flex items-center gap-2 text-white/80">
              <span className="pulse-dot h-2 w-2 rounded-full bg-up" />
              Updated <time dateTime={updatedOn}>{formatDate(updatedOn)}</time>
            </span>
            <a href={site.phoneHref} className="inline-flex items-center gap-2 text-molten hover:underline">
              <PhoneIcon className="h-4 w-4" /> Bulk quote: <span className="num">{site.phoneDisplay}</span>
            </a>
          </div>

          <div className="no-scrollbar mt-7 flex gap-2 overflow-x-auto pb-1" aria-label="Choose city">
            {cities.map((c) => {
              const active = c.slug === city.slug;
              return (
                <Link
                  key={c.slug}
                  href={`/scrap-rates/${c.slug}/`}
                  aria-current={active ? "page" : undefined}
                  className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "border-copper-bright bg-copper-bright text-ink"
                      : "border-white/15 text-white/75 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {c.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-8 sm:px-6 lg:px-10 2xl:px-16">
        <RateBoard rates={rates} cityName={city.name} />

        <div className="mt-8 rounded-xl border border-copper/25 bg-copper/5 p-5 text-sm leading-relaxed text-ink/80">
          <strong className="text-ink">Note:</strong> Rates are indicative for {city.name} as of{" "}
          {formatDate(updatedOn)} and depend on grade, purity and quantity. Appliance prices are per piece
          in working or non-working condition. The final price is confirmed after inspection and
          digital weighing at pickup.
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        <h2 className="mb-5 font-display text-4xl tracking-wide">Frequently Asked Questions</h2>
        <Faq items={generalFaq} />
        <FaqJsonLd items={generalFaq} />
      </section>
    </>
  );
}
