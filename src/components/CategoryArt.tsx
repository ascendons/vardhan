import type { CategoryId } from "@/lib/rates";

// Original illustrations for each scrap category (viewBox 240×160).
// Drawn on a transparent background; the card supplies the backdrop.

const CU = { hi: "#f6b27a", mid: "#d9742f", lo: "#8f4215" };

function Copper() {
  const rings = [70, 63, 56, 49, 42];
  return (
    <svg viewBox="0 0 240 160" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="cu-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={CU.hi} />
          <stop offset=".5" stopColor={CU.mid} />
          <stop offset="1" stopColor={CU.lo} />
        </linearGradient>
        <linearGradient id="brass-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3d98a" />
          <stop offset="1" stopColor="#a8822c" />
        </linearGradient>
      </defs>
      <ellipse cx="108" cy="122" rx="82" ry="18" fill="#000" opacity=".35" />
      {/* side thickness of the wire hank */}
      {rings.map((r) => (
        <ellipse key={`s${r}`} cx="108" cy="98" rx={r} ry={r * 0.38} fill="none" stroke={CU.lo} strokeWidth="5" />
      ))}
      {[0, 3, 6, 9].map((d) => (
        <g key={d} transform={`translate(0 ${-d})`}>
          {rings.map((r, i) => (
            <ellipse key={r} cx="108" cy="96" rx={r} ry={r * 0.38} fill="none" stroke={i % 2 ? CU.mid : "url(#cu-g)"} strokeWidth="4.2" />
          ))}
        </g>
      ))}
      <ellipse cx="108" cy="87" rx="36" ry="13" fill="#1a130e" />
      {rings.map((r) => (
        <path key={`h${r}`} d={`M${108 - r * 0.8} ${87 - r * 0.24} Q108 ${87 - r * 0.42} ${108 + r * 0.5} ${87 - r * 0.33}`} fill="none" stroke="#ffe2c4" strokeWidth="1.2" opacity=".7" />
      ))}
      {/* loose wire end */}
      <path d="M176 88 C196 92 200 110 214 116" fill="none" stroke="url(#cu-g)" strokeWidth="4.5" strokeLinecap="round" />
      {/* brass lug */}
      <g transform="translate(176 124) rotate(-12)">
        <rect x="0" y="0" width="34" height="12" rx="2" fill="url(#brass-g)" />
        <circle cx="38" cy="6" r="9" fill="url(#brass-g)" />
        <circle cx="38" cy="6" r="3.5" fill="#2a1f14" />
      </g>
    </svg>
  );
}

function Aluminium() {
  return (
    <svg viewBox="0 0 240 160" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="al-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8e959c" />
          <stop offset=".45" stopColor="#eef1f3" />
          <stop offset="1" stopColor="#9aa1a8" />
        </linearGradient>
        <radialGradient id="al-strand" cx=".35" cy=".35" r=".7">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#8b939a" />
        </radialGradient>
      </defs>
      <ellipse cx="120" cy="140" rx="96" ry="10" fill="#000" opacity=".35" />
      {/* AC coil: fins */}
      <g transform="translate(58 22) skewY(-6)">
        <rect x="0" y="0" width="142" height="104" rx="3" fill="#6d747b" />
        {Array.from({ length: 36 }, (_, i) => (
          <rect key={i} x={4 + i * 3.8} y="4" width="1.6" height="96" fill="url(#al-g)" />
        ))}
        {/* copper U-bends */}
        {[16, 40, 64, 88].map((y) => (
          <path key={y} d={`M142 ${y - 8} h8 a8 8 0 0 1 0 16 h-8`} fill="none" stroke={CU.mid} strokeWidth="5" />
        ))}
        {[16, 40, 64, 88].map((y) => (
          <path key={`l${y}`} d={`M0 ${y - 8} h-7 M0 ${y + 8} h-7`} stroke={CU.hi} strokeWidth="5" />
        ))}
        <rect x="-2" y="-2" width="146" height="5" fill="#b9c0c6" />
        <rect x="-2" y="101" width="146" height="5" fill="#80878e" />
      </g>
      {/* stranded conductor cut end */}
      <g transform="translate(46 112)">
        <circle r="24" fill="#3b3f44" />
        <circle r="20" fill="#5e656c" />
        {[
          [0, 0],
          [12, 0],
          [-12, 0],
          [6, 10.4],
          [-6, 10.4],
          [6, -10.4],
          [-6, -10.4],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5.8" fill="url(#al-strand)" stroke="#6b7279" strokeWidth=".6" />
        ))}
      </g>
    </svg>
  );
}

function Cables() {
  return (
    <svg viewBox="0 0 240 160" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="wood-g" cx=".4" cy=".35" r=".75">
          <stop offset="0" stopColor="#b98654" />
          <stop offset="1" stopColor="#6b4527" />
        </radialGradient>
      </defs>
      <ellipse cx="110" cy="146" rx="90" ry="8" fill="#000" opacity=".35" />
      {/* cable leaving drum */}
      <path d="M92 30 C150 18 170 62 196 74" fill="none" stroke="#151515" strokeWidth="15" />
      <path d="M92 26 C148 14 168 56 196 68" fill="none" stroke="#3a3a3a" strokeWidth="3" opacity=".8" />
      {/* drum flange */}
      <circle cx="88" cy="86" r="58" fill="url(#wood-g)" stroke="#4d2f19" strokeWidth="3" />
      <circle cx="88" cy="86" r="50" fill="none" stroke="#5a3a20" strokeWidth="1.2" opacity=".6" />
      {[0, 90, 180, 270].map((a) => (
        <circle key={a} cx={88 + 32 * Math.cos((a * Math.PI) / 180)} cy={86 + 32 * Math.sin((a * Math.PI) / 180)} r="7" fill="#2a1b10" />
      ))}
      <circle cx="88" cy="86" r="14" fill="#9aa1a8" stroke="#5e656c" strokeWidth="3" />
      <circle cx="88" cy="86" r="5" fill="#2a2a2a" />
      {/* wood grain */}
      <path d="M44 70 Q70 64 96 74 M50 108 Q80 100 120 112 M60 52 Q90 46 118 56" fill="none" stroke="#5a3a20" strokeWidth="1" opacity=".5" />
      {/* cut end with cores */}
      <g transform="translate(200 74) rotate(24)">
        <ellipse rx="7" ry="10" fill="#0d0d0d" />
        <circle cx="0" cy="-4.5" r="3.3" fill="#c2412d" />
        <circle cx="-2.6" cy="3" r="3.3" fill="#e6b422" />
        <circle cx="2.8" cy="3" r="3.3" fill="#2d6cc2" />
        {[
          [0, -4.5],
          [-2.6, 3],
          [2.8, 3],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.5" fill={CU.hi} />
        ))}
      </g>
      {/* loose house wires */}
      <path d="M150 128 C170 112 190 136 222 118" fill="none" stroke="#c2412d" strokeWidth="5" strokeLinecap="round" />
      <path d="M150 138 C176 124 196 146 226 132" fill="none" stroke="#2d6cc2" strokeWidth="5" strokeLinecap="round" />
      <path d="M222 118 l8 -4 M226 132 l8 -3" stroke={CU.hi} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function Motors() {
  return (
    <svg viewBox="0 0 240 160" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="mot-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5b8cc0" />
          <stop offset=".45" stopColor="#2f5d8a" />
          <stop offset="1" stopColor="#173553" />
        </linearGradient>
        <linearGradient id="shaft-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2f4f6" />
          <stop offset="1" stopColor="#7d858c" />
        </linearGradient>
      </defs>
      <ellipse cx="118" cy="140" rx="90" ry="9" fill="#000" opacity=".35" />
      {/* feet */}
      <path d="M68 118 h30 l6 18 h-44z M136 118 h30 l6 18 h-44z" fill="#1d3f61" />
      {/* exposed copper winding at rear */}
      <ellipse cx="54" cy="86" rx="12" ry="34" fill={CU.lo} />
      <ellipse cx="54" cy="86" rx="9" ry="28" fill="none" stroke={CU.hi} strokeWidth="3" strokeDasharray="3 2" />
      {/* body */}
      <rect x="54" y="52" width="118" height="68" rx="6" fill="url(#mot-g)" />
      {Array.from({ length: 14 }, (_, i) => (
        <rect key={i} x={62 + i * 7.6} y="52" width="2.6" height="68" fill="#1b3a5a" opacity=".55" />
      ))}
      {/* terminal box */}
      <rect x="94" y="36" width="38" height="18" rx="2" fill="#244b72" stroke="#173553" />
      <rect x="100" y="41" width="26" height="4" rx="1" fill="#173553" />
      {/* front end-shield */}
      <ellipse cx="172" cy="86" rx="12" ry="34" fill="#264d75" stroke="#173553" strokeWidth="2" />
      <ellipse cx="174" cy="86" rx="5" ry="14" fill="#173553" />
      {/* shaft */}
      <rect x="174" y="80" width="40" height="12" rx="2" fill="url(#shaft-g)" />
      <rect x="196" y="80" width="10" height="4" fill="#555c63" />
      {/* name plate */}
      <rect x="72" y="72" width="30" height="18" rx="1.5" fill="#d7dbde" />
      <path d="M76 77 h22 M76 81 h16 M76 85 h20" stroke="#6b7279" strokeWidth="1.2" />
    </svg>
  );
}

function Batteries() {
  return (
    <svg viewBox="0 0 240 160" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="bat-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1a1a1a" />
          <stop offset=".5" stopColor="#353535" />
          <stop offset="1" stopColor="#141414" />
        </linearGradient>
        <linearGradient id="li-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1f6b45" />
          <stop offset=".45" stopColor="#3fae74" />
          <stop offset="1" stopColor="#164f33" />
        </linearGradient>
      </defs>
      <ellipse cx="120" cy="142" rx="96" ry="9" fill="#000" opacity=".35" />
      {/* lead-acid battery */}
      <rect x="30" y="44" width="122" height="94" rx="6" fill="url(#bat-g)" />
      <rect x="26" y="38" width="130" height="16" rx="4" fill="#4a4a4a" />
      <rect x="44" y="26" width="18" height="14" rx="2" fill="#c2412d" />
      <rect x="120" y="26" width="18" height="14" rx="2" fill="#2a2a2a" stroke="#555" />
      <ellipse cx="53" cy="26" rx="9" ry="3" fill="#e06a55" />
      <ellipse cx="129" cy="26" rx="9" ry="3" fill="#555" />
      <rect x="30" y="76" width="122" height="30" fill="#e6b422" />
      <text x="91" y="97" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="15" fill="#1a1a1a">12V</text>
      <text x="44" y="98" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="18" fill="#c2412d">+</text>
      <text x="130" y="98" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="18" fill="#1a1a1a">−</text>
      {/* li-ion cells */}
      {[166, 190, 214].map((x, i) => (
        <g key={x} transform={`translate(${x} ${62 + (i % 2) * 6})`}>
          <rect x="-10" y="0" width="20" height="70" rx="4" fill="url(#li-g)" />
          <rect x="-10" y="0" width="20" height="6" rx="3" fill="#c9ced3" />
          <rect x="-4" y="-4" width="8" height="5" rx="1" fill="#c9ced3" />
          <rect x="-10" y="64" width="20" height="6" rx="3" fill="#9aa1a8" />
          <rect x="-6" y="26" width="12" height="16" rx="1" fill="#ffffff" opacity=".18" />
        </g>
      ))}
    </svg>
  );
}

function EWaste() {
  return (
    <svg viewBox="0 0 240 160" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="pcb-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2c8a5a" />
          <stop offset="1" stopColor="#14502f" />
        </linearGradient>
      </defs>
      <ellipse cx="120" cy="144" rx="96" ry="8" fill="#000" opacity=".35" />
      {/* motherboard */}
      <g transform="translate(34 18) rotate(-6 80 56)">
        <rect width="160" height="112" rx="4" fill="url(#pcb-g)" />
        <g fill="none" stroke="#7fd1a2" strokeWidth="1.2" opacity=".55">
          <path d="M10 20 h40 v24 h30 M10 30 h30 v30 h60 M10 90 h50 l12 -12 h40 M150 14 v30 h-30 M150 98 v-20 h-40 v-20" />
          <path d="M60 100 v-20 M70 100 v-14 M80 100 v-24" />
        </g>
        {/* CPU socket */}
        <rect x="58" y="20" width="44" height="44" rx="2" fill="#1a1a1a" />
        <rect x="66" y="28" width="28" height="28" rx="1" fill="#9aa1a8" />
        <rect x="70" y="32" width="20" height="20" fill="#c9ced3" />
        {/* chips */}
        {[
          [114, 22, 26, 18],
          [114, 50, 18, 14],
          [16, 66, 30, 20],
          [112, 76, 34, 22],
        ].map(([x, y, w, h], i) => (
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} rx="1.5" fill="#1d1d1d" />
            <path d={`M${x + 3} ${y - 2} ${Array.from({ length: Math.floor(w / 4) }, (_, k) => `M${x + 3 + k * 4} ${y - 2} v2 M${x + 3 + k * 4} ${y + h} v2`).join(" ")}`} stroke="#d4dadf" strokeWidth="1" />
          </g>
        ))}
        {/* capacitors */}
        {[24, 36, 48].map((x) => (
          <g key={x}>
            <circle cx={x} cy="104" r="5" fill="#2d6cc2" />
            <circle cx={x} cy="104" r="2" fill="#9cc0ef" />
          </g>
        ))}
        {/* gold fingers */}
        <rect x="160" y="30" width="6" height="52" fill="#e8c15a" />
      </g>
      {/* RAM stick */}
      <g transform="translate(96 108) rotate(4)">
        <rect width="132" height="28" rx="2" fill="#1f6b45" />
        {[8, 38, 68, 98].map((x) => (
          <rect key={x} x={x} y="4" width="24" height="14" rx="1" fill="#141414" />
        ))}
        {Array.from({ length: 30 }, (_, i) => (
          <rect key={i} x={4 + i * 4.2} y="22" width="2.4" height="6" fill="#e8c15a" />
        ))}
      </g>
    </svg>
  );
}

function Appliances() {
  return (
    <svg viewBox="0 0 240 160" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="ac-in" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#cfd4d8" />
        </linearGradient>
        <linearGradient id="ac-out" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e6e9eb" />
          <stop offset="1" stopColor="#a9b0b6" />
        </linearGradient>
      </defs>
      <ellipse cx="160" cy="148" rx="72" ry="7" fill="#000" opacity=".35" />
      {/* indoor unit */}
      <rect x="18" y="24" width="160" height="52" rx="16" fill="url(#ac-in)" />
      <path d="M30 62 h136" stroke="#9aa1a8" strokeWidth="2" />
      <path d="M34 68 h128" stroke="#b6bcc1" strokeWidth="4" strokeLinecap="round" />
      <circle cx="150" cy="44" r="3" fill="#3fae74" />
      <rect x="128" y="40" width="14" height="8" rx="1.5" fill="#1d2b36" />
      <text x="135" y="47" textAnchor="middle" fontFamily="Arial" fontSize="6.5" fill="#6fe3ff">24</text>
      {/* outdoor unit */}
      <rect x="110" y="84" width="112" height="62" rx="4" fill="url(#ac-out)" />
      <circle cx="148" cy="115" r="25" fill="#555c63" />
      {[22, 17, 12].map((r) => (
        <circle key={r} cx="148" cy="115" r={r} fill="none" stroke="#c9ced3" strokeWidth="1.2" />
      ))}
      {[0, 120, 240].map((a) => (
        <path key={a} d="M148 115 q10 -18 -2 -22 q-8 8 2 22" fill="#8e959c" transform={`rotate(${a} 148 115)`} />
      ))}
      <circle cx="148" cy="115" r="4" fill="#2a2a2a" />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x="184" y={92 + i * 6} width="30" height="2.4" fill="#8e959c" />
      ))}
      {/* copper pipes */}
      <path d="M40 76 C40 100 70 104 110 106" fill="none" stroke={CU.mid} strokeWidth="4" />
      <path d="M48 76 C48 94 76 96 110 98" fill="none" stroke={CU.hi} strokeWidth="3" />
    </svg>
  );
}

function Industrial() {
  return (
    <svg viewBox="0 0 240 160" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="pan-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c9ced3" />
          <stop offset="1" stopColor="#7d858c" />
        </linearGradient>
      </defs>
      <ellipse cx="120" cy="148" rx="90" ry="7" fill="#000" opacity=".35" />
      {/* panel */}
      <rect x="44" y="14" width="152" height="130" rx="5" fill="url(#pan-g)" />
      <rect x="52" y="22" width="136" height="114" rx="3" fill="#3a3f44" />
      {/* energy meter */}
      <rect x="64" y="30" width="56" height="40" rx="3" fill="#e9ecee" />
      <rect x="70" y="36" width="44" height="14" rx="1.5" fill="#1d2b2a" />
      <text x="92" y="47" textAnchor="middle" fontFamily="'Courier New', monospace" fontWeight="700" fontSize="10.5" fill="#7cf0a8">0482.6</text>
      <circle cx="76" cy="60" r="2.5" fill="#c2412d" />
      <rect x="84" y="58" width="28" height="4" rx="1" fill="#b6bcc1" />
      {/* contactor */}
      <rect x="132" y="30" width="44" height="40" rx="3" fill="#2a2a2a" />
      <rect x="138" y="36" width="32" height="8" rx="1" fill="#555" />
      <rect x="146" y="50" width="16" height="12" rx="1" fill="#e6b422" />
      {/* DIN rail with MCBs */}
      <rect x="58" y="88" width="124" height="6" fill="#9aa1a8" />
      {Array.from({ length: 7 }, (_, i) => (
        <g key={i} transform={`translate(${62 + i * 17} 78)`}>
          <rect width="14" height="40" rx="1.5" fill="#f4f5f6" />
          <rect x="4" y={i % 3 === 1 ? 20 : 10} width="6" height="9" rx="1" fill={i === 0 ? "#c2412d" : "#2a2a2a"} />
          <rect x="3" y="33" width="8" height="3" fill="#d4dadf" />
        </g>
      ))}
      {/* wires */}
      <path d="M70 118 v18 M87 118 v18 M104 118 v18" stroke="#c2412d" strokeWidth="2.5" />
      <path d="M121 118 v18 M138 118 v18" stroke="#e6b422" strokeWidth="2.5" />
      <path d="M155 118 v18 M172 118 v18" stroke="#2d6cc2" strokeWidth="2.5" />
    </svg>
  );
}

const art: Record<CategoryId, () => React.JSX.Element> = {
  copper: Copper,
  aluminium: Aluminium,
  cables: Cables,
  motors: Motors,
  batteries: Batteries,
  ewaste: EWaste,
  appliances: Appliances,
  industrial: Industrial,
};

export function CategoryArt({ id }: { id: CategoryId }) {
  const Art = art[id];
  return <Art />;
}
