"use client";

import { useState, type FormEvent } from "react";
import { categories, cities } from "@/lib/rates";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";

const field =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted/60 focus:border-copper";

export function PickupForm({ compact = false }: { compact?: boolean }) {
  const [types, setTypes] = useState<string[]>([]);
  const [error, setError] = useState("");

  function toggle(name: string) {
    setTypes((t) => (t.includes(name) ? t.filter((x) => x !== name) : [...t, name]));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const phone = String(f.get("phone") ?? "").replace(/\D/g, "");
    if (phone.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    const lines = [
      "*Scrap Pickup Request: Vardhan Metals*",
      `Name: ${f.get("name")}`,
      `Mobile: ${f.get("phone")}`,
      `City: ${f.get("city")}`,
      f.get("area") ? `Area / Address: ${f.get("area")}` : "",
      `Scrap type: ${types.length ? types.join(", ") : "Not specified"}`,
      `Approx quantity: ${f.get("qty")}`,
      f.get("type") ? `Seller type: ${f.get("type")}` : "",
      f.get("notes") ? `Notes: ${f.get("notes")}` : "",
    ].filter(Boolean);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-medium">
          Your name
          <input name="name" required autoComplete="name" className={field} placeholder="Full name" />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Mobile number
          <input name="phone" required type="tel" inputMode="tel" autoComplete="tel" className={field} placeholder="10-digit mobile" />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          City
          <select name="city" className={field} defaultValue={cities[0].name}>
            {cities.map((c) => (
              <option key={c.slug}>{c.name}</option>
            ))}
            <option>Other</option>
          </select>
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Approx. quantity
          <select name="qty" className={field} defaultValue="20 – 100 kg">
            <option>Under 20 kg</option>
            <option>20 – 100 kg</option>
            <option>100 – 500 kg</option>
            <option>500 kg – 1 tonne</option>
            <option>1 tonne +</option>
            <option>Appliance (pieces)</option>
          </select>
        </label>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium">What are you selling?</legend>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const on = types.includes(c.name);
            return (
              <button
                type="button"
                key={c.id}
                aria-pressed={on}
                onClick={() => toggle(c.name)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  on ? "border-copper bg-copper text-white" : "border-line bg-white text-ink/75 hover:border-copper/60"
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>
      </fieldset>

      {!compact && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1.5 text-sm font-medium">
            Area / Address
            <input name="area" autoComplete="street-address" className={field} placeholder="Locality, landmark" />
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            I am a
            <select name="type" className={field} defaultValue="Household">
              <option>Household</option>
              <option>Shop / Office</option>
              <option>Factory / Industry</option>
              <option>Contractor / Electrician</option>
              <option>Scrap dealer</option>
            </select>
          </label>
          <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">
            Notes (optional)
            <textarea name="notes" rows={3} className={field} placeholder="e.g. 3 old split ACs, 40 kg copper cable, 10 inverter batteries" />
          </label>
        </div>
      )}

      {error && (
        <p role="alert" className="text-sm font-medium text-down">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1da851] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#17903f]"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Request Free Pickup on WhatsApp
      </button>
      <p className="text-xs text-muted">
        WhatsApp opens with your details filled in. We usually reply within 30 minutes during working hours.
      </p>
    </form>
  );
}
