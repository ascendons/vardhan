import type { Metadata } from "next";
import { RatesPage } from "@/components/RatesPage";
import { defaultCity } from "@/lib/rates";

export const metadata: Metadata = {
  title: "Electrical & E-Waste Scrap Rates Today",
  description:
    "Today's buying rates for copper wire, cables, motors, transformers, batteries, PCBs, computers, ACs and other electrical & electronic scrap.",
};

export default function Page() {
  return <RatesPage city={defaultCity} />;
}
