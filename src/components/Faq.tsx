export type QA = { q: string; a: string };

export const generalFaq: QA[] = [
  {
    q: "How often are scrap rates updated?",
    a: "We update rates on business days. Copper, aluminium and battery prices follow the LME, MCX and local market, so they can move daily. The date at the top of the rate list shows the last update.",
  },
  {
    q: "Is the rate shown the final price I will get?",
    a: "Rates are indicative. Your final price depends on grade, purity, moisture and how much insulation or attachments the scrap carries, and on quantity. We confirm it on the spot after inspection and digital weighing, before you hand over anything.",
  },
  {
    q: "What is the minimum quantity for free pickup?",
    a: "Free doorstep pickup applies to about 20 kg of mixed scrap, or to any single appliance such as an AC, refrigerator or inverter battery. You can drop off smaller quantities at our yard.",
  },
  {
    q: "How do I get paid?",
    a: "We pay instantly by UPI, bank transfer (NEFT/IMPS) or cash once weighing is done. Businesses get a proper purchase invoice.",
  },
  {
    q: "Is my data safe when I sell old computers, phones and hard drives?",
    a: "Yes. We can physically destroy or degauss hard drives and storage media. Corporate clients can ask for a data-destruction certificate.",
  },
  {
    q: "Do you handle e-waste responsibly?",
    a: "Yes. E-waste we cannot reuse goes to authorised recyclers under the E-Waste (Management) Rules, so nothing ends up in landfill or informal burning.",
  },
  {
    q: "How can I get a better rate for my copper wire?",
    a: "Strip off the insulation, keep different grades separate (bright, mixed, burnt), and remove steel, plastic and dirt. Clean, sorted copper always gets the top of the range.",
  },
];

export function Faq({ items }: { items: QA[] }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-card">
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer items-center justify-between gap-6 px-5 py-4 font-medium hover:bg-paper/60">
            {f.q}
            <span className="faq-plus grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line text-copper transition-transform">
              +
            </span>
          </summary>
          <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function FaqJsonLd({ items }: { items: QA[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
