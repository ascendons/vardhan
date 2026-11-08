import { defaultCity, inr, ratesFor } from "@/lib/rates";

export function Ticker() {
  const rows = ratesFor(defaultCity).filter((r) => r.popular);
  const loop = [...rows, ...rows];
  return (
    <div className="ticker overflow-hidden border-y border-white/10 bg-ink-2 text-white" aria-label="Today's popular scrap rates">
      <div className="ticker-track flex w-max">
        {loop.map((r, i) => (
          <div
            key={`${r.id}-${i}`}
            className="flex items-center gap-2 border-r border-white/10 px-5 py-2.5 text-sm"
            aria-hidden={i >= rows.length}
          >
            <span className="text-white/60">{r.name}</span>
            <span className="num font-semibold">
              ₹{inr.format(r.cityMax)}
              <span className="text-xs font-normal text-white/45">/{r.unit === "pc" ? "pc" : "kg"}</span>
            </span>
            {r.change !== 0 && (
              <span className={`num text-xs font-semibold ${r.change > 0 ? "text-[#4ade80]" : "text-[#f87171]"}`}>
                {r.change > 0 ? "▲" : "▼"} {Math.abs(r.change).toFixed(1)}%
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
