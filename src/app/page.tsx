import type { CSSProperties } from "react";

// Deterministic pseudo-random so server output is stable.
function seeded(i: number) {
  const x = Math.sin(i * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const sparks = Array.from({ length: 36 }, (_, i) => {
  const size = 2 + seeded(i) * 3;
  return {
    left: `${seeded(i + 100) * 100}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDuration: `${5 + seeded(i + 200) * 7}s`,
    animationDelay: `${seeded(i + 300) * 8}s`,
    "--drift": `${(seeded(i + 400) - 0.5) * 160}px`,
  } as CSSProperties;
});

const pillars = ["Strength", "Precision", "Trust"];

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-1 flex-col overflow-hidden bg-background">
      {/* Background layers */}
      <div aria-hidden className="grid-texture pointer-events-none absolute inset-0" />
      <div aria-hidden className="furnace-glow pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {sparks.map((style, i) => (
          <span key={i} className="spark" style={style} />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md border border-white/15 bg-gradient-to-br from-zinc-300 via-zinc-500 to-zinc-800 font-display text-2xl text-zinc-950 shadow-[0_0_20px_rgba(255,140,40,0.25)]">
            V
          </div>
          <span className="font-display text-2xl tracking-[0.2em] text-zinc-200">
            VARDHAN
          </span>
        </div>
        <span className="hidden rounded-full border border-ember/40 bg-ember/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-molten sm:inline-block">
          Under Construction
        </span>
      </header>

      {/* Hero */}
      <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-16 text-center">
        <p
          className="fade-up mb-6 text-xs font-medium uppercase tracking-[0.4em] text-zinc-400 sm:text-sm"
          style={{ animationDelay: "0.1s" }}
        >
          Something strong is taking shape
        </p>

        <h1
          className="fade-up font-display leading-[0.85]"
          style={{ animationDelay: "0.25s" }}
        >
          <span className="steel-text block text-[22vw] sm:text-[11rem] lg:text-[13rem]">
            Vardhan
          </span>
          <span className="steel-text block text-[16vw] tracking-[0.15em] sm:text-[6rem] lg:text-[7.5rem]">
            Metals
          </span>
        </h1>

        <h2
          className="fade-up mt-8 font-display text-3xl tracking-wide text-zinc-100 sm:text-5xl"
          style={{ animationDelay: "0.45s" }}
        >
          We&apos;re <span className="molten-text">forging</span> something
          extraordinary.
        </h2>

        <p
          className="fade-up mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
          style={{ animationDelay: "0.6s" }}
        >
          Our new digital home is in the furnace. Like the metal we work with,
          it&apos;s being shaped with heat, pressure and precision, and it
          will be worth the wait.
        </p>

        {/* Progress */}
        <div
          className="fade-up mt-12 w-full max-w-md"
          style={{ animationDelay: "0.75s" }}
        >
          <div className="mb-2 flex justify-between text-[11px] font-medium uppercase tracking-[0.3em] text-zinc-500">
            <span>Heating up</span>
            <span className="text-molten">78%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="heat-bar h-full w-[78%] rounded-full" />
          </div>
        </div>

        {/* Pillars */}
        <ul
          className="fade-up mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm uppercase tracking-[0.35em] text-zinc-300"
          style={{ animationDelay: "0.9s" }}
        >
          {pillars.map((p, i) => (
            <li key={p} className="flex items-center gap-6">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-ember" />}
              {p}
            </li>
          ))}
        </ul>
      </section>

      {/* Footer */}
      <footer className="relative z-10 flex flex-col items-center justify-between gap-2 border-t border-white/5 px-6 py-6 text-xs text-zinc-500 sm:flex-row sm:px-10">
        <span>© Vardhan Metals. All rights reserved.</span>
        <span className="tracking-[0.25em] uppercase">Launching soon</span>
      </footer>
    </main>
  );
}
