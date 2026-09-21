# PreStocks Lens

Read-only market-intelligence prototype for the official Solana Stocklana hackathon and the funded PreStocks sponsor bounty.

**One-line pitch:** A transparent premium and valuation monitor that makes PreStocks' official public data decision-ready without executing trades.

[**Open the live demo**](https://prestocks-lens.clod.chatgpt.site/) · [**Watch the 81-second pitch**](https://prestocks-lens.clod.chatgpt.site/pitch.mp4) · [**View the Stocklana submission**](https://hackathons.solana.com/hackathons/stocklana/projects/ac0a40be-8291-4f9e-8b1e-023ec9f768d3)

![PreStocks Lens dashboard](https://prestocks-lens.clod.chatgpt.site/overview.png)

## Judge it in 60 seconds

1. Open the [live demo](https://prestocks-lens.clod.chatgpt.site/).
2. Compare token price with issuer mark price in the market map.
3. Sort by largest gap or search for a product.
4. Open any mint link to verify the Solana token independently on Solscan.

The dashboard is deliberately read-only: no wallet connection, deposit, signature or trade is required.

## Problem

PreStocks publishes both a token price and an issuer mark price. The gap is economically important but difficult to scan across the product set. PreStocks Lens turns that public data into an explainable premium/discount monitor and links each mint to Solscan for independent verification.

## What works now

- Pulls the official `https://prestocks.com/api/prestocks` endpoint when CORS permits.
- Falls back to a dated snapshot fetched from that endpoint on 2026-09-20.
- Calculates token-to-mark premium or discount without a black-box model.
- Flags absolute dislocations at 8% and 20% thresholds.
- Searches and sorts all listed products.
- Links to issuer product pages and Solana mint records.
- Requires no wallet, keys, token purchase, deposit or transaction.

## Run locally

Serve this directory with any static web server, then open `index.html`. No build step or API key is required. The calculation tests require only Node.js:

```bash
node test.mjs
```

For example, with Python installed:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Why Solana and PreStocks are essential

Each row links the PreStocks token mint to Solscan, so the product connects issuer-provided pricing data to independently inspectable Solana assets. The core comparison depends on PreStocks-specific fields: `tokenPrice`, `markPrice`, `impliedValuation`, `markValuation`, and the Solana mint address. It does not integrate any non-PreStocks pre-IPO token.

## Architecture

- Static HTML/CSS/JavaScript; no build step or backend.
- `app.js` loads the official PreStocks endpoint and renders the interface.
- `core.mjs` contains the explainable calculations and ranking logic.
- `test.mjs` covers the core calculation and sorting behavior.
- A dated fallback snapshot keeps the demo usable when the upstream endpoint blocks browser CORS or is unavailable.

## Open-source and AI disclosure

This repository is released under the MIT License. It uses browser and Node.js standard APIs and contains no bundled third-party source components.

AI assistance was used for implementation, test generation, interface copy, and research synthesis. The automated tests were rerun before submission. No users, traction, market data, or project history are claimed.

## Stocklana submission positioning

Target: **Best Use of PreStocks** — $10,000 funded pool; $5,000 / $3,000 / $2,000 for the top three.

One-line pitch: **“A transparent premium and valuation monitor that makes PreStocks’ official data decision-ready without executing trades.”**

The prototype is intentionally read-only and is not investment advice. The Stocklana submission includes the public demo, this repository and the narrated pitch video linked above.
