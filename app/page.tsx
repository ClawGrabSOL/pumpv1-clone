"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

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

  // No coins yet — fresh launchpad.
  const coins = useMemo<never[]>(() => [], []);
  // Refs to silence unused-var warnings without changing UI behavior.
  void filter; void sort; void query; void coins;

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
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white" aria-label="Twitter">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <WalletMultiButton style={walletBtnStyle} />
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-6 py-10">
        {/* ── START A NEW COIN ── */}
        <div className="flex justify-center mb-10">
          <button
            type="button"
            onClick={() => alert("Coin creation isn't live yet — demo build.")}
            className="text-white font-semibold hover:text-[var(--green)] transition-colors"
          >
            [start a new coin]
          </button>
        </div>

        {/* ── SEARCH ── */}
        <div className="mt-2 mb-5">
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
          <Pill active={filter === "graduating"} onClick={() => setFilter("graduating")}>graduating</Pill>
          <Pill active={filter === "graduated"}  onClick={() => setFilter("graduated")}>graduated</Pill>
          <div className="w-px h-5 bg-[var(--border)] mx-1" />
          <Pill active={sort === "new"}     onClick={() => setSort("new")}>sort: new</Pill>
          <Pill active={sort === "old"}     onClick={() => setSort("old")}>sort: old</Pill>
          <Pill active={sort === "mcap"}    onClick={() => setSort("mcap")}>sort: mcap</Pill>
          <Pill active={sort === "replies"} onClick={() => setSort("replies")}>sort: replies</Pill>
        </div>

        {/* ── EMPTY STATE ── */}
        <div className="border border-[var(--border)] rounded-xl py-20 px-6 text-center">
          <div className="text-[var(--muted)] text-sm">no coins yet.</div>
          <div className="text-[var(--muted)] text-xs mt-1">be the first to [start a new coin].</div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[var(--border)] px-6 py-6 text-xs text-[var(--muted)]">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div>SOLUP · not financial advice</div>
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
