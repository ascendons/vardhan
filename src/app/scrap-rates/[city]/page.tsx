import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RatesPage } from "@/components/RatesPage";
import { cities, getCity } from "@/lib/rates";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata(props: PageProps<"/scrap-rates/[city]">): Promise<Metadata> {
  const { city } = await props.params;
  const c = getCity(city);
  if (!c) return {};
  return {
    title: `Scrap Rates in ${c.name} Today: Copper, Cable, Battery & E-Waste`,
    description: `Today's electrical & electronic scrap rates in ${c.name}: copper wire, cables, motors, batteries, PCBs, computers and ACs. Free pickup and instant payment.`,
    alternates: { canonical: `/scrap-rates/${c.slug}/` },
  };
}

export default async function Page(props: PageProps<"/scrap-rates/[city]">) {
  const { city } = await props.params;
  const c = getCity(city);
  if (!c) notFound();
  return <RatesPage city={c} />;
}
