export const PALETTE_RAMPS = {
  indigo: ['#0b0a1e','#15133a','#221f57','#34307a','#4d49a0','#7571c4'],
  plum: ['#1f0f24','#38183f','#56235e','#79347f','#a0529f','#c985c2'],
  moon: ['#1b2b4a','#2a4470','#3f629a','#6288c2','#95b4de','#cfe0f5'],
  hoodie: ['#0f2a5c','#173f8a','#2159b8','#3a7de0','#69a3f0','#a6caf8'],
  wood: ['#2a160d','#472613','#6b3b1d','#8f5528','#b97a3d','#dba468'],
  brass: ['#4a3410','#735217','#a37a1f','#cfa22c','#ecc84a','#fbe888'],
  parchment: ['#6b5a45','#957f60','#bba580','#d9c79f','#efe3c0','#fbf4df'],
  lamp: ['#5c1f0a','#8f3410','#c4511a','#ee7a2a','#f9a84a','#fdd58a'],
} as const;

export const WARM_RAMPS = ['wood','brass','parchment','lamp'] as const;
export const COOL_RAMPS = ['indigo','plum','moon','hoodie'] as const;
export const PALETTE: readonly string[] = Object.values(PALETTE_RAMPS).flat();

export const paletteTailwindColors: Record<string, Record<string, string>> = Object.fromEntries(
  Object.entries(PALETTE_RAMPS).map(([name, steps]) => [
    name,
    Object.fromEntries(steps.map((hex, i) => [String(i + 1), hex])),
  ]),
);
