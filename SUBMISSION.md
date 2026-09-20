# Stocklana submission draft

## Project

**PreStocks Lens**

## One-line description

A transparent premium and valuation monitor that turns PreStocks' official public data into decision-ready market intelligence without executing trades.

## Problem

Each PreStocks product publishes both a token price and an issuer mark price, but users must inspect products one by one to understand where market price has diverged from the reference. That slows research and makes large dislocations easy to miss.

## Solution

PreStocks Lens reads the official product endpoint, calculates a visible token-to-mark premium or discount, ranks the largest gaps, compares implied and mark valuations, and links every Solana mint to Solscan. The product is deliberately read-only: it requires no wallet and never recommends or executes a trade.

## Working features

- Official `https://prestocks.com/api/prestocks` data with a dated fallback snapshot.
- Explainable premium/discount formula.
- 8% and 20% dislocation bands.
- Search and four sorting modes.
- Verifiable mint links to Solscan.
- Responsive interface, risk disclosure and no-wallet architecture.
- Automated calculation tests.

## Why PreStocks is essential

The product is not a generic market dashboard with a logo added. Its core data model depends on fields unique to the PreStocks product endpoint: `tokenPrice`, `markPrice`, `impliedValuation`, `markValuation`, and the Solana mint address. Remove PreStocks and the product's central comparison disappears. It integrates no third-party pre-IPO token.

## AI and open-source disclosure

AI assistance was used for implementation, test generation, interface copy, and research synthesis. The entrant must personally review the code and claims, rerun the automated tests, and be able to explain the calculations before submitting. The project uses browser and Node.js standard APIs and is licensed under MIT.

## Demo outline

1. Open the summary and explain the visible formula and no-wallet design.
2. Rank products by largest absolute market gap.
3. Sort by highest premium and search for one company.
4. Open a mint link for independent Solscan verification.
5. Close with the read-only research and risk boundary.
