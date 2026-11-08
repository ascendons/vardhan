// Indicative buying rates for electrical & electronic scrap.
// Edit `updatedOn`, base prices and city factors here — every page reads from this file.

export const updatedOn = "2026-11-08";

export type Unit = "kg" | "pc";

export type CategoryId =
  | "copper"
  | "aluminium"
  | "cables"
  | "motors"
  | "batteries"
  | "ewaste"
  | "appliances"
  | "industrial";

export type Category = {
  id: CategoryId;
  name: string;
  short: string;
  blurb: string;
};

export const categories: Category[] = [
  { id: "copper", name: "Copper & Brass", short: "Copper", blurb: "Bright wire, winding, heavy copper, brass fittings" },
  { id: "aluminium", name: "Aluminium", short: "Aluminium", blurb: "Conductor, wire, Cu-Al radiators, AC coils" },
  { id: "cables", name: "Cables & Wires", short: "Cables", blurb: "PVC / armoured, house wiring, telecom cable" },
  { id: "motors", name: "Motors & Transformers", short: "Motors", blurb: "Motors, compressors, fans, transformers" },
  { id: "batteries", name: "Batteries & UPS", short: "Batteries", blurb: "Lead-acid, inverter, Li-ion, UPS units" },
  { id: "ewaste", name: "E-Waste & IT", short: "E-Waste", blurb: "PCBs, computers, laptops, phones, servers" },
  { id: "appliances", name: "Home Appliances", short: "Appliances", blurb: "ACs, fridges, washing machines, TVs" },
  { id: "industrial", name: "Industrial Electrical", short: "Industrial", blurb: "Panels, switchgear, MCBs, meters" },
];

export type RateItem = {
  id: string;
  name: string;
  note?: string;
  category: CategoryId;
  unit: Unit;
  min: number;
  max: number;
  /** % change vs previous update; positive = up */
  change: number;
  popular?: boolean;
};

export const items: RateItem[] = [
  // Copper & Brass
  { id: "cu-bright", name: "Copper Bright Wire (Armature)", note: "Bare, shiny, no coating", category: "copper", unit: "kg", min: 765, max: 795, change: 1.2, popular: true },
  { id: "cu-heavy", name: "Copper Heavy / Mixed", note: "Busbar, pipe, sheet", category: "copper", unit: "kg", min: 720, max: 750, change: 0.9, popular: true },
  { id: "cu-winding", name: "Copper Winding Wire", note: "Enamelled, from motors", category: "copper", unit: "kg", min: 690, max: 720, change: 0.6 },
  { id: "cu-burnt", name: "Copper Burnt Wire", note: "Burnt / oxidised", category: "copper", unit: "kg", min: 640, max: 680, change: -0.4 },
  { id: "brass-fit", name: "Brass Electrical Fittings", note: "Terminals, lugs, sockets", category: "copper", unit: "kg", min: 470, max: 500, change: 0.3 },

  // Aluminium
  { id: "al-wire", name: "Aluminium Wire / Conductor", note: "Bare, clean", category: "aluminium", unit: "kg", min: 190, max: 205, change: 0.8, popular: true },
  { id: "al-mixed", name: "Aluminium Mixed Scrap", note: "Housings, frames", category: "aluminium", unit: "kg", min: 140, max: 160, change: 0.0 },
  { id: "cual-rad", name: "Cu-Al Radiator / AC Coil", note: "Condenser & evaporator coils", category: "aluminium", unit: "kg", min: 330, max: 370, change: 1.5, popular: true },

  // Cables
  { id: "cable-cu-pvc", name: "Copper Cable (PVC Insulated)", note: "House wiring, flexible", category: "cables", unit: "kg", min: 310, max: 380, change: 0.7, popular: true },
  { id: "cable-cu-arm", name: "Copper Armoured Cable", note: "Power / LT cable", category: "cables", unit: "kg", min: 360, max: 440, change: 0.5 },
  { id: "cable-al", name: "Aluminium Cable (Insulated)", note: "LT / service cable", category: "cables", unit: "kg", min: 85, max: 115, change: -0.6 },
  { id: "cable-tel", name: "Telecom / Data Cable", note: "CAT5/6, jelly-filled", category: "cables", unit: "kg", min: 90, max: 140, change: 0.0 },

  // Motors & Transformers
  { id: "motor", name: "Electric Motor (Mixed)", note: "Copper-wound, any size", category: "motors", unit: "kg", min: 48, max: 60, change: 0.4, popular: true },
  { id: "compressor", name: "AC / Fridge Compressor", note: "Sealed unit", category: "motors", unit: "kg", min: 42, max: 52, change: -0.3 },
  { id: "fan", name: "Ceiling / Table Fan", note: "Complete fan", category: "motors", unit: "kg", min: 38, max: 48, change: 0.0 },
  { id: "trf-cu", name: "Transformer (Copper Wound)", note: "Oil drained", category: "motors", unit: "kg", min: 80, max: 105, change: 0.9 },
  { id: "trf-al", name: "Transformer (Aluminium Wound)", note: "Oil drained", category: "motors", unit: "kg", min: 38, max: 48, change: 0.2 },

  // Batteries
  { id: "bat-inv", name: "Inverter Battery (Lead-Acid)", note: "Tubular / flat plate", category: "batteries", unit: "kg", min: 78, max: 90, change: 1.1, popular: true },
  { id: "bat-car", name: "Car / Bike Battery", note: "Lead-acid", category: "batteries", unit: "kg", min: 72, max: 84, change: 0.8 },
  { id: "bat-ups", name: "SMF / UPS Battery", note: "Sealed maintenance free", category: "batteries", unit: "kg", min: 66, max: 76, change: 0.5 },
  { id: "bat-li", name: "Lithium-Ion Battery", note: "Packs, cells, EV modules", category: "batteries", unit: "kg", min: 70, max: 110, change: 2.4 },
  { id: "ups-unit", name: "UPS / Inverter (Without Battery)", note: "Complete unit", category: "batteries", unit: "kg", min: 28, max: 40, change: 0.0 },

  // E-waste & IT
  { id: "pcb-high", name: "Motherboard / PCB (High Grade)", note: "Computer, server, telecom", category: "ewaste", unit: "kg", min: 320, max: 480, change: 1.8, popular: true },
  { id: "pcb-low", name: "PCB (Low Grade)", note: "TV, power supply, toys", category: "ewaste", unit: "kg", min: 45, max: 85, change: 0.4 },
  { id: "ram", name: "RAM Sticks", note: "Gold-finger memory", category: "ewaste", unit: "kg", min: 900, max: 1300, change: 2.1 },
  { id: "cpu-desk", name: "Desktop CPU (Complete)", note: "With board & PSU", category: "ewaste", unit: "pc", min: 220, max: 400, change: 0.0, popular: true },
  { id: "laptop", name: "Laptop (Dead / Old)", note: "Any brand", category: "ewaste", unit: "pc", min: 250, max: 600, change: 0.5 },
  { id: "mobile", name: "Mobile Phone (Dead)", note: "Without battery", category: "ewaste", unit: "pc", min: 40, max: 150, change: 0.0 },
  { id: "hdd", name: "Hard Disk Drive", note: "3.5\" / 2.5\"", category: "ewaste", unit: "kg", min: 70, max: 110, change: 0.6 },
  { id: "server", name: "Servers & Networking", note: "Racks, switches, routers", category: "ewaste", unit: "kg", min: 60, max: 140, change: 0.9 },
  { id: "printer", name: "Printer / Scanner", note: "Complete", category: "ewaste", unit: "kg", min: 16, max: 24, change: 0.0 },
  { id: "ewaste-mix", name: "Mixed E-Waste", note: "Assorted electronics", category: "ewaste", unit: "kg", min: 18, max: 32, change: -0.5 },

  // Home appliances
  { id: "ac-split", name: "Split AC (1.5 Ton)", note: "Indoor + outdoor unit", category: "appliances", unit: "pc", min: 3800, max: 4800, change: 1.0, popular: true },
  { id: "ac-window", name: "Window AC (1.5 Ton)", note: "Complete", category: "appliances", unit: "pc", min: 3500, max: 4300, change: 0.7 },
  { id: "fridge", name: "Refrigerator", note: "Single / double door", category: "appliances", unit: "pc", min: 550, max: 1000, change: 0.0 },
  { id: "washer", name: "Washing Machine", note: "Top / front load", category: "appliances", unit: "pc", min: 500, max: 850, change: 0.0 },
  { id: "tv-led", name: "LED / LCD TV or Monitor", note: "Any size", category: "appliances", unit: "pc", min: 100, max: 300, change: -0.8 },
  { id: "tv-crt", name: "CRT TV / Monitor", note: "Picture tube", category: "appliances", unit: "pc", min: 80, max: 180, change: 0.0 },
  { id: "microwave", name: "Microwave / Small Appliances", note: "Mixer, iron, geyser", category: "appliances", unit: "kg", min: 18, max: 26, change: 0.0 },

  // Industrial
  { id: "panel", name: "Electrical Panels / Switchgear", note: "LT panels, DBs", category: "industrial", unit: "kg", min: 40, max: 60, change: 0.3 },
  { id: "mcb", name: "MCB / MCCB / Contactors", note: "Loose or boxed", category: "industrial", unit: "kg", min: 55, max: 90, change: 0.6 },
  { id: "meter", name: "Energy Meters", note: "Electronic / mechanical", category: "industrial", unit: "kg", min: 30, max: 45, change: 0.0 },
  { id: "ups-ind", name: "Industrial UPS / Stabiliser", note: "Online UPS, servo stabilisers", category: "industrial", unit: "kg", min: 35, max: 55, change: 0.4 },
  { id: "light", name: "LED Fittings & Drivers", note: "Tube, panel, street lights", category: "industrial", unit: "kg", min: 20, max: 35, change: 0.0 },
];

export type City = { slug: string; name: string; factor: number };

export const cities: City[] = [
  { slug: "mumbai", name: "Mumbai", factor: 1.0 },
  { slug: "thane", name: "Thane", factor: 0.995 },
  { slug: "navi-mumbai", name: "Navi Mumbai", factor: 0.995 },
  { slug: "pune", name: "Pune", factor: 0.985 },
  { slug: "nashik", name: "Nashik", factor: 0.975 },
  { slug: "ahmedabad", name: "Ahmedabad", factor: 0.99 },
  { slug: "surat", name: "Surat", factor: 0.985 },
  { slug: "delhi", name: "Delhi NCR", factor: 1.005 },
  { slug: "bengaluru", name: "Bengaluru", factor: 0.99 },
  { slug: "hyderabad", name: "Hyderabad", factor: 0.985 },
];

export const defaultCity = cities[0];

export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}

function roundRate(n: number) {
  if (n >= 1000) return Math.round(n / 50) * 50;
  if (n >= 200) return Math.round(n / 5) * 5;
  return Math.round(n);
}

export type CityRate = RateItem & { cityMin: number; cityMax: number };

export function ratesFor(city: City): CityRate[] {
  return items.map((i) => ({
    ...i,
    cityMin: roundRate(i.min * city.factor),
    cityMax: roundRate(i.max * city.factor),
  }));
}

export const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
