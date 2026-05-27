"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { DEMO_COINS, DEMO_TICKER, KING_OF_THE_HILL, fmtAgo, fmtMarketCap, type Coin } from "@/lib/demo-coins";

// WalletMultiButton injects a styled "Select Wallet" / "Connect" button and
// opens the wallet adapter modal. Loaded SSR-off because the wallet adapter
// touches `window` during init.
const WalletMultiButton = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

type SortKey = "new" | "old" | "mcap" | "replies";
type FilterKey = "all" | "graduating" | "graduated";

export default function Home() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [sort, setSort] = useState<SortKey>("new");
  const [query, setQuery] = useState("");

  const coins = useMemo(() => {
    let list = [...DEMO_COINS];
    if (filter === "graduating") list = list.filter((c) => c.graduating);
    if (filter === "graduated")  list = list.filter((c) => c.graduated);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.ticker.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case "new":     list.sort((a, b) => a.createdAgoMin - b.createdAgoMin); break;
      case "old":     list.sort((a, b) => b.createdAgoMin - a.createdAgoMin); break;
      case "mcap":    list.sort((a, b) => b.marketCapUsd - a.marketCapUsd); break;
      case "replies": list.sort((a, b) => b.replies - a.replies); break;
    }
    return list;
  }, [filter, sort, query]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── HEADER ── */}
      <header className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-[var(--border)]">
        <div className="flex items-center gap-5">
          <a href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="SOLUP" width={28} height={28} className="rounded-md" />
            <span className="font-bold text-white tracking-tight hidden sm:inline">SOLUP</span>
          </a>
          <nav className="flex items-center gap-3 text-[var(--muted)]">
            <BracketLink>how it works</BracketLink>
            <BracketLink>advanced</BracketLink>
            <BracketLink>support</BracketLink>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <ThemeButton />
          <WalletMultiButton style={walletBtnStyle} />
        </div>
      </header>

      {/* ── LIVE TRADE TICKER ── */}
      <div className="border-b border-[var(--border)] overflow-hidden py-2">
        <div className="ticker-track">
          {[...DEMO_TICKER, ...DEMO_TICKER].map((t, i) => (
            <div key={i} className="flex items-center gap-2 px-5 text-xs whitespace-nowrap">
              <span className={`w-2 h-2 rounded-full ${t.side === "bought" ? "bg-[var(--green)]" : "bg-[var(--pink)]"}`} />
              <span className="font-mono text-[var(--muted)]">{t.handle}</span>
              <span className="text-[var(--text)]">{t.side}</span>
              <span className="font-mono">{t.sol.toFixed(2)} SOL of</span>
              <span className="font-bold text-[var(--green)]">{t.ticker}</span>
            </div>
          ))}
        </div>
      </div>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-6 py-10">
        {/* ── START A NEW COIN ── */}
        <div className="flex justify-center mb-10">
          <button
            type="button"
            onClick={() => alert("Coin creation isn't live yet — demo build. 👀")}
            className="text-white font-semibold hover:text-[var(--green)] transition-colors"
          >
            [start a new coin]
          </button>
        </div>

        {/* ── KING OF THE HILL ── */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 text-[var(--gold)] italic font-bold text-lg">
            <span>👑</span>
            <span>king of the hill</span>
            <span>👑</span>
          </div>
        </div>
        <KingCard coin={KING_OF_THE_HILL} />

        {/* ── SEARCH ── */}
        <div className="mt-10 mb-5">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search by name, ticker, or contract address"
            className="w-full bg-[var(--card)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--green)]"
          />
        </div>

        {/* ── FILTERS + SORT ── */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <Pill active={filter === "all"}        onClick={() => setFilter("all")}>all</Pill>
          <Pill active={filter === "graduating"} onClick={() => setFilter("graduating")}>graduating 🎓</Pill>
          <Pill active={filter === "graduated"}  onClick={() => setFilter("graduated")}>graduated ✅</Pill>
          <div className="w-px h-5 bg-[var(--border)] mx-1" />
          <Pill active={sort === "new"}     onClick={() => setSort("new")}>sort: new ⌄</Pill>
          <Pill active={sort === "old"}     onClick={() => setSort("old")}>sort: old</Pill>
          <Pill active={sort === "mcap"}    onClick={() => setSort("mcap")}>sort: mcap</Pill>
          <Pill active={sort === "replies"} onClick={() => setSort("replies")}>sort: replies</Pill>
        </div>

        {/* ── BUY BUTTON NUDGE ── */}
        <div className="bg-[var(--bg-elev)] border border-[var(--border)] rounded-lg px-4 py-3 mb-6 flex items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-[var(--gold)]">⚡</span>
            <span className="font-bold">looking for the buy button?</span>
            <span className="text-[var(--muted)] hidden sm:inline">
              hit up Advanced for rapid-fire buys straight from the coin list!
            </span>
          </div>
          <span className="text-[var(--green)] text-xs">[try advanced]</span>
        </div>

        {/* ── COIN GRID ── */}
        {coins.length === 0 ? (
          <div className="text-center text-[var(--muted)] py-16 text-sm">
            no coins matched your filters. teddy is napping.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {coins.map((c) => <CoinCard key={c.id} coin={c} />)}
          </div>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[var(--border)] px-6 py-6 text-xs text-[var(--muted)]">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div>SOLUP · demo build · not financial advice · no real tokens</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white">terms</a>
            <a href="#" className="hover:text-white">privacy</a>
            <a href="#" className="hover:text-white">docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── components ────────────────────────────────────────────────────────────────

function BracketLink({ children }: { children: React.ReactNode }) {
  return (
    <button type="button" className="hover:text-white transition-colors">
      [{children}]
    </button>
  );
}

function ThemeButton() {
  // visual-only — site is dark-mode native
  return (
    <button
      type="button"
      aria-label="theme"
      className="w-9 h-9 rounded-lg bg-[var(--card)] border border-[var(--border)] hover:border-[var(--muted)] flex items-center justify-center"
    >
      🌑
    </button>
  );
}

function Pill({
  active,
  onClick,
  children,
}: { active?: boolean; onClick?: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
        active
          ? "bg-[var(--green)] text-white border-transparent"
          : "bg-transparent text-[var(--muted)] border-[var(--border)] hover:text-white hover:border-[var(--muted)]"
      }`}
    >
      {children}
    </button>
  );
}

function CoinTile({ coin, size = 80 }: { coin: Coin; size?: number }) {
  return (
    <div
      className="rounded-lg flex items-center justify-center shrink-0"
      style={{ width: size, height: size, background: coin.bg + "22", border: `1px solid ${coin.bg}55` }}
      aria-label={coin.name}
    >
      <span style={{ fontSize: size * 0.5 }}>{coin.emoji}</span>
    </div>
  );
}

function KingCard({ coin }: { coin: Coin }) {
  return (
    <div className="card-glow mx-auto max-w-2xl flex items-start gap-4 p-4 rounded-xl border border-[var(--gold)]/40"
         style={{ background: "linear-gradient(180deg, rgba(255,176,32,0.04), rgba(255,176,32,0.0))" }}>
      <CoinTile coin={coin} size={96} />
      <div className="flex-1 min-w-0">
        <div className="text-xs text-[var(--muted)]">
          created by <span className="text-[var(--gold)]">🪙 {coin.creator}</span> · {fmtAgo(coin.createdAgoMin)}
        </div>
        <div className="text-[var(--green)] text-sm mt-1">
          market cap: <span className="font-mono">{fmtMarketCap(coin.marketCapUsd)}</span> <span className="ml-1">🎉</span>
        </div>
        <div className="text-xs text-[var(--muted)] mt-1">replies: {coin.replies}</div>
        <div className="font-bold text-white mt-2">{coin.name} <span className="text-[var(--muted)] font-normal">[{coin.ticker}]</span></div>
        <div className="text-xs text-[var(--muted)] mt-0.5">{coin.description}</div>
      </div>
    </div>
  );
}

function CoinCard({ coin }: { coin: Coin }) {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-elev)] border border-transparent hover:border-[var(--border)] transition-colors"
    >
      <CoinTile coin={coin} size={80} />
      <div className="flex-1 min-w-0">
        <div className="text-xs text-[var(--muted)]">
          created by <span className="text-[var(--gold)]">🪙 {coin.creator}</span> · {fmtAgo(coin.createdAgoMin)}
        </div>
        <div className="text-[var(--green)] text-xs mt-1">
          market cap: <span className="font-mono">{fmtMarketCap(coin.marketCapUsd)}</span>
        </div>
        <div className="text-xs text-[var(--muted)] mt-0.5">replies: {coin.replies}</div>
        <div className="text-sm mt-1 truncate">
          <span className="font-bold text-white">{coin.name}</span>{" "}
          <span className="text-[var(--muted)]">({coin.ticker})</span>:{" "}
          <span className="text-[var(--muted)]">{coin.description}</span>
        </div>
      </div>
    </a>
  );
}

const walletBtnStyle: React.CSSProperties = {
  background: "var(--green)",
  color: "white",
  fontFamily: "Inter, sans-serif",
  fontSize: 13,
  fontWeight: 600,
  height: 36,
  padding: "0 14px",
  borderRadius: 8,
  lineHeight: 1,
};
