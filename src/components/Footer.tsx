import Link from "next/link";
import { categories, cities } from "@/lib/rates";
import { site } from "@/lib/site";
import { Logo } from "./Header";
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "./Icons";

export function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="grid w-full gap-10 px-4 py-14 sm:px-6 lg:px-10 2xl:px-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-relaxed">
            We buy electrical and electronic scrap from homes, offices and factories: copper, cables,
            motors, batteries, PCBs and old appliances. Fair rates, digital weighing, same-day payment.
          </p>
        </div>

        <div>
          <h3 className="font-display text-xl tracking-wider text-white">Scrap Rates by City</h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link href={`/scrap-rates/${c.slug}/`} className="hover:text-molten">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-xl tracking-wider text-white">What We Buy</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/scrap-rates/?cat=${c.id}`} className="hover:text-molten">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-xl tracking-wider text-white">Get in Touch</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={site.phoneHref} className="flex items-start gap-2.5 hover:text-molten">
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0" />
                <span className="num">{site.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-start gap-2.5 hover:text-molten">
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0" />
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0" />
              {site.address}
            </li>
            <li className="flex items-start gap-2.5">
              <ClockIcon className="mt-0.5 h-4 w-4 shrink-0" />
              {site.hours}
            </li>
          </ul>
          <div className="mt-5 flex gap-3 text-sm">
            <Link href="/business/" className="text-molten hover:underline">
              Bulk &amp; corporate
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/contact/" className="text-molten hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="flex w-full flex-col gap-2 px-4 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10 2xl:px-16">
          <span>© {new Date().getFullYear()} Vardhan Metals. All rights reserved.</span>
          <span>
            Rates shown are indicative and may change with market conditions. The final price is set
            after inspection and weighing.
          </span>
        </div>
      </div>
    </footer>
  );
}
