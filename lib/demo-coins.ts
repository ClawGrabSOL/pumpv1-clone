// Fresh demo data — no real tokens, no real trades. Pure UI dressing.

export type Coin = {
  id: string;
  name: string;
  ticker: string;
  description: string;
  emoji: string;
  bg: string;        // hex bg for placeholder tile
  creator: string;   // short wallet-ish handle
  createdAgoMin: number;
  marketCapUsd: number;
  replies: number;
  graduating: boolean;
  graduated: boolean;
};

const handles = ["7gK3pW", "4xT9aQ", "QzMv2L", "9HrB8N", "Pq3VeF", "Kt1RwY", "Ax7DcS", "L9bUmJ"];

function rand<T>(arr: T[], seed: number) {
  return arr[Math.abs(Math.floor(Math.sin(seed) * 10000)) % arr.length];
}

const palette = ["#22c35d", "#ff4d80", "#ffb020", "#22d3ee", "#a78bfa", "#f87171", "#34d399", "#fb923c"];

const seeds: Omit<Coin, "id" | "creator" | "createdAgoMin" | "marketCapUsd" | "replies" | "graduating" | "graduated" | "bg">[] = [
  { name: "Frog Supreme",     ticker: "FROG",   description: "ribbit szn. liquidity ribbits back.", emoji: "🐸" },
  { name: "Moon Goblin",      ticker: "GOBL",   description: "we mine, we hodl, we cackle.",         emoji: "👺" },
  { name: "Sleepy Cat Coin",  ticker: "ZZZ",    description: "purring on the chart 24/7.",           emoji: "😺" },
  { name: "Pixel Pepe",       ticker: "PXPE",   description: "8-bit hopium, infinite uptime.",       emoji: "🐸" },
  { name: "Banana Daddy",     ticker: "BNNA",   description: "potassium-backed monetary policy.",    emoji: "🍌" },
  { name: "Wizard Hat",       ticker: "WIZ",    description: "casting +1 candle every block.",       emoji: "🧙" },
  { name: "Disco Inferno",    ticker: "DISC",   description: "the chart is the dance floor.",        emoji: "🪩" },
  { name: "Ghost Stonks",     ticker: "BOO",    description: "spooky liquidity. nobody saw it.",     emoji: "👻" },
  { name: "Toast Coin",       ticker: "TOAST",  description: "buttered, crisp, never burnt.",        emoji: "🍞" },
  { name: "Yeti Mode",        ticker: "YETI",   description: "cold storage, warm heart.",            emoji: "🦣" },
  { name: "Lava Lamp",        ticker: "LAVA",   description: "vibes-only price action.",             emoji: "🌋" },
  { name: "Bubble Tea Bull",  ticker: "BOBA",   description: "extra tapioca, extra leverage.",       emoji: "🧋" },
];

export const DEMO_COINS: Coin[] = seeds.map((s, i) => {
  const seed = i + 7;
  return {
    id: `demo-${i}`,
    ...s,
    bg: palette[i % palette.length],
    creator: rand(handles, seed),
    createdAgoMin: Math.floor(2 + (Math.sin(seed * 1.3) + 1) * 60),
    marketCapUsd: Math.floor(800 + Math.abs(Math.sin(seed * 2.1)) * 18_000),
    replies: Math.floor(Math.abs(Math.sin(seed * 3.7)) * 14),
    graduating: i % 5 === 1,
    graduated: i % 7 === 0,
  };
});

export const KING_OF_THE_HILL: Coin = {
  id: "king",
  name: "Frog Supreme",
  ticker: "FROG",
  description: "currently sitting on the hill. crown stays on.",
  emoji: "🐸👑",
  bg: "#1a3a26",
  creator: "QzMv2L",
  createdAgoMin: 18,
  marketCapUsd: 64_300,
  replies: 41,
  graduating: false,
  graduated: false,
};

// Fake live trade feed used by the marquee at top of the page.
export type TickerEvent = { side: "bought" | "sold"; sol: number; ticker: string; handle: string };

export const DEMO_TICKER: TickerEvent[] = [
  { side: "bought", sol: 1.42, ticker: "FROG",  handle: "7gK3pW" },
  { side: "sold",   sol: 0.31, ticker: "GOBL",  handle: "4xT9aQ" },
  { side: "bought", sol: 0.88, ticker: "ZZZ",   handle: "QzMv2L" },
  { side: "bought", sol: 2.15, ticker: "PXPE",  handle: "9HrB8N" },
  { side: "sold",   sol: 0.55, ticker: "BNNA",  handle: "Pq3VeF" },
  { side: "bought", sol: 0.12, ticker: "WIZ",   handle: "Kt1RwY" },
  { side: "sold",   sol: 1.04, ticker: "DISC",  handle: "Ax7DcS" },
  { side: "bought", sol: 0.66, ticker: "BOO",   handle: "L9bUmJ" },
  { side: "bought", sol: 3.20, ticker: "FROG",  handle: "Pq3VeF" },
  { side: "sold",   sol: 0.09, ticker: "TOAST", handle: "Kt1RwY" },
  { side: "bought", sol: 0.74, ticker: "YETI",  handle: "7gK3pW" },
  { side: "bought", sol: 1.88, ticker: "LAVA",  handle: "4xT9aQ" },
  { side: "sold",   sol: 0.42, ticker: "BOBA",  handle: "9HrB8N" },
];

export function fmtMarketCap(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000)     return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n}`;
}

export function fmtAgo(min: number): string {
  if (min < 1)   return "just now";
  if (min < 60)  return `${Math.floor(min)}m ago`;
  if (min < 1440) return `${Math.floor(min / 60)}h ago`;
  return `${Math.floor(min / 1440)}d ago`;
}
