"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { categories, inr, type CategoryId, type CityRate } from "@/lib/rates";
import { whatsappLink } from "@/lib/site";
import { SearchIcon, WhatsAppIcon } from "./Icons";

type Filter = "all" | CategoryId;

const noopSubscribe = () => () => {};

export function Change({ value }: { value: number }) {
  if (value === 0)
    return <span className="num inline-flex items-center gap-1 text-xs font-medium text-muted">— 0.0%</span>;
  const up = value > 0;
  return (
    <span className={`num inline-flex items-center gap-0.5 text-xs font-semibold ${up ? "text-up" : "text-down"}`}>
      <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" aria-hidden>
        <path d={up ? "M5 1 9 8H1z" : "M5 9 1 2h8z"} fill="currentColor" />
      </svg>
      {Math.abs(value).toFixed(1)}%
      <span className="sr-only">{up ? "up" : "down"}</span>
    </span>
  );
}

export function Price({ min, max, unit }: { min: number; max: number; unit: string }) {
  return (
    <span className="num whitespace-nowrap">
      <span className="font-semibold">₹{inr.format(min)}</span>
      <span className="text-muted"> – </span>
      <span className="font-semibold">₹{inr.format(max)}</span>
      <span className="ml-1 text-xs font-normal text-muted">/{unit === "pc" ? "piece" : "kg"}</span>
    </span>
  );
}

export function RateBoard({ rates, cityName }: { rates: CityRate[]; cityName: string }) {
  const [picked, setFilter] = useState<Filter | null>(null);
  const [query, setQuery] = useState("");

  // Deep links like /scrap-rates/?cat=batteries. Server render shows "All";
  // the client picks up the query string after hydration.
  const search = useSyncExternalStore(
    noopSubscribe,
    () => window.location.search,
    () => "",
  );
  const urlCat = new URLSearchParams(search).get("cat");
  const filter: Filter =
    picked ?? (categories.some((c) => c.id === urlCat) ? (urlCat as CategoryId) : "all");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rates.filter(
      (r) =>
        (filter === "all" || r.category === filter) &&
        (!q || r.name.toLowerCase().includes(q) || r.note?.toLowerCase().includes(q)),
    );
  }, [rates, filter, query]);

  const groups = categories
    .map((c) => ({ ...c, rows: visible.filter((r) => r.category === c.id) }))
    .filter((g) => g.rows.length > 0);

  const tabs: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    ...categories.map((c) => ({ id: c.id as Filter, label: c.short })),
  ];

  return (
    <div>
      <div className="sticky top-16 z-20 -mx-4 border-b border-line bg-paper/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-t-xl sm:border sm:px-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1" role="tablist" aria-label="Scrap categories">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={filter === t.id}
                onClick={() => setFilter(t.id)}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  filter === t.id
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-card text-ink/75 hover:border-ink/40"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <label className="relative block md:w-64">
            <span className="sr-only">Search scrap items</span>
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search e.g. copper, battery"
              className="w-full rounded-lg border border-line bg-card py-2 pl-9 pr-3 text-sm outline-none placeholder:text-muted/70 focus:border-copper"
            />
          </label>
        </div>
      </div>

      {groups.length === 0 && (
        <p className="rounded-b-xl border border-t-0 border-line bg-card p-10 text-center text-muted">
          No items match &ldquo;{query}&rdquo;. Call or WhatsApp us and we&apos;ll quote it for you.
        </p>
      )}

      <div className="space-y-8 pt-6">
        {groups.map((g) => (
          <section key={g.id} aria-labelledby={`h-${g.id}`}>
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <h3 id={`h-${g.id}`} className="font-display text-2xl tracking-wide">
                {g.name}
              </h3>
              <span className="hidden text-sm text-muted sm:block">{g.blurb}</span>
            </div>

            {/* Desktop table */}
            <div className="hidden overflow-hidden rounded-xl border border-line bg-card md:block">
              <table className="w-full table-fixed text-left text-sm">
                <thead className="bg-paper text-xs uppercase tracking-wider text-muted">
                  <tr>
                    <th className="w-[46%] px-5 py-3 font-semibold">Item</th>
                    <th className="w-[28%] px-5 py-3 font-semibold">Rate in {cityName}</th>
                    <th className="w-[14%] px-5 py-3 font-semibold">Change</th>
                    <th className="px-5 py-3 text-right font-semibold">
                      <span className="sr-only">Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {g.rows.map((r) => (
                    <tr key={r.id} className="hover:bg-paper/60">
                      <td className="px-5 py-3.5">
                        <div className="font-medium">
                          {r.name}
                          {r.popular && (
                            <span className="ml-2 rounded bg-copper/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-copper">
                              Popular
                            </span>
                          )}
                        </div>
                        {r.note && <div className="text-xs text-muted">{r.note}</div>}
                      </td>
                      <td className="px-5 py-3.5">
                        <Price min={r.cityMin} max={r.cityMax} unit={r.unit} />
                      </td>
                      <td className="px-5 py-3.5">
                        <Change value={r.change} />
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <SellLink item={r.name} city={cityName} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <ul className="grid gap-2.5 md:hidden">
              {g.rows.map((r) => (
                <li key={r.id} className="rounded-xl border border-line bg-card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium leading-snug">{r.name}</div>
                      {r.note && <div className="text-xs text-muted">{r.note}</div>}
                    </div>
                    <Change value={r.change} />
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <Price min={r.cityMin} max={r.cityMax} unit={r.unit} />
                    <SellLink item={r.name} city={cityName} />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function SellLink({ item, city }: { item: string; city: string }) {
  return (
    <a
      href={whatsappLink(`Hi Vardhan Metals, I want to sell "${item}" in ${city}. Approx quantity: `)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-[#25d366] hover:bg-[#25d366]/10"
    >
      <WhatsAppIcon className="h-3.5 w-3.5 text-[#1da851]" />
      Sell
    </a>
  );
}
