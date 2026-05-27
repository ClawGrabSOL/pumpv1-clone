# pumpv1-clone

A fresh meme-coin launchpad UI clone — visually mirrors pumpv1.net (dark theme, Solana-green accents, bracket-style nav) but ships with **zero real tokens** and **demo data only**.

## Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript + Tailwind v4
- Solana Wallet Adapter (Phantom, Solflare, + any Wallet Standard wallet)

## Features

- Live trade ticker (demo)
- "King of the hill" featured card
- Search + filter + sort over a demo coin grid
- Functional Connect Wallet button (mainnet RPC)

## Local dev

```bash
npm install --ignore-scripts
npm run dev
```

Then open http://localhost:3000.

## Notes

- The Connect Wallet flow uses `@solana/wallet-adapter-react-ui`. To actually approve a connection you need a Solana wallet extension installed (Phantom is the easiest).
- All coins/trades/handles in `lib/demo-coins.ts` are fabricated. No tokens are minted. No transactions are sent.
- The dev RPC endpoint is Solana's public `mainnet-beta` cluster. For production traffic, swap in a paid RPC (Helius, QuickNode, Triton) via `clusterApiUrl` in `app/providers.tsx`.
