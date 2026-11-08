"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/site";
import { PhoneIcon } from "./Icons";

const nav = [
  { href: "/scrap-rates/", label: "Scrap Rates" },
  { href: "/#what-we-buy", label: "What We Buy" },
  { href: "/business/", label: "For Business" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/contact/", label: "Contact" },
];

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-md bg-gradient-to-br from-[#f0a066] via-copper-bright to-copper font-display text-2xl leading-none text-ink">
        V
      </span>
      <span className="leading-none">
        <span className={`block font-display text-2xl tracking-[0.14em] ${light ? "text-white" : "text-ink"}`}>
          VARDHAN
        </span>
        <span className={`block text-[9px] font-semibold uppercase tracking-[0.32em] ${light ? "text-white/50" : "text-muted"}`}>
          Metals · E-Scrap
        </span>
      </span>
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/95 text-white backdrop-blur">
      <div className="flex h-16 w-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-10 2xl:px-16">
        <Link href="/" aria-label="Vardhan Metals home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((n) => {
            const active = !n.href.includes("#") && pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "text-molten" : "text-white/75 hover:text-white"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white/80 hover:text-white md:flex"
          >
            <PhoneIcon className="h-4 w-4" />
            <span className="num">{site.phoneDisplay}</span>
          </a>
          <Link
            href="/contact/#pickup"
            className="rounded-md bg-copper-bright px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-molten"
          >
            Sell Scrap
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-md text-white/80 hover:bg-white/10 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 px-4 pb-4 pt-2 lg:hidden" aria-label="Mobile">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-3 text-base font-medium text-white/85 hover:bg-white/5"
            >
              {n.label}
            </Link>
          ))}
          <a href={site.phoneHref} className="mt-2 flex items-center gap-2 px-3 py-3 text-base text-molten">
            <PhoneIcon className="h-5 w-5" />
            <span className="num">{site.phoneDisplay}</span>
          </a>
        </nav>
      )}
    </header>
  );
}
